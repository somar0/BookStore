const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/BooksDB", { useNewUrlParser: true });

let admin = false;
const userName = "admin";
const password = "admin";

let index = 0;

const booksSchema = {
  _id: Number,
  name: String,
  imgSrc: String,
  price: Number,
  count: Number
};

const Book = mongoose.model("Book", booksSchema);

const book1 = new Book({
  "_id": index,
  "name": "Follow Me To Ground",
  "imgSrc": "/images/image1",
  "price": 25,
  "count": 1
});
index++;
const book2 = new Book({
  "_id": index++,
  "name": "The Mind Of A Leader",
  "imgSrc": "/images/image2",
  "price": 23,
  "count": 2
});


const book3 = new Book({
  "_id": index++,
  "name": "My Book Cover",
  "imgSrc": "/images/image3",
  "price": 22,
  "count": 3
});


const book4 = new Book({
  "_id": index++,
  "name": "Design Formular",
  "imgSrc": "/images/image4",
  "price": 30,
  "count": 4
});


const book5 = new Book({
  "_id": index++,
  "name": "Normal People",
  "imgSrc": "/images/image5",
  "price": 28,
  "count": 5
});


const book6 = new Book({
  "_id": index++,
  "name": "Fortress Blood",
  "imgSrc": "/images/image6",
  "price": 24,
  "count": 6
});


const book7 = new Book({
  "_id": index++,
  "name": "The Three Month Rule",
  "imgSrc": "/images/image7",
  "price": 29,
  "count": 7
});


const book8 = new Book({
  "_id": index++,
  "name": "Anya And The Nightingale",
  "imgSrc": "/images/image8",
  "price": 21,
  "count": 8
});


const book9 = new Book({
  "_id": index++,
  "name": "The Year Of The Witching",
  "imgSrc": "/images/image9",
  "price": 20,
  "count": 9
});


const book10 = new Book({
  "_id": index++,
  "name": "The Little Mermaid",
  "imgSrc": "/images/image10",
  "price": 27,
  "count": 10
});


const book11 = new Book({
  "_id": index++,
  "name": "The Hypocrite World",
  "imgSrc": "/images/image11",
  "price": 18,
  "count": 11
});


const book12 = new Book({
  "_id": index++,
  "name": "Beautiful World, Where Are You",
  "imgSrc": "/images/image12",
  "price": 32,
  "count": 12
});


const book13 = new Book({
  "_id": index++,
  "name": "Harry Potter",
  "imgSrc": "/images/image13",
  "price": 23,
  "count": 13
});


const book14 = new Book({
  "_id": index++,
  "name": "The Girl Who Never",
  "imgSrc": "/images/image14",
  "price": 30,
  "count": 14
});



const defaultBooks = [book1, book2, book3, book4, book5, book6, book7, book8, book9, book10, book11, book12, book13, book14];

app.get("/api", function (req, res) {

  Book.find({}, function (err, foundBooks) {
    if (foundBooks.length === 0) {
      Book.insertMany(defaultBooks, function (err) {
        if (err) {
          console.log(err);
        }
        else {
          console.log("Successfully saved default Books to DB.");
        }
      });
      res.redirect("/api");
    } else {
      res.send(foundBooks);
    }
  });
});


app.get("/images/:name", function (req, res) {
  const source = "/images/" + req.params.name + ".jpg";
  res.sendFile(__dirname + source);
});

app.get("/avatar", function (req, res) {
  const image = "/images/avatar.jpg";
  res.sendFile(__dirname + image);
});



app.post("/", function (req, res) {
  const uname = req.body.uname;
  const psw = req.body.psw;
  if ((uname === userName) && (psw === password)) {
    admin = true;
  } else {
    admin = false;
  }
  res.redirect("/bookStore")
});



app.get("/info", function (req, res) {
  res.send(admin);
});




app.post("/addedItem", function (req, res) {

  const bookName = req.body.bookName;
  const imageUrl = req.body.imageUrl;
  const bookPrice = req.body.bookPrice;
  const bookQuantity = req.body.bookQuantity;
  if (bookName != "" && imageUrl != "" && bookPrice != "" && bookQuantity != "") {
    const newBook = new Book({
      _id: index++,
      name: bookName,
      imgSrc: imageUrl,
      price: bookPrice,
      count: bookQuantity
    });
    newBook.save();
  }
  res.redirect("/bookStore")
});

app.get("/https/:name", function (req, res) {
  const source = "/https/" + req.params.name;
  res.sendFile(__dirname + source);
});

let boughtBooks = [];

app.post("/data", function (req, res) {
  boughtBooks = req.body;
  // console.log(boughtBooks);
  // res.redirect("/buy")
  res.sendStatus(201);

});


app.get("/bought", function (req, res) {
  res.send(boughtBooks);

});




app.listen(5000, function () {
  console.log("The Server is runing on Port 5000!");
});
