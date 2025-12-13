import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="container mx-auto text-center">
        <p className="mb-2">© 2025 Ashish Barnwal</p>
        <a
          href="https://www.linkedin.com/in/ashish-barnwal-3369b6205"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-600 underline"
        >
          Connect with me on LinkedIn
        </a>
      </div>
    </footer>
  );
};

export default Footer;
