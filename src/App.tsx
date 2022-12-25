import React from "react";
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {Layout} from "./components/Layout";

const WatchList = React.lazy(() => import(/* webpackChunkName: "WatchList" */ './pages/WatchList'))
const FullMovie = React.lazy(() => import(/* webpackChunkName: "FullMovie" */ './pages/FullMovie'))

export function App() {

  return (
    <div>
      <Routes>

        <Route path={'/'} element={<Layout/>}>
          <Route index element={<Home/>}/>

          <Route path={'watchlist'} element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <WatchList/>
            </React.Suspense>
          }/>

          <Route path={'movie/:id'} element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <FullMovie/>
            </React.Suspense>}
          />
        </Route>

      </Routes>
    </div>
  )
}

