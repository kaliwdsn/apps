// Copyright 2017-2018 @polkadot/apps authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Routes } from '../types';

import TxPool from '@polkadot/app-txpool/index';

export default ([
  {
    Component: TxPool,
    i18n: {
      defaultValue: 'Transaction Pool'
    },
    icon: 'cloud',
    isHidden: false,
    name: 'txpool'
  }
] as Routes);
