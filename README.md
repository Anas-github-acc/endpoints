# Endpoints

Hosted Link - https://endpoints-g6ow.onrender.com <br>
(Note: It might take time due to render downtime for inactivity)

We are providing these endpoints:
- `POST /addSchool` to add a school.
- `GET /listSchools` to list schools sorted by proximity to a user location.

## Tech Stack
- Node.js
- Express.js
- MySQL
- Zod (request validation)


## Local Setup (TiDB Cloud)

1. Install dependencies:

```bash
npm install
cp .env.example .env # create .env file and update the values

# create table
mysql --ssl-mode=REQUIRED -h <tidb-host> -P 4000 -u <tidb-username> -p < sql/schema.sql

npm run dev # run server
```

## API Docs (Postman Collection)

Check directory `postman/School-Management-API.postman_collection.json`

Set `baseUrl` to local for local use currently it is set to hosted link (https://endpoints-g6ow.onrender.com)

## Quick API test:

```bash
curl -X POST http://localhost:3000/addSchool \
  -H "Content-Type: application/json" \
  -d '{"name":"Green Valley High School","address":"21 Main Street, Bangalore","latitude":12.9716,"longitude":77.5946}'

curl "http://localhost:3000/listSchools?latitude=12.9611&longitude=77.6387"
```
