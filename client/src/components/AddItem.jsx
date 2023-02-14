import { React } from "react";

function AddItem(props) {

    return (
        <div id="PutID" className="itemName">
            <form action="/addedItem" method="post" >
                <img className="BookCoverImg" src="avatar" alt="put src" />
                <input name="imageUrl" className="imageUrl" placeholder="ImageUrl" />
                <input name="bookName" className="bookName" placeholder="BookName" />
                <input name="bookPrice" className="bookPrice" type="number" placeholder="Price" />
                <input name="bookQuantity" className="bookQuantity" type="number" placeholder="Count" />
                <button className="btn" type="submit"> Add Book </button>
            </form>

        </div>
    );
};

export default AddItem;