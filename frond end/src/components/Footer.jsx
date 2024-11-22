import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company section */}
          <div>
            <h2 className="mb-4 text-xl font-semibold text-blue-400">Company</h2>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-blue-300 transition">About</a></li>
              <li><a href="#" className="hover:text-blue-300 transition">Careers</a></li>
              <li><a href="#" className="hover:text-blue-300 transition">Brand Center</a></li>
              <li><a href="#" className="hover:text-blue-300 transition">Blog</a></li>
            </ul>
          </div>

          {/* Help center section */}
          <div>
            <h2 className="mb-4 text-xl font-semibold text-blue-400">Help Center</h2>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-blue-300 transition">Discord Server</a></li>
              <li><a href="#" className="hover:text-blue-300 transition">Twitter</a></li>
              <li><a href="#" className="hover:text-blue-300 transition">Facebook</a></li>
              <li><a href="#" className="hover:text-blue-300 transition">Contact Us</a></li>
            </ul>
          </div>

          {/* Legal section */}
          <div>
            <h2 className="mb-4 text-xl font-semibold text-blue-400">Legal</h2>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-blue-300 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-300 transition">Licensing</a></li>
              <li><a href="#" className="hover:text-blue-300 transition">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Download section */}
          <div>
            <h2 className="mb-4 text-xl font-semibold text-blue-400">Download</h2>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-blue-300 transition">iOS</a></li>
              <li><a href="#" className="hover:text-blue-300 transition">Android</a></li>
              <li><a href="#" className="hover:text-blue-300 transition">Windows</a></li>
              <li><a href="#" className="hover:text-blue-300 transition">MacOS</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between border-t border-gray-700 pt-8">
          <span className="text-sm text-gray-400">
            © 2023 <a href="https://flowbite.com/" className="hover:text-blue-300 transition">Flowbite™</a>. All Rights Reserved.
          </span>

          <div className="mt-4 sm:mt-0 flex space-x-6 rtl:space-x-reverse">
            <a href="#" className="hover:text-blue-300 transition">
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                {/* Facebook icon path */}
              </svg>
              <span className="sr-only">Facebook page</span>
            </a>
            <a href="#" className="hover:text-blue-300 transition">
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 16">
                {/* Discord icon path */}
              </svg>
              <span className="sr-only">Discord community</span>
            </a>
            <a href="#" className="hover:text-blue-300 transition">
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                {/* Twitter icon path */}
              </svg>
              <span className="sr-only">Twitter page</span>
            </a>
            <a href="#" className="hover:text-blue-300 transition">
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                {/* GitHub icon path */}
              </svg>
              <span className="sr-only">GitHub account</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
