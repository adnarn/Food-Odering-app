import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './header.css';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { auth } from "../../firebase";
import { toast } from 'react-toastify';
import { onAuthStateChanged, signOut } from "firebase/auth";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Get user ID and display name (if available)
        const uid = user.uid;
        console.log(user);
        setDisplayName(user.displayName || 'User');
      } else {
        setDisplayName("");
      }
    });

    // Cleanup subscription when component unmounts
    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success('Logout successfully.');
        navigate('/');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <nav id="header" className="nav">
      <div className="container">
        {/* Logo */}
        <div className="contents">
          <Link to="/">
            <img src={'/'} alt="logo" />
          </Link>
        </div>

        {/* Menu links */}
        <div className="menu-wrapper">
          <Link to="/">Home</Link>
          <Link to="#about">About</Link>
          <a href="#"><FaUserCircle /> Hi, {displayName}</a>
        </div>

        {/* Cart and Auth */}
        <div className="auth">
          <Link to="/cart">
            <FaShoppingCart />
            {/* <p></p> */}
          </Link>
          <Link to="/login">Log In</Link>
          <Link to="/register">Sign Up</Link>
          <Link to="/" onClick={logoutUser}>Log Out</Link>
          <div className="menu">
            {/* <HiOutlineMenuAlt3 /> */}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
