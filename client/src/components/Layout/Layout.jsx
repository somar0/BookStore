import React from 'react';

import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

const Layout = ({ boughtBooks, onRemove, basket, dollarSympol, children, ...prpos }) => {
    return (
        <>
            <Header
                boughtBooks={boughtBooks}
                onRemove={onRemove}
                basket={basket}
                dollarSympol={dollarSympol} />
            <main>{children}</main>
            <Footer />
        </>
    )
}

export default Layout;