const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

const DATA_FILE = path.join(__dirname, "reports.json");

// Ensure file exists
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, "[]");
}

// Get all reports
app.get("/api/reports", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(data);
});

// Add new report
app.post("/api/report", (req, res) => {
  const reports = JSON.parse(fs.readFileSync(DATA_FILE));

  const newReport = {
    shop: req.body.shop || "Noma'lum",
    device: req.body.device || "Noma'lum",
    description: req.body.description || "",
    status: "Pending",
    reportedAt: new Date().toLocaleString("uz-UZ", { hour12: false })
  };

  reports.push(newReport);
  fs.writeFileSync(DATA_FILE, JSON.stringify(reports, null, 2));
  res.json({ success: true, report: newReport });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
