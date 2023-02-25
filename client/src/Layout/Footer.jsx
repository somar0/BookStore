import React from "react";

const Footer = () => {
  return (
    <footer role="contentinfo" aria-label="Copyright">
      <p>&copy; {new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;
