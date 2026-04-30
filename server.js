require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Pulls the connection string from the .env file
const uri = process.env.MONGO_URI;

if (!uri || uri.includes("YOUR_PASSWORD_HERE") || uri.includes("<db_password>")) {
    console.error("❌ ERROR: Please set your actual MongoDB password in the .env file first!");
    // We don't exit here so the server can still serve the static files with the error message UI
}

const client = new MongoClient(uri || "mongodb://localhost:27017/fallback");

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname)));

// API Routes
app.get('/api/universities', async (req, res) => {
    try {
        await client.connect();
        const db = client.db("hyderabad_edu");
        const universities = await db.collection("universities").find({}).sort({ rank: 1 }).toArray();
        res.json(universities);
    } catch (error) {
        console.error("Database Error:", error.message);
        res.status(500).json({ error: "Failed to fetch universities from database" });
    }
});

app.get('/api/courses', async (req, res) => {
    try {
        await client.connect();
        const db = client.db("hyderabad_edu");
        const courses = await db.collection("courses").find({}).toArray();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch courses" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Hyderabad Edu Web Application running at http://localhost:${PORT}`);
    if (!uri || uri.includes("YOUR_PASSWORD_HERE")) {
        console.log(`⚠️  WARNING: You still need to put your password in the .env file!`);
    }
});
