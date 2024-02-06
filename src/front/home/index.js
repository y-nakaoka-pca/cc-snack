moment.locale("ja");

const messages = [];

window.addEventListener("load", async () => {
  const users = await getUsers();
  const fromUserId = getFromUserId();
  const toUserId = getToUserId();
  const currentUser = users.find((user) => user.id === fromUserId);
  messages.push(...(await getAllMessages(fromUserId, toUserId)));

  renderHeader(currentUser);
  renderUsersList(users, fromUserId, toUserId);
  renderMessagesList(messages, users, currentUser);

  const mainMessageInputEl = document.querySelector(".mainMessageInput");
  mainMessageInputEl.addEventListener("submit", async (e) => {
    e.preventDefault();

    const messageTextboxEl = document.querySelector(".messageTextbox");
    const text = messageTextboxEl.value;
    await createMessage(text, fromUserId, toUserId);

    messageTextboxEl.value = "";
  });

  // TODO: 負荷がかかる
  setInterval(async () => {
    const newData = await getAllMessages(fromUserId, toUserId);
    const isEqual = JSON.stringify(messages) === JSON.stringify(newData);

    if (!isEqual) {
      messages.splice(0);
      messages.push(...newData);
      renderMessagesList(messages, users, currentUser);
    }
  }, 1000);
});

const renderHeader = (currentUser) => {
  const headerUserNameEl = document.querySelector(".headerUserName");
  headerUserNameEl.textContent = currentUser.name;
};

const renderUsersList = (users, fromUserId, toUserId) => {
  const usersListEl = document.querySelector(".usersList");
  users.forEach((user) => {
    const li = document.createElement("li");
    li.className = `user${user.id === toUserId ? " selectedUser" : ""}`;
    li.textContent = user.name;
    li.addEventListener("click", () => {
      window.location.assign(`/home/${fromUserId}/${user.id}`);
    });

    usersListEl.appendChild(li);
  });
};

const renderMessagesList = (messages, users, currentUser) => {
  const messagesListEl = document.querySelector(".messagesList");

  while (messagesListEl.firstChild) {
    messagesListEl.removeChild(messagesListEl.firstChild);
  }

  messages.forEach((message) => {
    const fromUser = users.find((user) => user.id === message.from);

    const li = document.createElement("li");
    li.className = "message";

    const messageHeader = document.createElement("div");
    messageHeader.className = "messageHeader";

    const messageHeaderText = document.createElement("div");
    messageHeaderText.className = "messageHeaderText";

    const messageHeaderName = document.createElement("div");
    messageHeaderName.className = "messageHeaderName";
    messageHeaderName.textContent = fromUser.name;

    const messageHeaderTime = document.createElement("div");
    messageHeaderTime.className = "messageHeaderTime";
    messageHeaderTime.textContent = moment(new Date(message.datetime)).format(
      "LLL"
    );

    const messageText = document.createElement("div");
    messageText.className = "messageText";
    messageText.textContent = message.text;

    li.appendChild(messageHeader);
    messageHeader.appendChild(messageHeaderText);
    messageHeaderText.appendChild(messageHeaderName);
    messageHeaderText.appendChild(messageHeaderTime);
    li.appendChild(messageText);

    if (message.from === currentUser.id) {
      const editEl = document.createElement("div");
      editEl.className = "editMessage";
      editEl.textContent = "編集";
      editEl.addEventListener("click", async () => {
        const messageTextboxEl = document.querySelector(".messageTextbox");
        const text = messageTextboxEl.value;
        await editMessage(message.id, text);

        messageTextboxEl.value = "";
      });

      const deleteEl = document.createElement("div");
      deleteEl.className = "deleteMessage";
      deleteEl.textContent = "削除";
      deleteEl.addEventListener("click", async () => {
        await deleteMessage(message.id);
      });

      const messageHeaderButtons = document.createElement("div");
      messageHeaderButtons.className = "messageHeaderButtons";

      messageHeaderButtons.appendChild(editEl);
      messageHeaderButtons.appendChild(deleteEl);
      messageHeader.appendChild(messageHeaderButtons);
    }

    messagesListEl.appendChild(li);
  });
};

const getFromUserId = () => {
  const currentPath = window.location.pathname;
  const pathArray = currentPath.split("/");
  const fromUserId = pathArray[2];

  return Number(fromUserId);
};

const getToUserId = () => {
  const currentPath = window.location.pathname;
  const pathArray = currentPath.split("/");
  const toUserId = pathArray[3];

  return Number(toUserId);
};

const getUsers = async () => {
  const data = await fetch("/api/users");
  return data.json();
};

const getMessages = async (from, to) => {
  const path = `/api/messages?from=${from}&to=${to}`;
  const data = await fetch(path);
  return data.json();
};

const createMessage = async (text, from, to) => {
  const body = JSON.stringify({
    text,
    from,
    to,
  });

  const data = await fetch("/api/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  return data.json();
};

const getAllMessages = async (fromUserId, toUserId) => {
  const myMessages = await getMessages(fromUserId, toUserId);
  const yourMessages =
    fromUserId === toUserId ? [] : await getMessages(toUserId, fromUserId);
  const messages = [...myMessages, ...yourMessages];

  messages.sort((a, b) => a.id - b.id); // TODO: datetime
  return messages;
};

const deleteMessage = async (id) => {
  const data = await fetch(`/api/messages/${id}`, {
    method: "DELETE",
  });

  return data.json();
};

const editMessage = async (id, text) => {
  const body = JSON.stringify({
    text,
  });

  const data = await fetch(`/api/messages/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  return data.json();
};
