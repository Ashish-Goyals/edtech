import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="container mx-auto text-center">
        <p className="mb-2">© 2025 Ashish Barnwal</p>
        
          Connect with me on <a
          href="https://www.linkedin.com/in/ashish-barnwal-3369b6205"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-600 underline"
        > LinkedIn
        </a>
        <span className="mx-2">|</span>
        <a
          href="https://github.com/ashish-goyals"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-600 underline"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;
