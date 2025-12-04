import React from "react";

const Footer = () => {
  return (
    <footer className="footer bg-neutral text-neutral-content p-10 mt-10">
      <div>
        <h2 className="text-2xl font-bold">PawMart</h2>
        <p className="max-w-xs">
          PawMart connects local pet owners and buyers for adoption and pet care
          products.
        </p>
        <p className="mt-2 text-sm">© {new Date().getFullYear()} PawMart. All rights reserved.</p>
      </div>

      <nav>
        <h6 className="footer-title">Useful Links</h6>
        <a className="link link-hover">Home</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Terms & Conditions</a>
      </nav>
    </footer>
  );
};

export default Footer;
