import React from 'react';
import { ViroARSceneNavigator } from 'react-viro';

const arScenes = {
  ARSimpleSample: require('./ARSample/HelloWorldSceneAR.js'),
  ARPhysicsSample: require('./ARPhysicsSample/BasicPhysicsSample.js'),
  ARCarDemo: require('./ARCarDemo/ARCarDemo.js'),
  ARPosterDemo: require('./ARPosterDemo/ARPosterDemo.js'),
  BusinessCard: require('./ARBusinessCard/BusinessCard.js'),
};

const ViroARSceneExample = () => {
  return <ViroARSceneNavigator initialScene={{ scene: arScenes['ARSimpleSample'] }} />;
};

export default ViroARSceneExample;
