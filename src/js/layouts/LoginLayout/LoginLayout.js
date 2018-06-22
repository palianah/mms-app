// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from '../../components/Icon/Icon';
import FieldWrap from '../../components/ui/FieldWrap/FieldWrap';
import InfoMsg from '../../components/InfoMsg/InfoMsg';
import TextInput from '../../components/ui/TextInput/TextInput';
import Translate, { text } from '../../components/Translation/Translation';
import { ICON_BUSY, ICON_LOGIN } from '../../constants/icons';
import * as tokenActions from '../../actions/tokenActions';
import { ROUTE_ISSUES } from '../../constants/routes';
import type { DispatchType, EventHandlerType } from '../../types/functions';
import './LoginLayout.css';

type Props = {
  dispatch: DispatchType,
  dispatchToken: (token: string) => void,
  history: Object,
  initialToken: string,
  location: Object,
  match: Object,
};

type State = {
  checking: boolean,
  submited: boolean,
  token: string,
};


/**
* Login Layout.
*/
export class LoginLayout extends Component<Props, State> {
  props: Props;
  state: State;
  handleOnChange: EventHandlerType
  handleOnKeyUp: EventHandlerType

  constructor(props: Props) {
    super(props);

    this.state = {
      checking: false,
      submitted: false,
      token: this.props.initialToken,
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnKeyUp = this.handleOnKeyUp.bind(this);
  }

  componentDidUpdate() {
    if (this.state.submitted) {
      this.props.dispatchToken(this.state.token);
      this.setState({ checking: true, submitted: false });
    } else if (this.state.checking) {
      console.log('check');
    }
  }

  handleOnChange(event: SyntheticInputEvent<HTMLInputElement>) {
    const newToken = event.currentTarget.value.replace(/ /g, '');
    this.setState({ token: newToken });
  }

  handleOnKeyUp(event: SyntheticInputEvent<HTMLInputElement>) {
    if (event.key === 'Enter' && event.currentTarget.value.trim() !== '') {
      this.setState({ submitted: true });
      //this.props.dispatchToken(this.state.token);
      //this.props.history.push(ROUTE_ISSUES);
    }
  }

  render() {
    return (
      <section className="LoginLayout">
        <InfoMsg icon={ICON_LOGIN} msg={text('Access', 'LoginLayout')}>
          <FieldWrap>
            <TextInput 
              disabled={this.state.submitted || this.state.checking}
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
const mapDispatchToProps = (dispatch: DispatchType) => {
  return {
    dispatchToken: (token: string) => {
      dispatch(tokenActions.set(token));
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginLayout);