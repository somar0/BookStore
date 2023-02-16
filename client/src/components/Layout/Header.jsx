import React from "react";
import { useNavigate } from "react-router-dom";


const Header = ({ boughtBooks, dollarSympol, basket, onRemove, ...props }) => {

  const navigate = useNavigate();

  const sendBooks = async () => {
    await fetch("/data", {
      method: "POST",
      headers: {
        "Accept": 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify(boughtBooks)
    })
    navigate("/buy");
  };

  return (
    <header>
      <h1 className="title">Book Store</h1>
      {/* /////////////////////////////////////////////////////////////////  */}
      <div className="dropdown">
        <button className="dropbtn">{dollarSympol}{basket}</button>
        <div className="dropdown-content">
          {
            boughtBooks.map((book) => {
              return (
                <div key={book._id}>
                  <p className="bcount">{book.count} </p>
                  <p className="bName"> {book.name}  </p>
                  <p className="bPrice">${book.price}</p>
                  <button value="delete" className="btnMenu" name={book.name} onClick={() => onRemove(book._id)}>Delete</button>
                  <hr />
                </div>
              );
            })}

          <div className="divTotal" >
            <hr className="LineTotal" />
            <p className="priceTotal">Total ${basket}</p>
            <button name="buyOne" type="submit" onClick={() => sendBooks()} value="one" className="btnTotal" >Buy</button>
          </div>
        </div>
      </div>
      {/* /////////////////////////////////////////////////////////////////  */}

    </header>
  );
}

export default Header;
