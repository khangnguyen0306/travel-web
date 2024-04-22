import React from "react";

const Footer = () => {
  const footerStyle = {
    backgroundColor: "#2D3748",
    color: "#EDF2F7",
    textAlign: "center",
    height: "79px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const footerText = {
    fontSize: "16px",
    fontWeight: "400",
  };

  return (
    <footer style={footerStyle}>
      <div style={footerText}>
        Copyright @{new Date().getFullYear()} BA Warrior. All right reserved
      </div>
    </footer>
  );
};

export default Footer;
