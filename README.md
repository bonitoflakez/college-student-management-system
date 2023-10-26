# College Student Management System

## Installation

### Prerequisite

- Bun (package manager)
- PostgreSQL
- Node.js

```sh
# project setup
$ git clone git@github.com:bonitoflakez/college-student-management-system

$ cd college-student-management-system

# frontend setup
$ bun install

# initiate DB for backend
$ sudo -u postgres psql

$ CREATE DATABASE csms_db

$ \q

# backend setup
$ cd backend

$ cp .env.example .env

$ bun install

$ bun db:init

$ bun db:seed
```

Make sure to enter your DB creds in `.env` and define a `SECRET_KEY`

```env
DB_USER=
DB_PASSWD=
DB_HOST=
DB_PORT=
DB_NAME=

SECRET_KEY=
```

You can run frontend with `bun start` (in `college-student-management-system` directory) and `bun server` (in `college-student-management-system/backend`)
