import { React, useState, useEffect } from "react";
import Item from "./Item.jsx";
import AddItem from "./AddItem.jsx";

const Store = ({ books, handleClick, ...props }) => {

    const [admin, setAdmin] = useState();

    useEffect(() => {
        fetch("/info")
            .then((response) => response.json())
            .then((data) => {
                setAdmin(data);
            });
    }, []);
    const adminValue = admin;
    // console.log(adminValue)

    return (
        <>
            {(((books.length !== 0) && (adminValue === false)) ? (books.map((book, index) => {
                return (
                    <Item
                        id={book._id}
                        key={index}
                        bookName={book.name}
                        imageSrc={book.imgSrc}
                        bookPrice={book.price}
                        bookQuantity={book.count}
                        handleClick={handleClick}
                    />
                );
            }))
                : (
                    <>
                        {(books.map((book, index) => {
                            return (
                                <Item
                                    id={book._id}
                                    key={index}
                                    bookName={book.name}
                                    imageSrc={book.imgSrc}
                                    bookPrice={book.price}
                                    bookQuantity={book.count}
                                    handleClick={handleClick}
                                />
                            );
                        }))}
                        <AddItem />
                    </>
                )
            )}
        </>
    );
}

export default Store;
