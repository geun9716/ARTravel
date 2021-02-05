'use strict';

import React, { Component } from 'react';
import Axios from '../../modules/ApiClient';
import {StyleSheet} from 'react-native';
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
    // this._onInitialized = this._onInitialized.bind(this);
    // this._latLongToMerc = this._latLongToMerc.bind(this);
    // this._transformPointToAR = this._transformPointToAR.bind(this);
  }

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
    const {posts} = this.state;

    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >

        {/* <ViroText text={this.state.text} scale={[.2,2,.2]} position={[0, -2, -5]} style={styles.helloWorldTextStyle} />
        <ViroText text="North Text" scale={[3, 3, 3]} transformBehaviors={["billboard"]} position={[this.state.northPointX, 0, this.state.northPointZ]} style={styles.helloWorldTextStyle} />
        <ViroText text="South Text" scale={[3, 3, 3]} transformBehaviors={["billboard"]} position={[this.state.southPointX, 0, this.state.southPointZ]} style={styles.helloWorldTextStyle} />
        <ViroText text="West Text" scale={[3, 3, 3]} transformBehaviors={["billboard"]} position={[this.state.westPointX, 0, this.state.westPointZ]} style={styles.helloWorldTextStyle} />
        <ViroText text="East Text" scale={[3, 3, 3]} transformBehaviors={["billboard"]} position={[this.state.eastPointX, 0, this.state.eastPointZ]} style={styles.helloWorldTextStyle} /> */}

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
            materials={["blue_sphere"]}/>
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
            materials={["black_sphere"]}/>
          <ViroQuad
            rotation={[-90,0,0]}
            width={.5} height={.5}
            arShadowReceiver={true}
            lightReceivingBitMask={4} />
        </ViroNode>
      </ViroARScene>
    );
  }

  // _onInitialized() {
  //   var northPoint = this._transformPointToAR(lat_mobile, long_mobile);
  //   var eastPoint = this._transformPointToAR(lat_mobile, long_mobile);
  //   var westPoint = this._transformPointToAR(lat_mobile, long_mobile);
  //   var southPoint = this._transformPointToAR(lat_mobile, long_mobile);

  //   console.log("obj north final x:" + northPoint.x + "final z:" + northPoint.z);
  //   console.log("obj south final x:" + southPoint.x + "final z:" + southPoint.z);
  //   console.log("obj east point x" + eastPoint.x + "final z" + eastPoint.z);
  //   console.log("obj west point x" + westPoint.x + "final z" + westPoint.z);

  //   this.setState({
  //     northPointX: northPoint.x,
  //     northPointZ: northPoint.z,
  //     southPointX: southPoint.x,
  //     southPointZ: southPoint.z,
  //     eastPointX: eastPoint.x,
  //     eastPointZ: eastPoint.z,
  //     westPointX: westPoint.x,
  //     westPointZ: westPoint.z,
  //     text : "AR Init called."
  //   });
  // }

  _latLongToMerc(lat_deg, lon_deg) {
    var lon_rad = (lon_deg / 180.0 * Math.PI)
    var lat_rad = (lat_deg / 180.0 * Math.PI)
    var sm_a = 6378137.0
    var xmeters  = sm_a * lon_rad
    var ymeters = sm_a * Math.log((Math.sin(lat_rad) + 1) / Math.cos(lat_rad))
    return ({x:xmeters, y:ymeters});
  }

  _transformPointToAR(lat, long) {
    const {latMobile, longMobile} = this.state;

    const deviceObjPoint = this.latLongToMerc(lat, long); // see previous post for code.
    const mobilePoint = this.latLongToMerc(latMobile, longMobile); // see previous post for code.

    const objDeltaY = deviceObjPoint.y - mobilePoint.y;
    const objDeltaX = deviceObjPoint.x - mobilePoint.x;

    
    let degree = 90; // not using real compass yet.
    let angleRadian = (degree * Math.PI) / 180;

    console.log('Using degree => ', degree);
    console.log('Angle radian => ', angleRadian);

    let newObjX = objDeltaX * Math.cos(angleRadian) - objDeltaY * Math.sin(angleRadian);
    let newObjY = objDeltaX * Math.sin(angleRadian) + objDeltaY * Math.cos(angleRadian);

    console.log('old delta => ', { x: objDeltaX, z: -objDeltaY });
    console.log('new delta => ', { x: newObjX, z: -newObjY });

    return { x: newObjX, z: -newObjY };

  }

  _onClick(){
    console.log('hello world');
    alert('hello world!');
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
