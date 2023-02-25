import React from 'react';

import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

const Layout = ({ boughtBooks, onRemove, basket, children, ...prpos }) => {
    return (
        <>
            <Header
                boughtBooks={boughtBooks}
                onRemove={onRemove}
                basket={basket}
            />
            <main>{children}</main>
            <Footer />
        </>
    )
}

export default Layout;