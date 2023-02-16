import { React } from "react";

const Item = ({ id, imageSrc, bookName, bookPrice, bookQuantity, ...params }) => {

    const handleClick = () => {
        params.handleClick(id);
    }

    const bookStyle = bookQuantity === 0 ? "itemDiv sold" : "itemDiv";


    return (
        <div id={id} className={bookStyle}>
            <img className="BookCoverImg " src={imageSrc} alt={bookName} />
            <p name="bookName" className="bookName">{bookName}</p>
            <p name="bookPrice" className="bookPrice">{bookPrice}$</p>
            <p name="bookQuantity" className="bookQuantity">{bookQuantity}</p>
            <button onClick={() => handleClick()} className="btn">Add to Cart</button>
        </div>
    );
}

export default Item;
