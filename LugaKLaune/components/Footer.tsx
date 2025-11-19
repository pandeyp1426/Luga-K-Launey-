
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Luga K Launey?. All rights reserved.</p>
          <p className="mt-1">An AI-Enhanced Shopping Experience</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

