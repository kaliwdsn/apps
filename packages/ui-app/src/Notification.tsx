// Copyright 2017-2018 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { BareProps, UnlockI18n } from './types';

import React from 'react';

import Message from 'semantic-ui-react/dist/commonjs/collections/Message/index';

type SemanticMessageSizes = 'mini' | 'tiny' | 'small' | 'large' | 'big' | 'huge' | 'massive';

type Props = BareProps & {
  error?: UnlockI18n | null,
  // Issue: https://github.com/Semantic-Org/Semantic-UI-React/issues/3071
  size?: SemanticMessageSizes
};

export default class Notification extends React.PureComponent<Props> {
  render () {
    const { error, size = 'tiny' } = this.props;

    if (!error) {
      return null;
    }

    const renderMessageBody = (error: UnlockI18n) => {
      return (
        <div>
          <p>{error.key}: <b>{error.value}</b></p>
        </div>
      );
    };

    return (
      <div className='ui--Notifications'>
        { error.key === 'error' ? <Message size={size} error>{ renderMessageBody(error) }</Message> : null }
        { error.key === 'warning' ? <Message size={size} negative>{ renderMessageBody(error) }</Message> : null }
      </div>
    );
  }
}
