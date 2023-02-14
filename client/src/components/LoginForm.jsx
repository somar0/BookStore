import React from "react";



function LoginForm(props) {

    return (
        <div>
            <form action="/" method="post" >
                <div className="imgcontainer">
                    <img src="avatar" alt="Avatar" className="avatar" />
                </div>
                <div className="container">
                    <label ><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="uname" required />
                    <label ><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" required />
                    <button className="btnLogin" type="submit">Login</button>
                </div>
            </form>
            {/* <form action="/bookStore">
                <button className="btnGuest" type="submit">Continue as Guest</button>
            </form> */}
        </div>
    );
};

export default LoginForm;