const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// database connection with mongodb
mongoose.connect(
  "mongodb+srv://sartaansari121sa:sartajbtn99@cluster0.odayccd.mongodb.net/"
);

//API Creation

app.get("/", (req, res) => {
  res.send("Express App is running");
});
app.get("/data", (req, res) => {
  res.send("Express App is running in data formate");
});

// image storage engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

//creating upload endpoint for upload images

app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `https://shopwear.onrender.com/images/${req.file.filename}`,
  });
});

// Schema for Creating product
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  avilable: {
    type: Boolean,
    default: true,
  },
});

app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_Product_array = products.slice(-1);
    lastproduct = last_Product_array[0];
    id = lastproduct.id + 1;
  } else {
    id = 1;
  }
  const me = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });

  console.log(me);
  await me.save();
  console.log("saved");
  res.json({
    success: true,
    name: req.body.name,
  });
});
// creating endpoint to remove data
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});
// creating endpoint for all products
app.get("/allproducts", async (req, res) => {
  const products = await Product.find({});
  console.log("all products fetched");
  res.send(products);
});
// creating schema for user model

const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  passward: {
    type: String,
  },
  cardData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// creating endpoint for registering for the user
app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      errors: "existing user found with same email id",
    });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    passward: req.body.passward,
    cardData: cart,
  });
  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token });
});

// creating endpoint for user login
app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.passward === user.passward;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "wrong passward" });
    }
  } else {
    res.json({ success: false, errors: "wrong email_id" });
  }
});

// creating endpoint for newcollections
app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("newCollections Fetched");
  res.send(newcollection);
});

// creating endpoint for pouplar in women section
app.get("/popularinwomen", async (req, res) => {
  let products = await Product.find({ category: "women" });
  let popular_in_women = products.slice(0, 4);
  console.log("popular in women fetched");
  res.send(popular_in_women);
});

// creating middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "please authenticate using valid token" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res
        .status(401)
        .send({ errors: "please authenticate using a valid token" });
    }
  }
};
// creating endpoint for adding a products in cartdata
app.post("/addtocart", fetchUser, async (req, res) => {
  console.log("added", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  userData.cardData[req.body.itemId] += 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cardData: userData.cardData }
  );
  res.send("added in cart");
});

// creating endpoint to remove product from cartdata
app.post("/removefromcart", fetchUser, async (req, res) => {
  console.log("removed", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cardData[req.body.itemId] > 0)
    userData.cardData[req.body.itemId] -= 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cardData: userData.cardData }
  );
  res.send("added in cart");
});
// creating endpoint to get cartdata
app.post("/getcart", fetchUser, async (req, res) => {
  console.log("GetCart");
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cardData);
});

app.listen(port, (err) => {
  if (!err) {
    console.log(`server running in port ${port}`);
  } else {
    console.log(`error occor${err}`);
  }
});
