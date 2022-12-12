import React from 'react';
import Header from "../Header/Header";
import {Outlet} from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header/>
      <div style={{height: '100px'}}></div>
      <div className={'container'}>
        <Outlet/>
      </div>
    </>
  );
};

export default Layout;