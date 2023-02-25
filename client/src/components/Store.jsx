import React from "react";
import AddItem from "./AddItem.jsx";
import BookList from "./BookList.jsx";

const Store = ({ books, handleClick, admin, ...props }) => {

    

    return (
        <>
            {admin === false ? (
                <BookList books={books} admin={admin} handleClick={handleClick} />
            ) : (
                <>
                    <BookList books={books}
                        admin={admin}
                        handleClick={handleClick}
                    />
                    <AddItem />
                </>
            )}
        </>
    );
};

export default Store;
