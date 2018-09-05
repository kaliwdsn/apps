// Copyright 2017-2018 @polkadot/app-accounts authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { I18nProps } from '@polkadot/ui-app/types';

import './index.css';

import React from 'react';

import Tabs from '@polkadot/ui-app/Tabs';

import Creator from './Creator';
import Editor from './Editor';
import Restorer from './Restorer';
import translate from './translate';

type Props = I18nProps & {
  accountAll?: Array<any>,
  basePath: string
};

type Actions = 'create' | 'edit' | 'restore';

type State = {
  action: Actions,
  isAccountsInEditor: boolean
};

// FIXME React-router would probably be the best route, not home-grown
const Components: { [index: string]: React.ComponentType<any> } = {
  'create': Creator,
  'edit': Editor,
  'restore': Restorer
};

class AccountsApp extends React.PureComponent<Props, State> {
  state: State = {
    action: 'edit',
    isAccountsInEditor: true
  };

  render () {
    const { t } = this.props;
    const { action, isAccountsInEditor } = this.state;
    const Component = Components[action];
    const items = [
      {
        name: 'edit',
        text: t('app.edit', { defaultValue: 'Edit account' })
      },
      {
        name: 'create',
        text: t('app.create', { defaultValue: 'Create account' })
      },
      {
        name: 'restore',
        text: t('app.restore', { defaultValue: 'Restore account' })
      }
    ];

    // Do not load Editor tab if no accounts
    if (!isAccountsInEditor) {
      items.splice(0, 1);
    }

    return (
      <main className='accounts--App'>
        <header>
          <Tabs
            activeItem={action}
            items={items}
            onChange={this.onMenuChange}
          />
        </header>
        <Component
          onAccountsExist={this.onAccountsExistInEditor}
          onChangeAccount={this.onChangeAccount}
          onCreateAccount={this.onCreateAccount}
          onNoAccountsExist={this.onNoAccountsExistInEditor}
        />
      </main>
    );
  }

  onAccountsExistInEditor = () => {
    this.setState({
      isAccountsInEditor: true
    });
  }

  onChangeAccount = () => {
    this.selectEdit();
  }

  onCreateAccount = () => {
    this.selectEdit();
  }

  onMenuChange = (action: Actions) => {
    this.setState({ action });
  }

  onNoAccountsExistInEditor = () => {
    const { action } = this.state;

    // Show Restorer tab instead of Editor tab when no accounts exist
    if (action === 'edit') {
      this.selectRestore();
    }

    this.setState({
      isAccountsInEditor: false
    });
  }

  selectEdit = (): void => {
    this.setState({ action: 'edit' });
  }

  selectRestore = (): void => {
    this.setState({ action: 'restore' });
  }
}

export default translate(AccountsApp);
