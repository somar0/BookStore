import React from "react";

const Item = ({ id, imageSrc, bookName, bookPrice, bookQuantity, deleteBtn,admin, ...params }) => {
    const bookStyle = bookQuantity === 0 ? "itemDiv sold" : "itemDiv";

    const handleClick = () => {
        params.handleClick(id);
    }
    
    return (
        <div id={id} className={bookStyle}>
            <img className="BookCoverImg" src={imageSrc} alt={bookName} />
            <p className="bookName">{bookName}</p>
            <p className="bookPrice">{`$${bookPrice}`}</p>
            <p className="bookQuantity">{bookQuantity}</p>
            <button onClick={handleClick} className="btn" disabled={bookQuantity === 0}>Add to Cart</button>
            {admin !== false ? (
                <form action="/api/deleteBook" method="post" >
                    <input name="id" value={id} className="hidden" readOnly />
                    <button type="submit" className="btn" >Delete</button>
                </form>) : ""}
        </div>
    );
};

export default Item;
