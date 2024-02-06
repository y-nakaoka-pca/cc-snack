window.addEventListener("load", async () => {
  const users = await getUsers();

  const userSelectEl = document.querySelector(".userSelect");

  console.log(users);
  users.forEach((user) => {
    const optionEl = document.createElement("option");
    optionEl.value = user.id;
    optionEl.textContent = user.name;

    userSelectEl.appendChild(optionEl);
  });

  const logionButtonEl = document.querySelector(".logionButton");
  logionButtonEl.addEventListener("click", onClick);
});

const onClick = () => {
  const userSelectEl = document.querySelector(".userSelect");
  const selectedValue = userSelectEl.value;

  if (selectedValue !== "") {
    window.location.assign(`/home/${selectedValue}/${selectedValue}`);
  }
};

const getUsers = async () => {
  const data = await fetch("/api/users");
  const users = await data.json();
  return users;
};
