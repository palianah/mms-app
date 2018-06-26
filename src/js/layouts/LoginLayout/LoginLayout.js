// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from '../../components/Icon/Icon';
import FieldWrap from '../../components/ui/FieldWrap/FieldWrap';
import InfoMsg from '../../components/InfoMsg/InfoMsg';
import TextInput from '../../components/ui/TextInput/TextInput';
import Translation, { text } from '../../components/Translation/Translation';
import { ICON_BUSY, ICON_LOGIN } from '../../constants/icons';
import { DUMMY_USER } from '../../constants/misc';
import { loginUser } from '../../actions/userActions';
import { ROUTE_ISSUES } from '../../constants/routes';
import type { DispatchType, EventHandlerType } from '../../types/functions';
import userDefault from '../../types/user';
import tokenSchema from '../../validation/schemas/token';
import gqlQuery from '../../gql/query';
import userauthQuery from '../../gql/queries/userauth';
import { ucFirst } from '../../utils/strings';
import AppStorage from '../../storage/appStorage';
import { STORAGE_SSKEY } from '../../constants/storage';
import './LoginLayout.css';

type Props = {
  dispatch: DispatchType,
  online: boolean,
  loginUser: Function,
  history: Object,
  initialToken: string,
  location: Object,
  match: Object,
};

type State = {
  errMsg: string,
  step: 'default' | 'checking' | 'error',
  token: string,
};


/**
* Login Layout.
*/
export class LoginLayout extends Component<Props, State> {
  props: Props;
  state: State;
  handleOnChange: EventHandlerType;
  handleOnKeyUp: EventHandlerType;
  tokenOk: Function;

  constructor(props: Props) {
    super(props);

    this.state = {
      errMsg: '',
      step: 'default',
      token: props.initialToken || AppStorage.get(STORAGE_SSKEY) || '',
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnKeyUp = this.handleOnKeyUp.bind(this);
    this.tokenOk = this.tokenOk.bind(this);
  }

  componentDidUpdate() {
    if (this.state.step === 'checking') this.checkToken();
  }

  handleOnChange(event: SyntheticInputEvent<HTMLInputElement>) {
    const { value } = event.target;

    try {
      let validToken = tokenSchema.validateSync(value);
      this.setState({ token: validToken, step: 'default' }); // Default in case an error occured
    } catch (error) {
      // Error doesn't need showing as any transforms have already been done by yup.
    }
  }

  handleOnKeyUp(event: Object) {
    const { value } = event.target;

    if (value !== '') {
      if (event.key === 'Enter') {
        AppStorage.set(STORAGE_SSKEY, this.state.token);
        this.setState({ token: value, step: 'checking' });
      } else if (event.key === 'Escape' || event.key === 'Delete') {
        this.setState({ token: '' });
      }
    }
  }

  checkToken() {
    if (this.props.online) {
      gqlQuery(userauthQuery(), this.state.token)
      .then((response: Object) => {
        this.tokenOk(response.data.data);
      })
      .catch((error: Object) => {
        this.setState({ 
          step: 'error',
          errMsg: error.toString(),
        });
      });
    } else { // Let in with anything... when we come back on line the user will be logged out
      this.tokenOk({ viewer: { login: DUMMY_USER }}); // TODO: Find a more elegant solution
    }
  }

  tokenOk(data: Object) {
    const newUser = {...userDefault, username: data.viewer.login, token: this.state.token };
    this.props.loginUser(newUser);
    this.props.history.push(ROUTE_ISSUES);
  }

  render() {
    const isValid = this.state.step !== 'error' || false;
    const disabled = this.state.step === 'checking' || false;

    return (
      <section className="LoginLayout" data-step={this.state.step}>
        <InfoMsg icon={ICON_LOGIN} msg={text(ucFirst(this.state.step), 'LoginLayout')}>
          <FieldWrap>
            <TextInput 
              autoFocus={true}
              disabled={disabled}
              isValid={isValid}
              onBlur={this.handleOnChange} 
              onChange={this.handleOnChange} 
              onKeyUp={this.handleOnKeyUp} 
              placeholder={text('Placeholder', 'LoginLayout')}
              value={this.state.token} 
            />
            <Icon type={ICON_BUSY} />
          </FieldWrap>
          <p>
            <a target="_blank" rel="noopener noreferrer" href="https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/">
              <Translation name="WhatIsAToken" ns="LoginLayout" />
            </a>
          </p>
        </InfoMsg>
      </section>
    )
  }
}

const mapStateToProps = (state: Object) => (
  {
    initialToken: state.user.token,
    online: state.online,
  }
);


export default connect(mapStateToProps, { loginUser })(LoginLayout);