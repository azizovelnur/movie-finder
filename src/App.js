import React from "react";
// import './scss/App.scss'
import Home from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout";
import WatchList from "./pages/WatchList";
import FullMovie from "./pages/FullMovie";

function App() {

  return (
    <div>
      <Routes>

        <Route path={'/'} element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path={'watchlist'} element={<WatchList/>}/>
          <Route path={'movie/:id'} element={<FullMovie/>}/>
        </Route>

      </Routes>
    </div>
  )
}

export default App
