import React from "react";
import { useNavigate } from "react-router-dom";
import BookItem from "./BookItem";
import { sendBooksToServer } from "../api/utils";

const Header = ({ boughtBooks, basket, onRemove }) => {


  const navigate = useNavigate();

  const handleBuy = async () => {
    await sendBooksToServer(boughtBooks);
    if (basket !== 0) {
      navigate("/buy");
    }
  };


  return (
    <header>
      <h1 className="title">Book Store</h1>

      {window.location.href !== "http://localhost:3000/" ?
        <div className="dropdown">
          <button className="dropbtn">${basket}</button>
          <div className="dropdown-content">
            {boughtBooks.map((book) => (
              <BookItem key={book._id} book={book} onRemove={onRemove} />
            ))}
            <div className="divTotal">
              <hr className="lineTotal" />
              <p className="priceTotal">Total ${basket}</p>
              <button name="buyOne" onClick={handleBuy} value="one" className="btnTotal">Buy</button>
            </div>
          </div>
        </div>

        : undefined
      }

    </header>
  );
};

export default Header;
