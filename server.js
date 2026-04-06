require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// smart logic
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
    "Zomato, Swiggy, and other startups",
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
    "Flutter + Firebase",
    "Next.js with AWS/GCP"
  ];

  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const score = Math.floor(Math.random() * 30) + 60;

  return `
🚀 Idea Summary:
${idea} is a scalable startup idea addressing real-world inefficiencies with digital innovation.

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
      ? "High potential if executed well"
      : score > 70
      ? "Good idea but needs differentiation"
      : "Moderate potential with execution risks"
  }
`;
}

// route
app.post("/validate", (req, res) => {
  const { idea } = req.body;

  try {
    const result = generateSmartAnalysis(idea);
    res.json({ result });
  } catch (error) {
    res.status(500).send("Error generating response");
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});