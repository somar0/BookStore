import React from "react";
import { useNavigate } from "react-router-dom";


function Heading({ boughtBooks, dollarSympol, basket, ...props }) {
  function onRemove(event) {
    props.onRemove(event);
  }


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
    console.log("Hi");
    navigate("/buy");

  };

  return (
    <header>
      <div>
        <h1 className="title">Book Store</h1>
        <div className="dropdown">
          <button className="dropbtn">{dollarSympol}{basket}</button>
          <div className="dropdown-content">
            {
              boughtBooks.map((book, index) => {
                return (
                  <div key={book._id}>
                    <p className="bcount">{book.count} </p>
                    <p className="bName"> {book.name}  </p>
                    <p className="bPrice">${book.price}</p>
                    <button value="delete" className="btnMenu" name={book.name} onClick={onRemove}>Delete</button>
                    <hr />
                  </div>
                );
              }
              )
            }

            {boughtBooks.length > 0 ?

              boughtBooks.length === 1 && boughtBooks[0].count === 1 ?

                <div className="divTotal" >
                  <hr className="LineTotal" />
                  <p className="priceTotal">Total ${basket}</p>
                  {/* <form className="formOne" action="/data" method="post"> */}
                  <button name="buyOne" type="submit" onClick={() => sendBooks()} value="one" className="btnTotal" >Buy</button>
                  {/* <button name="buyOne" type="submit" value={boughtBooks} className="btnTotal" >Buy</button> */}

                  {/* </form> */}
                </div>

                : boughtBooks.length > 1 || boughtBooks[0].count >= 1 ?
                  <div className="divTotal" >
                    <hr className="LineTotal" />
                    <p className="priceTotal">Total ${basket}</p>
                    {/* <form className="formTotal" action="/data" method="post"> */}
                    <button name="buyAll" type="submit" onClick={() => sendBooks()} value="all" className="btnTotal">Buy All</button>
                    {/* <button name="buyAll" type="submit" value="All" className="btnTotal">Buy All</button> */}

                    {/* </form> */}
                  </div>
                  : null
              : null}

          </div>
        </div>
      </div>
    </header>
  );
}

export default Heading;
