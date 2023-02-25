import React from "react";
import Item from "./Item.jsx";

const BookList = ({ books, handleClick,deleteBtn,admin }) => {
    return (
      <>
        {books.map((book) => (
          <Item
            key={book._id}
            id={book._id}
            bookName={book.name}
            imageSrc={book.imgSrc}
            bookPrice={book.price}
            bookQuantity={book.count}
            handleClick={handleClick}
            deleteBtn={deleteBtn}
            admin={admin}
          />
        ))}
      </>
    );
  };

  export default BookList;


