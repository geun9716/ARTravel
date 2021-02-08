/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { assetExts },
  } = await getDefaultConfig();

  return {
    resolver: {
      assetExts: [...assetExts, 'obj', 'mtl', 'JPG', 'vrx', 'hdr', 'gltf', 'glb', 'GLB', 'bin', 'arobject', 'gif'],
    },
  };
})();
