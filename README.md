# Snack

## About
This project was created during the solo project training.  
Snack was modeled after Slack, which is awesome communication app!

## Getting Started

### Install packages
`npm install`

### Setup database

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
- `GET /api/users`
- `GET /api/messages`
  - query params: `from`, `to`
- `POST /api/users`
  - request body: `name`
- `POST /api/messages`
  - request body: `text`, `from`, `to`
- `PATCH /api/users/:user_id`
  - request body: `text`, `from`, `to`
- `PATCH /api/messages/:message_id`
  - request body: `text`
- `DELETE /api/users/:user_id`
- `DELETE /api/messages/:message_id`