# Hyderabad Edu Repository

This repository contains two versions of a university discovery project focused on Hyderabad:

- `hyderabad-edu-react`: the main React + Vite frontend with an Express and MongoDB backend
- `hyderabad-edu`: an earlier static HTML, CSS, and JavaScript version

## Main Project

The primary application lives in `hyderabad-edu-react`. It helps students:

- browse universities in Hyderabad
- search and filter by course, type, accreditation, and fees
- compare universities
- register, log in, and save favorites

## Tech Stack

- React
- Vite
- React Router
- Express
- MongoDB with Mongoose
- JWT authentication

## Run Locally

### Frontend

```bash
cd hyderabad-edu-react
npm install
npm run dev
```

### Backend

```bash
cd hyderabad-edu-react/server
npm install
copy .env.example .env
node index.js
```

Create `hyderabad-edu-react/server/.env` with:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Notes

- The frontend and backend are stored in the same repository.
- The backend requires a valid MongoDB connection string before it can start.
- The tracked `.env` file has been replaced with `.env.example` so secrets are not published.
