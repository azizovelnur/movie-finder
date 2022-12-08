import React from 'react';
import ContentLoader from 'react-content-loader';
import MoviesStyle from "../Movies/Movies.module.scss";

const Skeleton = () => (
  <ContentLoader
    className={MoviesStyle.item}
    speed={2}
    viewBox="0 0 280 500"
    backgroundColor="gold"
    foregroundColor="#ecebeb">
  </ContentLoader>
);

export default Skeleton;