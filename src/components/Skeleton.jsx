import React from 'react';
import ContentLoader from 'react-content-loader';

export const Skeleton = () => (
  <ContentLoader
    className={'rounded-[10px] bg-black h-[280px] w-[150px] my-[30px] mx-[10px]'}
    speed={2}
    viewBox="0 0 280 500"
    backgroundColor="rgb(79 70 229)"
    foregroundColor="#ecebeb">
    <rect x="40" y="0" rx="0" ry="0" width="200" height="340" />
    <rect x="40" y="440" rx="0" ry="0" width="200" height="40" />

  </ContentLoader>
);


export const SkeletonsSearchList = () => (
  <ContentLoader
    speed={2}
    viewBox="0 0 400 40"
    backgroundColor="gold"
    foregroundColor="#ecebeb">
  </ContentLoader>
);

export const SkeletonSlider = () => (
  <ContentLoader
    speed={2}
    viewBox="0 0 400 40"
    backgroundColor="gold"
    foregroundColor="#ecebeb">
  </ContentLoader>
);