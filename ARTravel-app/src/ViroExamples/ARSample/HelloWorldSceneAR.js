'use strict';

import React, { Component } from 'react';
import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroMaterials,
  ViroBox,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlane,
  ViroARPlaneSelector,
  ViroQuad,
  ViroNode,
  ViroAnimations,
  ViroConstants
} from 'react-viro';

var createReactClass = require('create-react-class');

var HelloWorldSceneAR = createReactClass({
  getInitialState() {
    return {
      hasARInitialized : false,
      text : "Initializing AR...",
      latMobile : 0,
      longMobile : 0,
    };
  },
  componentDidMount(){
    
  },
  render: function() {
    return (
      <ViroARScene onTrackingUpdated={this._onTrackingUpdated}>
        
        <ViroAmbientLight color={"#aaaaaa"} influenceBitMask={1} />

        <ViroNode
          position={[0, 0, -1]}
          scale={[.15, .15, .15]}
          animation={{name: "rotate", run: true, loop: true}}>
          <Viro3DObject
            source={require('../../assets/heart-t.obj')}
            type="OBJ"
            resources={[require('../../assets/heart-t.mtl')]}
            onClick={this._onClick}
            materials={["white_sphere"]}/>
          <ViroQuad
            rotation={[-90,0,0]}
            width={.5} height={.5}
            arShadowReceiver={true}
            lightReceivingBitMask={4} />
        </ViroNode>
        
        <ViroNode
          position={[.5, 0, -1]}
          scale={[.15, .15, .15]}
          animation={{name: "rotate", run: true, loop: true}}>
          <Viro3DObject
            source={require('../../assets/cam-t.obj')}
            type="OBJ"
            resources={[require('../../assets/cam-t.mtl')]}
            onClick={this._onClick}
            materials={["white_sphere"]}/>
          <ViroQuad
            rotation={[-90,0,0]}
            width={.5} height={.5}
            arShadowReceiver={true}
            lightReceivingBitMask={4} />
        </ViroNode>

        <ViroNode
          position={[-.5, 0, -1]}
          scale={[.15, .15, .15]}
          animation={{name: "rotate", run: true, loop: true}}>
          <Viro3DObject
            source={require('../../assets/bag-t.obj')}
            type="OBJ"
            resources={[require('../../assets/bag-t.mtl')]}
            onClick={this._onClick}
            materials={["white_sphere"]}/>
          <ViroQuad
            rotation={[-90,0,0]}
            width={.5} height={.5}
            arShadowReceiver={true}
            lightReceivingBitMask={4} />
        </ViroNode>
        
      </ViroARScene>
    );
  },
  _onTrackingUpdated(state, reason) {
    // if the state changes to "TRACKING_NORMAL" for the first time, then
    // that means the AR session has initialized!
    if (!this.state.hasARInitialized && state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        hasARInitialized : true,
        text : "Hello World!"
      });
    }
  },
  _onClick(position, source){
    console.log('hello world');
    alert('hello world!');
  }
});

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/grid_bg.jpg'),
  },
  white_sphere: {
    lightingModel: "PBR",
    diffuseColor: "#0D66CE",
  },
});

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: "+=90"
    },
    duration: 500, //.25 seconds
  },
});

module.exports = HelloWorldSceneAR;
