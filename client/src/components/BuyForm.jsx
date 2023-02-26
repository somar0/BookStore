import { React } from "react";

const BuyForm = (basket, ...props) => {

    const handleSubmit = () => {
        alert("Congratulation you have succsesfully bought the Books");
    };

    return (
        <div className="buyForm">
            <label ><b>Name</b></label>
            <input type="text" placeholder="Enter your First Name" name="firstname" required />
            <label ><b>Second Name</b></label>
            <input type="text" placeholder="Enter your Second Name" name="secondname" required />
            <label ><b>Email</b></label>
            <input type="email" placeholder="Enter your Email" name="email" required />
            <label ><b>IBAN</b></label>
            <input type="text" placeholder="Don't Enter your real IBAN" name="iban" required />
            <button className="btnLogin" onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default BuyForm;