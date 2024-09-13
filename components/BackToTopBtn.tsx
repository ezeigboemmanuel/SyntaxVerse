'use client';

import { ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function BackToTopButton() {
  const [showButton, setShowButton] = useState(false);

  // Function to scroll back to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scrolling
    });
  };

  // Monitor scroll position to toggle visibility of button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true); // Show button if scrolled more than 300px
      } else {
        setShowButton(false); // Hide button if less than 300px
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-5 right-5 p-2 md:p-3 bg-white/50 border border-gray-600 text-black rounded-full shadow-lg hover:bg-white transition-opacity duration-300 ${
        showButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-label="Back to top"
    >
      <ArrowUp />
    </button>
  );
}
