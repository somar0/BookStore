import { React, useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import Heading from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import LoginForm from "./components/LoginForm.jsx";
import Store from "./components/Store.jsx";
import BuyForm from "./components/BuyForm.jsx";

export default function App() {
    const [backendData, setBackendData] = useState([{}]);

    useEffect(() => {
        fetch("/api")
            .then((response) => response.json())
            .then((data) => {
                setBackendData(data);
            });
    }, []);
    const books = backendData;


    const [boughtBooks, setBoughtBooks] = useState([]);

    const [basket, setBasket] = useState(0);

    function findID(arr, id) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i]._id === id) {
                return i;
            }
        }
        return null;
    }

    function findName(arr, name) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].name === name) {
                return i;
            }
        }
        return null;
    }

    function handleClick(id, event) {
        if (books[id].count >= 1) {
            books[id].count -= 1;
            setBasket(basket + books[id].price);
            let indexOfBoghtBooks = findID(boughtBooks, id);
            if (indexOfBoghtBooks != null) {
                boughtBooks[indexOfBoghtBooks].count += 1;

            } else {
                setBoughtBooks([...boughtBooks, {
                    name: books[id].name,
                    price: books[id].price,
                    _id: books[id]._id,
                    count: 1
                }]);
            }
        }
    }


    function handleRemove(event) {
        let bName = event.target.name;
        let index = findName(boughtBooks, bName);
        if (index !== null) {
            setBasket(basket - boughtBooks[index].price);
            let orginalIndex = findName(books, bName);
            books[findID(books, orginalIndex)].count += 1;
            if (boughtBooks[index].count > 1) {
                boughtBooks[index].count -= 1;
            }
            else {
                setBoughtBooks((prev) => {
                    return prev.filter((boughtBook) => {
                        return boughtBook.name !== bName;
                    });
                });
            }
        }
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/buy" element={<Buy />} />
                <Route path="/bookStore" element={<BookStore />} />
            </Routes>
        </Router>
    );

    function Home() {
        return (
            <>
                <Heading boughtBooks={boughtBooks} />
                <LoginForm />
                <Footer />
            </>
        )
    }


    function BookStore() {
        return (
            <>
                <Heading
                    boughtBooks={boughtBooks}
                    onRemove={handleRemove}
                    basket={basket}
                    dollarSympol="$"
                />

                <Store
                    handleClick={handleClick}
                    books={books}
                />

                <Footer />
            </>
        )
    }

    function About() {
        return <h2>About</h2>;
    }

    function Buy() {
        return (
            <>
                <BuyForm />
            </>
        )
    }

}
