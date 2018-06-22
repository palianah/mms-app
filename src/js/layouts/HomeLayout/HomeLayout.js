// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import InfoMsg from '../../components/InfoMsg/InfoMsg';
import TextInput from '../../components/ui/TextInput/TextInput';
import { text } from '../../components/Translation/Translation';
import { ICON_LOGIN } from '../../constants/icons';
import './HomeLayout.css';

type Props = {
  token: string,
};


/**
* Home Layout.
*/
export class HomeLayout extends Component<Props> {
  props: Props;

  /* constructor(props: Props) {
    super(props);
  }

  componentDidMount() {

  } */

  render() {
    return (
      <div className="HomeLayout">
        <InfoMsg icon={ICON_LOGIN} msg={text('Access', 'HomeLayout')}>
          <TextInput value={this.props.token} msg={text('Placeholder', 'HomeLayout')} />
          <p>
            <a target="_blank" href="https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/">
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
    token: state.token,
  }
);


export default connect(mapStateToProps)(HomeLayout);