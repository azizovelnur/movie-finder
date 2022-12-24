import React, {FC} from 'react';
import { Header } from "./Header";
import {Outlet} from "react-router-dom";

export const Layout: FC = () => {
  return (
    <>
      <Header/>
      <div className={'md:h-[100px] h-[160px]'}></div>
      <div className={'container mx-auto max-w-[1200px]'}>
        <Outlet/>
      </div>
    </>
  );
};
