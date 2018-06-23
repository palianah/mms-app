// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from '../../components/Icon/Icon';
import FieldWrap from '../../components/ui/FieldWrap/FieldWrap';
import InfoMsg from '../../components/InfoMsg/InfoMsg';
import TextInput from '../../components/ui/TextInput/TextInput';
import Translate, { text } from '../../components/Translation/Translation';
import { ICON_BUSY, ICON_LOGIN } from '../../constants/icons';
import { setToken } from '../../actions/tokenActions';
import { setUser } from '../../actions/userActions';
import { ROUTE_ISSUES } from '../../constants/routes';
import type { DispatchType, EventHandlerType } from '../../types/functions';
import type { ApolloResponseType } from '../../types/apollo';
import userDefault from '../../types/user';
import tokenSchema from '../../validation/schemas/token';
import gqlQuery from '../../gql/query';
import userauthQuery from '../../gql/queries/userauth';
import { ucFirst } from '../../utils/strings';
import './LoginLayout.css';

type Props = {
  dispatch: DispatchType,
  setToken: Function,
  setUser: Function,
  history: Object,
  initialToken: string,
  location: Object,
  match: Object,
};

type State = {
  errMsg: string,
  step: 'default' | 'checking' | 'submitted' | 'error',
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

  constructor(props: Props) {
    super(props);

    this.state = {
      errMsg: '',
      step: 'default',
      token: props.initialToken,
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnKeyUp = this.handleOnKeyUp.bind(this);
  }

  componentDidUpdate() {
    if (this.state.step === 'submitted') {
      this.props.setToken(this.state.token);
      this.setState({ step: 'checking' });
    } else if (this.state.step === 'checking') {
      this.checkToken();
    }
  }

  handleOnChange(event: SyntheticInputEvent<HTMLInputElement>) {
    try {
      let validToken = tokenSchema.validateSync(event.currentTarget.value);
      this.setState({ token: validToken, step: 'default' }); // Default in case an error occured
    } catch (error) {
      // Error doesn't need showing as any transforms have already been done by yup.
    }
  }

  handleOnKeyUp(event: SyntheticInputEvent<HTMLInputElement>) {
    if (event.currentTarget.value !== '') {
      if (event.key === 'Enter') {
        this.setState({ step: 'submitted' });
      } else if (event.key === 'Escape' || event.key === 'Delete') {
        this.setState({ token: '' });
      }
    }
  }

  checkToken() {
     gqlQuery(window.qlClient, userauthQuery)
      .then((response: ApolloResponseType) => {
          this.tokenOk(response.data);
      })
      .catch((error: Object) => {
        this.setState({ 
          step: 'error',
          errMsg: error.toString(),
        });
      });
  }

  tokenOk(data: Object) {
    const newUser = {...userDefault, username: data.viewer.login};
    this.props.setUser(newUser);
    this.props.history.push(ROUTE_ISSUES);
  }

  render() {
    const isValid = this.state.step !== 'error' || false;
    const disabled = this.state.step === 'checking' || this.state.step === 'submitted';

    return (
      <section className="LoginLayout" data-step={this.state.step}>
        <InfoMsg icon={ICON_LOGIN} msg={text(ucFirst(this.state.step), 'LoginLayout')}>
          <FieldWrap>
            <TextInput 
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
              <Translate name="WhatIsAToken" ns="LoginLayout" />
            </a>
          </p>
        </InfoMsg>
      </section>
    )
  }
}

const mapStateToProps = (state: Object) => (
  {
    initialToken: state.token,
  }
);


export default connect(mapStateToProps, { setToken, setUser })(LoginLayout);