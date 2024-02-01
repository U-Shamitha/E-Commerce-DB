// components/App.js
import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import '../styles/Home.css'
import MultiStepForm from './MultiStepForm';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import ProductGrid from './ProductGrid';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSideBarOpen } from '../redux/filterOptionsSlice';
import Profile from './Profile';

const Home = () => {
  const isSidebarOpen = useSelector((state)=> state.filterOptions.isSideBarOpen);

  const dispatch = useDispatch();

  const toggleSidebar = () => {
    dispatch(setIsSideBarOpen(!isSidebarOpen));
  };

  return (
    <div>
      <Router>
        <Navbar toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen}/>
        <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
          <Routes>
            <Route exact path="/" element={<ProductGrid/>}/>
            <Route path="/fillDetails" element={<MultiStepForm/>}/>
            <Route path="/products" element={<ProductGrid/>}/>
            <Route path="/profile" element={<Profile/>}/>
          </Routes>
        </div>
    </Router>
    </div>
  );
};

export default Home;
