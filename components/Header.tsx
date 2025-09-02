
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  const navLinkClasses = "text-lg font-medium text-[#A0A0A0] hover:text-[#F0F0F0] transition-colors duration-300";

  return (
    <header className="bg-black/30 backdrop-blur-lg sticky top-0 z-50 shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <i className="fab fa-linux text-3xl text-[#388EEF]"></i>
          <h1 className="text-xl font-bold text-white">Guía de Distros Linux</h1>
        </div>
        <ul className="flex items-center space-x-6 md:space-x-8">
          <li>
            <NavLink to="/" className={({ isActive }) => `${navLinkClasses} ${isActive ? 'active-nav' : ''}`}>
              Asistente
            </NavLink>
          </li>
          <li>
            <NavLink to="/explorer" className={({ isActive }) => `${navLinkClasses} ${isActive ? 'active-nav' : ''}`}>
              Explorar
            </NavLink>
          </li>
          <li>
            <NavLink to="/compare" className={({ isActive }) => `${navLinkClasses} ${isActive ? 'active-nav' : ''}`}>
              Comparar
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
