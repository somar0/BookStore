import { React, useState, useEffect } from "react";



const BuyForm = (basket, ...props) => {

    const [bought, setBought] = useState([]);

    useEffect(() => {
        fetch("/bought")
            .then((response) => response.json())
            .then((data) => {
                setBought(data);
            });
    }, []);

    return (
        <>
            <div className="buyForm">
                <label ><b>Name</b></label>
                <input type="text" placeholder="Enter your Username" name="uname" required />
                <label ><b>Second Name</b></label>
                <input type="text" placeholder="Enter your Second Name" name="sname" required />
                <label ><b>Email</b></label>
                <input type="email" placeholder="Enter your Email" name="email" required />
                <label ><b>IBAN</b></label>
                <input type="text" placeholder="Don't Enter your real IBAN" name="iban" required />
                <button className="btnLogin">Submit</button>
            </div>
        </>
    );
}

export default BuyForm;