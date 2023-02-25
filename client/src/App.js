import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Layout from "./Layout/Layout";
import Store from "./components/Store";
import BuyForm from "./components/BuyForm";
import { fetchBooks } from "./api/book-api";

function App() {
    const [books, setBooks] = useState([]);
    const [boughtBooks, setBoughtBooks] = useState([]);
    const [basket, setBasket] = useState(0);
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        fetchBooks().then((data) => {
            setBooks(data);
        });
    }, []);


    useEffect(() => {
        fetch("/api/admin")
            .then((response) => response.json())
            .then((data) => {
                setAdmin(data);
            });
    }, []);


    const handleBookClick = (id) => {
        const selectedBook = books.find((book) => book._id === id);
        if (selectedBook.count >= 1) {
            selectedBook.count -= 1;
            setBasket(basket + selectedBook.price);
            const addedBook = boughtBooks.find((book) => book._id === id);
            if (addedBook !== undefined) {
                addedBook.count += 1;
            } else {
                setBoughtBooks([
                    ...boughtBooks,
                    { name: selectedBook.name, price: selectedBook.price, _id: selectedBook._id, count: 1 },
                ]);
            }
        }
    };

    const handleRemoveBook = (id) => {
        const deletedBook = boughtBooks.find((book) => book._id === id);
        if (deletedBook !== undefined) {
            setBasket(basket - deletedBook.price);
            books.find((book) => book._id === id).count += 1;
            if (deletedBook.count > 1) {
                deletedBook.count -= 1;
            } else {
                setBoughtBooks((prev) => prev.filter((book) => book._id !== id));
            }
        }
    };

    return (
        <Router>
            <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/bookstore"} element={<BookStore />} />
                <Route path={"/buy"} element={<Buy />} />
            </Routes>
        </Router>
    );

    function Home() {
        return (
            <Layout boughtBooks={boughtBooks}
            >
                <LoginForm />
            </Layout>
        );
    }

    function BookStore() {
        return (
            <Layout
                boughtBooks={boughtBooks}
                onRemove={handleRemoveBook}
                basket={basket}
            >
                <Store books={books}
                    handleClick={handleBookClick}
                    admin={admin}
                />
            </Layout>
        );
    }

    function Buy() {
        return (
            <Layout
                boughtBooks={boughtBooks}
                basket={basket}
                onRemove={handleRemoveBook}
            >
                <BuyForm basket={basket} />
            </Layout>
        );
    }
}

export default App;
