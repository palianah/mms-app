// @flow

import React, { PureComponent } from 'react';
import Icon from '../../Icon/Icon';
import { ICON_LOGOUT } from '../../../constants/icons';
import './HeaderLogout.css';

type Props = {
  onClick: Function,
};


/**
* A button to delete the token and thus log the user out.
*/
export class HeaderLogout extends PureComponent<Props> {
  props: Props;

  render() {
    return (
      <span className="HeaderLogout" onClick={this.props.onClick}>
        <Icon type={ICON_LOGOUT} />
      </span>
    )
  }
}


export default HeaderLogout;
