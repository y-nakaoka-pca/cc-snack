# Snack

## About
This project was created during a solo project training.  
Snack was modeled after Slack, which is awesome communication app!

## Getting Started

### Install packages
`npm install`

### Setup database

#### Set Config
Set your `username` and `password` in `.env` file.

``` .env
DB_USER=postgres
DB_PASSWORD=postgres
```

#### Create database
`psql -f ./src/database/createDatabase/createDatabase.sql -U postgres`

#### Migrate
`npm run db:migrate`

#### Seed
`npm run db:seed`

### Start development server
`npm run dev`

#### Front End
Access `http://localhost:3000/` in your browser.

#### Back End
Request to `http://localhost:3000/api/`.  
Please refer to [APIs](apis) for the detailed endpoint.

### Test
`npm run start`

## APIs

### Users
- `GET /api/users`
- `POST /api/users`
  - request body: `name`
- `PATCH /api/users/:user_id`
  - request body: `text`, `from`, `to`
- `DELETE /api/users/:user_id`
- `DELETE /api/users`
> [!WARNING]  
> All users will be deleted by this API!

### Messages
- `GET /api/messages`
  - query params: `from`, `to`
- `POST /api/messages`
  - request body: `text`, `from`, `to`
- `PATCH /api/messages/:message_id`
  - request body: `text`
- `DELETE /api/messages/:message_id`
- `DELETE /api/messages`
> [!WARNING]  
> All messages will be deleted by this API!
