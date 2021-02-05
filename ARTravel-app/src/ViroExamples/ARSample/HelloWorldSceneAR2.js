'use strict';

import React, { Component } from 'react';
import Axios from '../../modules/ApiClient';
import {StyleSheet, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {
  ViroARScene,
  ViroText,
  ViroNode,
  Viro3DObject,
  ViroQuad,
  ViroAmbientLight,
  ViroMaterials,
  ViroAnimations,
} from 'react-viro';



export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();
    // Set initial state here
    this.state = {
      lat_mobile : 0.0,
      long_mobile : 0.0,
      posts : [],
    };
    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._latLongToMerc = this._latLongToMerc.bind(this);
    this._transformPointToAR = this._transformPointToAR.bind(this);
  }

  //Arrays
  objList = [require('../../assets/bag-t.obj'), require('../../assets/cam-t.obj'), require('../../assets/heart-t.obj')];
  mtlList = [require('../../assets/bag-t.mtl'), require('../../assets/cam-t.mtl'), require('../../assets/heart-t.mtl')];
  colorList = ["blue_sphere", "white_sphere", "black_sphere"];
  componentDidMount = () => {
    Geolocation.getCurrentPosition(
      async (position) => {
        let gps = position.coords
        this.setState({lat_mobile : gps.latitude , long_mobile : gps.longitude});

        console.log(this.state.lat_mobile);
        console.log(this.state.long_mobile);

        await Axios.get(`http://15.164.218.93/api/post?lat=${this.state.lat_mobile}&long=${this.state.long_mobile}`)
          .then(response => {
            console.log(response.data.postInfo);
            this.setState({posts:response.data.postInfo});
          }).catch(err=>{
            console.log(err);
          });
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
    
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroAmbientLight color={"#aaaaaa"} influenceBitMask={1} />

        {this.state.posts.map((val, index) => {
          let point = this._transformPointToAR(val.latitude, val.longitude);
          console.log(val);
          return (
            <ViroNode
              key = {index}
              position={[point.x, 0, point.z]}
              scale={[.15, .15, .15]}
              animation={{name: "rotate", run: true, loop: true}}>
              <Viro3DObject
                source={this.objList[val.categoryID-1]}
                type="OBJ"
                resources={[this.mtlList[val.categoryID-1]]}
                onClick={()=>{this._onClick(val.postID)}}
                materials={[this.colorList[val.categoryID-1]]}/>
              <ViroQuad
                rotation={[-90,0,0]}
                width={.5} height={.5}
                arShadowReceiver={true}
                lightReceivingBitMask={4} />
            </ViroNode>
          );
        })}
      </ViroARScene>
    )
  }

  _onInitialized() {
    
  }

  _latLongToMerc(lat_deg, lon_deg) {
    var lon_rad = (lon_deg / 180.0 * Math.PI)
    var lat_rad = (lat_deg / 180.0 * Math.PI)
    var sm_a = 6378137.0
    var xmeters  = sm_a * lon_rad
    var ymeters = sm_a * Math.log((Math.sin(lat_rad) + 1) / Math.cos(lat_rad))
    return ({x:xmeters, y:ymeters});
  }

  _transformPointToAR(lat, long) {
    const deviceObjPoint = this._latLongToMerc(lat, long); // see previous post for code.
    const mobilePoint = this._latLongToMerc(this.state.lat_mobile, this.state.long_mobile); // see previous post for code.
    const objDeltaY = deviceObjPoint.y - mobilePoint.y;
    const objDeltaX = deviceObjPoint.x - mobilePoint.x;
    let degree = 90; // not using real compass yet.
    let angleRadian = (degree * Math.PI) / 180;
    // console.log('Using degree => ', degree);
    // console.log('Angle radian => ', angleRadian);
    let newObjX = objDeltaX * Math.cos(angleRadian) - objDeltaY * Math.sin(angleRadian);
    let newObjY = objDeltaX * Math.sin(angleRadian) + objDeltaY * Math.cos(angleRadian);
    // console.log('old delta => ', { x: objDeltaX, z: -objDeltaY });
    // console.log('new delta => ', { x: newObjX, z: -newObjY });
    return ({ x: newObjX, z: -newObjY });
  }

  _onClick(postID){
    alert('postID : '+postID);
    //게시물 Screen 이동 필요
    
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#000000',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/grid_bg.jpg'),
  },
  blue_sphere: {
    lightingModel: "PBR",
    diffuseColor: "#0D66CE",
  },
  black_sphere: {
    lightingModel: "PBR",
    diffuseColor: "#000000",
  },
  white_sphere: {
    lightingModel: "PBR",
    diffuseColor: "#FFFFFF",
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
