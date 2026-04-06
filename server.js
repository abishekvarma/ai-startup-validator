require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 👉 In-memory storage (acts like database)
let ideasDB = [];

// test route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// smarter fake AI logic
function generateSmartAnalysis(idea) {
  const problems = [
    "Users face inefficiency and lack of convenience in current solutions.",
    "There is no centralized platform solving this problem effectively.",
    "Existing solutions are outdated and not user-friendly."
  ];

  const users = [
    "Students and young professionals",
    "Urban users with busy lifestyles",
    "Tech-savvy individuals looking for convenience"
  ];

  const markets = [
    "Rapidly growing digital market with strong demand.",
    "Expanding user base due to increasing internet usage.",
    "High potential in urban and tier-2 cities."
  ];

  const competitors = [
    "Zomato, Swiggy, and other niche startups",
    "Existing apps with similar features but poor UX",
    "Fragmented market with no clear leader"
  ];

  const risks = [
    "High competition and customer acquisition cost",
    "Dependence on user trust and retention",
    "Scalability challenges in early stages"
  ];

  const techStacks = [
    "React, Node.js, MongoDB",
    "Flutter for mobile + Firebase backend",
    "Next.js with cloud deployment (AWS/GCP)"
  ];

  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const score = Math.floor(Math.random() * 30) + 60;

  return `
🚀 Idea Summary:
${idea} is a promising startup concept focusing on solving real-world problems with scalable digital solutions.

📉 Problem:
${pick(problems)}

👥 Target Users:
${pick(users)}

📊 Market Opportunity:
${pick(markets)}

⚔️ Competitors:
${pick(competitors)}

⚙️ Tech Stack Suggestion:
${pick(techStacks)}

⚠️ Risks:
${pick(risks)}

💰 Profitability Score:
${score}/100 – ${
    score > 80
      ? "High potential with strong execution"
      : score > 70
      ? "Good idea but needs differentiation"
      : "Moderate potential with execution risks"
  }
`;
}

// 👉 Validate + STORE idea
app.post("/validate", (req, res) => {
  const { idea } = req.body;

  try {
    if (!idea || idea.trim() === "") {
      return res.status(400).json({ error: "Idea is required" });
    }

    const result = generateSmartAnalysis(idea);

    // save in memory (with ID)
    const newIdea = {
      id: ideasDB.length + 1,
      idea,
      result,
      time: new Date()
    };

    ideasDB.push(newIdea);

    res.json({ result, id: newIdea.id });
  } catch (error) {
    res.status(500).send("Error generating response");
  }
});

// 👉 Get all ideas (dashboard)
app.get("/ideas", (req, res) => {
  res.json(ideasDB);
});

// 👉 NEW: Get idea by ID (IMPORTANT BOOST 🔥)
app.get("/ideas/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const idea = ideasDB.find(item => item.id === id);

  if (!idea) {
    return res.status(404).json({ error: "Idea not found" });
  }

  res.json(idea);
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});