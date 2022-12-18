import React from 'react';
import ContentLoader from 'react-content-loader';

export const Skeleton = () => (
  <ContentLoader
    className={'rounded-[10px] bg-black h-[280px] w-[150px] my-[30px] mx-[10px]'}
    speed={2}
    viewBox="0 0 280 500"
    backgroundColor="rgb(79 70 229)"
    foregroundColor="#ecebeb">
    <rect x="40" y="20" rx="10" ry="10" width="200" height="340"/>
    <rect x="40" y="440" rx="10" ry="10" width="200" height="40"/>

  </ContentLoader>
);

export const SkeletonSearchList = () => (
  <ContentLoader
    className={'m-[10px] h-[60px]'}
    speed={2}
    viewBox="0 0 400 60"
    backgroundColor="rgb(79 70 229)"
    foregroundColor="#ecebeb">
    <rect x="0" y="0" rx="0" ry="0" width="40" height="60"/>
    <rect x="60" y="0" rx="0" ry="0" width="280" height="60"/>
  </ContentLoader>
);

export const SkeletonSlider = () => (
  <ContentLoader
    speed={2}
    className={'h-[470px] w-[1200px]'}
    // viewBox="0 0 400 157"
    backgroundColor="rgb(79 70 229)"
    foregroundColor="#ecebeb">
    <rect x="0" y="0" rx="0" ry="0" width="100%" height="100%"/>
  </ContentLoader>
);