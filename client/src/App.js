import { React, useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

// import Header from "./components/Layout/Header.jsx";
// import Footer from "./components/Layout/Footer.jsx";
import LoginForm from "./components/LoginForm.jsx";
import Store from "./components/Store.jsx";
import BuyForm from "./components/BuyForm.jsx";
import Layout from "./components/Layout/Layout.jsx";
// import DropMenu from "./components/DropMenu.jsx";

const App = () => {
    const [books, setBooks] = useState([{}]);

    const [boughtBooks, setBoughtBooks] = useState([]);

    const [basket, setBasket] = useState(0);

    useEffect(() => {
        fetch("/api")
            .then((response) => response.json())
            .then((data) => {
                setBooks(data);
            });
    }, []);

    const handleClick = (id) => {
        const choosenBook = books.find((element) => element._id === id);
        if (choosenBook.count >= 1) {
            choosenBook.count -= 1;
            setBasket(basket + choosenBook.price);
            const addedBook = boughtBooks.find((element) => element._id === id);
            if (addedBook !== undefined) {
                addedBook.count += 1;

            } else {
                setBoughtBooks([...boughtBooks, {
                    name: choosenBook.name,
                    price: choosenBook.price,
                    _id: choosenBook._id,
                    count: 1
                }]);
            }
        }
    }


    const handleRemove = (id) => {
        const deletedBook = boughtBooks.find((element) => element._id === id)
        if (deletedBook !== undefined) {
            setBasket(basket - deletedBook.price);
            books.find((element) => element._id === id).count += 1;

            if (deletedBook.count > 1) {
                deletedBook.count -= 1;
            }
            else {
                setBoughtBooks((prev) => {
                    return prev.filter((boughtBook) => {
                        return boughtBook._id !== id;
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
                <Layout>
                    <LoginForm />
                </Layout>
            </>
        )
    }


    function BookStore() {
        return (
            <>
                <Layout
                boughtBooks={boughtBooks}
                onRemove={handleRemove}
                basket={basket}
                dollarSympol="$"
                >
                    {/* <DropMenu
                        boughtBooks={boughtBooks}
                        onRemove={handleRemove}
                        basket={basket}
                        dollarSympol="$"/> */}
                    <Store
                        handleClick={handleClick}
                        books={books} />

                </Layout>
            </>
        )
    }

    function About() {
        return <h2>About</h2>;
    }

    function Buy() {
        return (
            <>
                <Layout boughtBooks={boughtBooks}
                        onRemove={handleRemove}
                        basket={basket}
                        dollarSympol="$">
                    {/* <DropMenu
                        boughtBooks={boughtBooks}
                        onRemove={handleRemove}
                        basket={basket}
                        dollarSympol="$" s /> */}
                    <BuyForm />
                </Layout>
            </>
        )
    }

}

export default App;