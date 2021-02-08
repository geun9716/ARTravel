/**
 * Copyright (c) 2015-present, Viro Media, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */
'use strict';
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { RecoilRoot } from 'recoil';

import RouteContainer from './src/RouteContainer';
import { hasAndroidPermission } from './src/modules/GetPermission';

const App = () => {
  useEffect(() => {
    hasAndroidPermission();
  }, []);

  return (
    <RecoilRoot>
      <RouteContainer />
    </RecoilRoot>
  );
};

export default App;
