const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/fullstackreact", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a simple schema for the database
const itemSchema = new mongoose.Schema({
  name: String,
});

const Item = mongoose.model("Item", itemSchema);

// API endpoint to get all items
app.get("/api/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// API endpoint to add a new item
app.post("/api/items", async (req, res) => {
  const { name } = req.body;

  try {
    const newItem = new Item({ name });
    await newItem.save();
    res.json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
