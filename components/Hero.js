"use client";
import { useRef } from 'react';
import { useEffect } from 'react';
import Typed from 'typed.js';

function Hero() {
  
  const el = useRef(null);
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['Coding', 'Web Dev', 'Backend','Frontend', 'App Dev', 'Agentic AI'],
      typeSpeed: 50,
    });

      return () => {
        typed.destroy();
      };
    }, []);


  return (
    <section className="container px-4 py-10 mx-auto lg:h-128 lg:space-x-8 lg:flex lg:items-center">
        <div className="w-full text-center lg:text-left lg:w-1/2 lg:-mt-8">
          <h1 className="text-3xl leading-snug text-gray-800 dark:text-gray-200 md:text-4xl">
            Dive <span className="font-semibold">into</span> the <br className="hidden lg:block" />world of <span className="font-semibold underline decoration-primary"><span ref={el} /></span>
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
          From personal journeys to practical tips <br className="hidden lg:block" /> read, learn, and grow.
          </p>
          <div className="mt-6 bg-transparent border rounded-lg dark:border-gray-700 lg:w-2/3 focus-within:border-primary focus-within:ring focus-within:ring-primary dark:focus-within:border-primary focus-within:ring-opacity-20">
            <div className="flex flex-wrap justify-between md:flex-row">
            </div>
          </div>
        </div>
        <div className="w-full mt-4 lg:mt-0 lg:w-1/2">
          <img src="/sd.svg" alt="tailwind css components" className="w-full h-full max-w-md mx-auto" />
        </div>
      </section>
  )
}

export default Hero
