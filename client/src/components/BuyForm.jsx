import { React, useState, useEffect } from "react";



function BuyForm(props) {

    const [bought, setBought] = useState([]);

    useEffect(() => {
        fetch("/bought")
            .then((response) => response.json())
            .then((data) => {
                setBought(data);
            });
    }, []);
    console.log(bought);

    return (
        <div>
            {
                bought.map((book, index) => {
                    return (
                        <div key={book._id}>
                            <p className="boughtBooks">{book.count} {book.name} ${book.price} </p>
                            <hr />
                        </div>

                    );
                }
                )
            }
            <div className="buyForm">
                <label ><b>Name</b></label>
                <input type="text" placeholder="Enter your Username" name="uname" required />
                <label ><b>Second Name</b></label>
                <input type="text" placeholder="Enter your Second Name" name="sname" required />
                <label ><b>Email</b></label>
                <input type="email" placeholder="Enter your Email" name="email" required />
                <label ><b>IBAN</b></label>
                <input type="text" placeholder="Enter your IBAN" name="iban" required />
                <button className="btnLogin">Submit</button>
            </div>
            {/* </form> */}
            {/* <form action="/bookStore">
                <button className="btnGuest" type="submit">Continue as Guest</button>
            </form> */}
        </div>
    );
}

export default BuyForm;