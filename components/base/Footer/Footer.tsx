import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#ededed] text-black py-4 mt-auto">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} Banner Gallery. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
