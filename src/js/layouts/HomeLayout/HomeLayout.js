// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import InfoMsg from '../../components/InfoMsg/InfoMsg';
import TextInput from '../../components/ui/TextInput/TextInput';
import { text } from '../../components/Translation/Translation';
import { ICON_LOGIN } from '../../constants/icons';
import './HomeLayout.css';

type Props = {
  initialToken: string,
};

type State = {
  token: string,
};


/**
* Home Layout.
*/
export class HomeLayout extends Component<Props, State> {
  props: Props;
  state: State;
  handleOnChange: Function

  constructor(props: Props) {
    super(props);

    this.state = {
      token: this.props.initialToken,
    };

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(event: SyntheticInputEvent<HTMLInputElement>) {
    const newToken = event.currentTarget.value.replace(/ /g, '');
    this.setState({ token: newToken });
  }

  render() {
    return (
      <div className="HomeLayout">
        <InfoMsg icon={ICON_LOGIN} msg={text('Access', 'HomeLayout')}>
          <TextInput onBlur={this.handleOnChange}  onChange={this.handleOnChange} value={this.state.token} msg={text('Placeholder', 'HomeLayout')} />
          <p>
            <a target="_blank" rel="noopener noreferrer" href="https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/">
              Don't have a token or don't know what they are?
            </a>
          </p>
        </InfoMsg>
      </div>
    )
  }
}


const mapStateToProps = (state: Object) => (
  {
    initialToken: state.token,
  }
);


export default connect(mapStateToProps)(HomeLayout);