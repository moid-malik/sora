"use client"
import React, { useEffect, useState } from 'react';

const OnThisPage = ({ htmlContent }) => {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const h2Elements = tempDiv.querySelectorAll('h2');
    const h2Data = Array.from(h2Elements).map(h2 => ({
      text: h2.textContent,
      id: h2.id
    }));
    setHeadings(h2Data);
  }, [htmlContent]);

  return (
    <div className="on-this-page fixed right-8 top-32 hidden lg:block bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-900/30 dark:to-fuchsia-900/30 p-6 rounded-xl shadow-lg backdrop-blur-sm">
      <h2 className='text-lg font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400'>
        On This Page
      </h2>
      <ul className='space-y-2'>
        {headings.map((heading, index) => (
          <li key={index} className="hover:translate-x-1 transition-transform">
            <a href={`#${heading.id}`} className="text-sm hover:text-violet-600 dark:hover:text-violet-400">
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OnThisPage;