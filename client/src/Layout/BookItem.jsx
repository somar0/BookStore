import React from 'react'

const BookItem = ({ book, onRemove }) => {
    return (
        <div key={book._id}>
            <p className="bcount">{book.count} </p>
            <p className="bName"> {book.name}  </p>
            <p className="bPrice">${book.price}</p>
            <button value="delete" className="btnMenu" name={book.name} onClick={() => onRemove(book._id)}>Delete</button>
            <hr />
        </div>
    )
}

export default BookItem