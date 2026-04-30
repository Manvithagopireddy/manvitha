require('dotenv').config();
const { MongoClient } = require('mongodb');

// Pulls the connection string from the .env file
const uri = process.env.MONGO_URI;

if (!uri || uri.includes("YOUR_PASSWORD_HERE") || uri.includes("<db_password>")) {
    console.error("❌ ERROR: Please set your actual MongoDB password in the .env file first!");
    process.exit(1);
}

const universities = [
    {
        name: "Osmania University (OU)",
        location: "Tarnaka, Hyderabad",
        type: "Public",
        rank: 1,
        accreditation: "NAAC A+",
        fees: "₹15,000 - ₹50,000 / yr",
        image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tags: ["Engineering", "Arts", "Science"],
        description: "One of the oldest and most prestigious universities in India, known for its iconic Arts College building.",
        facilities: ["Hostel", "Library", "Sports Complex", "Auditorium"],
        established: 1918
    },
    {
        name: "International Institute of Information Technology (IIIT-H)",
        location: "Gachibowli, Hyderabad",
        type: "Deemed",
        rank: 2,
        accreditation: "NAAC A",
        fees: "₹3,00,000 - ₹3,50,000 / yr",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tags: ["CSE", "ECE", "Research"],
        description: "A top-tier research university focusing on Information Technology and Computer Science.",
        facilities: ["Research Labs", "Digital Library", "Innovation Centre"],
        established: 1998
    },
    {
        name: "University of Hyderabad (UoH)",
        location: "Gachibowli, Hyderabad",
        type: "Public",
        rank: 3,
        accreditation: "NAAC A",
        fees: "₹20,000 - ₹80,000 / yr",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tags: ["Science", "Humanities", "MBA"]
    },
    {
        name: "Jawaharlal Nehru Technological University (JNTUH)",
        location: "Kukatpally, Hyderabad",
        type: "Public",
        rank: 4,
        accreditation: "NAAC A",
        fees: "₹50,000 - ₹1,00,000 / yr",
        image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tags: ["Engineering", "Pharmacy", "MBA"]
    },
    {
        name: "BITS Pilani, Hyderabad Campus",
        location: "Shamirpet, Hyderabad",
        type: "Private",
        rank: 5,
        accreditation: "NAAC A",
        fees: "₹4,50,000 - ₹5,00,000 / yr",
        image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tags: ["Engineering", "Science", "Pharmacy"]
    },
    {
        name: "Woxsen University",
        location: "Kamkole, Hyderabad",
        type: "Private",
        rank: 6,
        accreditation: "AICTE Approved",
        fees: "₹3,50,000 - ₹4,50,000 / yr",
        image: "https://images.unsplash.com/photo-1564069114553-7215e1ff1890?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tags: ["Business", "Design", "Technology"]
    },
    {
        name: "Mahindra University",
        location: "Bahadurpally, Hyderabad",
        type: "Private",
        rank: 7,
        accreditation: "AICTE Approved",
        fees: "₹4,50,000 / yr",
        image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tags: ["Engineering", "Law", "Management"]
    },
    {
        name: "Anurag University",
        location: "Ghatkesar, Hyderabad",
        type: "Private",
        rank: 8,
        accreditation: "NAAC A",
        fees: "₹1,25,000 - ₹2,50,000 / yr",
        image: "https://images.unsplash.com/photo-1622295023580-6bc047a0492c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tags: ["Engineering", "Pharmacy", "MBA"]
    }
];

const courses = [
    { university: "Osmania University (OU)", name: "B.Tech Computer Science", duration: "4 Years", eligibility: "10+2 with MPC, EAMCET Rank" },
    { university: "IIIT-H", name: "B.Tech + MS by Research", duration: "5 Years", eligibility: "JEE Main / UGEE" },
    { university: "Mahindra University", name: "B.Tech Artificial Intelligence", duration: "4 Years", eligibility: "JEE Main / SAT / MUEE" }
];

const scholarships = [
    { title: "Pragati Scholarship", provider: "AICTE", amount: "₹50,000 / yr", criteria: "Merit-based for Female students" },
    { title: "National Merit Scholarship", provider: "Central Govt", amount: "Full Fee Waiver", criteria: "Top 1% in Board Exams" }
];

async function seedDB() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("✅ Connected correctly to server");

        const db = client.db("hyderabad_edu");
        
        await db.collection("universities").deleteMany({});
        await db.collection("universities").insertMany(universities);
        console.log("🎉 Universities Seeded!");

        await db.collection("courses").deleteMany({});
        await db.collection("courses").insertMany(courses);
        console.log("🎉 Courses Seeded!");

        await db.collection("scholarships").deleteMany({});
        await db.collection("scholarships").insertMany(scholarships);
        console.log("🎉 Scholarships Seeded!");

    } catch (err) {
        console.error("❌ Error seeding the database:");
        console.error(err.stack);
    } finally {
        await client.close();
        console.log("🔌 Database connection closed.");
    }
}

seedDB();
