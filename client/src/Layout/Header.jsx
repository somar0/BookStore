import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import BookItem from "./BookItem";
import { sendBooksToServer } from "../api/utils";

const Header = ({ boughtBooks, basket, onRemove }) => {


  const navigate = useNavigate();

  const totalPrice = useMemo(() => {
    return boughtBooks.reduce((acc, book) => acc + book.price * book.count, 0);
  }, [boughtBooks]);

  const handleBuy = async () => {
    await sendBooksToServer(boughtBooks);
    if (basket !== 0) {
      navigate("/buy");
    }
  };


  return (
    <header>
      <h1 className="title">Book Store</h1>
      <div className="dropdown">
        {window.location.href !== "http://localhost:3000/" ?
          <button className="dropbtn">${basket}</button>
          : undefined
        }
        <div className="dropdown-content">
          {boughtBooks.map((book) => (
            <BookItem key={book._id} book={book} onRemove={onRemove} />
          ))}
          <div className="divTotal">
            <hr className="lineTotal" />
            <p className="priceTotal">Total ${totalPrice}</p>
            <button name="buyOne" onClick={handleBuy} value="one" className="btnTotal">Buy</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
