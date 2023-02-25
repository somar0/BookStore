const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

mongoose.connect("mongodb+srv://somariskif:tT3FDan7BCZ3tK8p@booksdb.lzhlnpx.mongodb.net/BooksDB", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB", err));

const booksSchema = {
  name: String,
  imgSrc: String,
  price: Number,
  count: Number
};

const Book = mongoose.model("Book", booksSchema);




const book1 = new Book({
  "name": "Follow Me To Ground",
  "imgSrc": "/images/image1",
  "price": 25,
  "count": 1
});

const book2 = new Book({
  "name": "The Mind Of A Leader",
  "imgSrc": "/images/image2",
  "price": 23,
  "count": 2
});


const book3 = new Book({
  "name": "My Book Cover",
  "imgSrc": "/images/image3",
  "price": 22,
  "count": 2
});


const book4 = new Book({
  "name": "Design Formular",
  "imgSrc": "/images/image4",
  "price": 30,
  "count": 4
});


const book5 = new Book({
  "name": "Normal People",
  "imgSrc": "/images/image5",
  "price": 28,
  "count": 7
});


const book6 = new Book({
  "name": "Fortress Blood",
  "imgSrc": "/images/image6",
  "price": 24,
  "count": 8
});


const book7 = new Book({
  "name": "The Three Month Rule",
  "imgSrc": "/images/image7",
  "price": 29,
  "count": 6
});


const book8 = new Book({
  "name": "Anya And The Nightingale",
  "imgSrc": "/images/image8",
  "price": 21,
  "count": 8
});


const book9 = new Book({
  "name": "The Year Of The Witching",
  "imgSrc": "/images/image9",
  "price": 20,
  "count": 9
});


const book10 = new Book({
  "name": "The Little Mermaid",
  "imgSrc": "/images/image10",
  "price": 27,
  "count": 2
});


const book11 = new Book({
  "name": "The Hypocrite World",
  "imgSrc": "/images/image11",
  "price": 18,
  "count": 3
});


const book12 = new Book({
  "name": "Beautifull World, Where Are You",
  "imgSrc": "/images/image12",
  "price": 32,
  "count": 4
});


const book13 = new Book({
  "name": "Harry Potter",
  "imgSrc": "/images/image13",
  "price": 23,
  "count": 4
});


const book14 = new Book({
  "name": "The Girl Who Never",
  "imgSrc": "/images/image14",
  "price": 30,
  "count": 5
});


const defaultBooks = [book1, book2, book3, book4, book5, book6, book7, book8, book9, book10, book11, book12, book13, book14];


app.get("/api/books", async function (req, res) {
  try {
    const foundBooks = await Book.find({});
    if (foundBooks.length === 0) {
      await Book.insertMany(defaultBooks);
      console.log("Successfully saved default Books to DB.");
      res.status(201).redirect("/api");
    } else {
      res.status(201).send(foundBooks);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/images/:name", function (req, res) {
  const source = "/images/" + req.params.name + ".jpg";
  res.status(201).sendFile(__dirname + source);
});

const userName = "admin";
const password = "admin";
let isAdminLoggedIn = false;

app.post("/api/admin", function (req, res) {
  const uname = req.body.uname;
  const psw = req.body.psw;
  const isAuthenticated = (uname === userName) && (psw === password);
  isAdminLoggedIn = isAuthenticated;
  res.status(201).redirect("/bookStore");
});

app.get("/api/admin", function (req, res) {
  res.status(201).send(isAdminLoggedIn);
});

app.post("/api/addItem", async function (req, res) {
  const bookName = req.body.bookName;
  const imageUrl = req.body.imageUrl;
  const bookPrice = req.body.bookPrice;
  const bookQuantity = req.body.bookQuantity;
  if (bookName && imageUrl && bookPrice && bookQuantity) {
    const newBook = new Book({
      name: bookName,
      imgSrc: imageUrl,
      price: bookPrice,
      count: bookQuantity
    });
    await newBook.save();
  }
  res.status(201).redirect("/bookStore");
});

app.get("/https/:name", function (req, res) {
  const source = "/https/" + req.params.name;
  res.status(201).sendFile(__dirname + source);
});

let boughtBooks = [];

app.post("/api/data", function (req, res) {
  boughtBooks = req.body;
  res.sendStatus(201);
});

app.get("/api/data", function (req, res) {
  res.status(201).send(boughtBooks);
}); 

app.post("/api/deleteBook", async function (req, res) {
  const _id = req.body.id;
  try {
    const book = await Book.findByIdAndDelete(_id);
    res.status(200).redirect("/bookStore");

  } catch (e) {
    return res.sendStatus(400);
  }
});

app.listen(process.env.PORT || 5000, function () {
  console.log(`The Server is running on Port 5000!`);
});