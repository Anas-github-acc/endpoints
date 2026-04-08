# School Management API (Node.js + Express + MySQL)

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
```

2. Create environment file:

```bash
cp .env.example .env
```

3. Update `.env` values with your TiDB Cloud connection details:

  - `DB_HOST=<tidb-host>`
  - `DB_PORT=4000`
  - `DB_USER=<tidb-username>`
  - `DB_PASSWORD=<tidb-password>`
  - `DB_NAME=school_management`
  - `DB_SSL=true`
  - `DB_SSL_REJECT_UNAUTHORIZED=true`

4. Create DB/table:

```bash
mysql --ssl-mode=REQUIRED -h <tidb-host> -P 4000 -u <tidb-username> -p < sql/schema.sql
```

5. Run server:

```bash
npm run dev
```

## API Docs

### 1) Add School
- Endpoint: `POST /addSchool`
- Body:

```json
{
  "name": "Green Valley High School",
  "address": "21 Main Street, Bangalore",
  "latitude": 12.9716,
  "longitude": 77.5946
}
```

- Success: `201 Created`
- Validation error: `400 Bad Request`

### 2) List Schools
- Endpoint: `GET /listSchools?latitude=12.9611&longitude=77.6387`
- Success: `200 OK`
- Returns schools with `distanceKm` sorted ascending.
- Validation error: `400 Bad Request`

## Postman Collection
Import:
- `postman/School-Management-API.postman_collection.json`

To share with stakeholders:
1. Import the collection in Postman.
2. Set `baseUrl` (for example, local or deployed URL).
3. Click **Share** in Postman and create a public/workspace link.

## Deployment (Render)

This repository includes `render.yaml` for quick deployment.

1. Push the code to GitHub.
2. In Render, create a new Blueprint and select this repository.
3. Set environment variables in Render:

   - `NODE_ENV=production`
   - `PORT=3000`
   - `DB_HOST=<tidb-host>`
   - `DB_PORT=4000`
   - `DB_USER=<tidb-username>`
   - `DB_PASSWORD=<tidb-password>`
   - `DB_NAME=school_management`
   - `DB_SSL=true`
   - `DB_SSL_REJECT_UNAUTHORIZED=true`

4. In TiDB Cloud, allow Render network access for your service.
5. Deploy and verify health endpoint: `/health`.
6. Use deployed base URL in Postman collection variable `baseUrl`.

## Run Commands Summary

Local run:

```bash
cp .env.example .env
npm install
mysql --ssl-mode=REQUIRED -h <tidb-host> -P 4000 -u <tidb-username> -p < sql/schema.sql
npm run dev
```

Quick API test:

```bash
curl -X POST http://localhost:3000/addSchool \
  -H "Content-Type: application/json" \
  -d '{"name":"Green Valley High School","address":"21 Main Street, Bangalore","latitude":12.9716,"longitude":77.5946}'

curl "http://localhost:3000/listSchools?latitude=12.9611&longitude=77.6387"
```
