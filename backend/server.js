const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const os = require("os");

//  const mongoPassword = fs
// .readFileSync("/run/secrets/mongo_password", "utf8")
//  .trim();

// console.log("Mongo Secret Loaded:", mongoPassword);

const app = express();



// app.get("/config", (req, res) => {
//  res.json({
//    app: process.env.APP_NAME,
//    port: process.env.PORT,
//   mongo: process.env.MONGO_URL
//  });
//});



app.get("/broke", (req, res) => {
  res.send(`Running on ${os.hostname()}`);
  });


app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Schema
const Post = mongoose.model("Post", {
  title: String
});

// Create data
app.post("/post", async (req, res) => {
  const post = new Post({ title: req.body.title });
  await post.save();
  res.json(post);
});

// Get data
app.get("/posts", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

// Health
const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
