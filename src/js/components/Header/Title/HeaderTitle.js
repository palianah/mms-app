// @flow

import React, { PureComponent } from 'react';
import Icon from '../../Icon/Icon';
import { text } from '../../Translation/Translation';
import './HeaderTitle.css';
import { ICON_BRAND } from '../../../constants/icons';

type Props = {
  appName?: string,
  icon: string,
};


/**
* App Header path showing breadcrumb on desktop.
*/
export class HeaderTitle extends PureComponent<Props> {
  static defaultProps = {
    appName: '',
    icon: ICON_BRAND,
   };

  props: Props;

  render() {
    return (
      <span className="HeaderTitle">
        <span className="HeaderTitle_icon"><Icon type={this.props.icon} /></span>
        <span className="HeaderTitle_text">{this.props.appName || text('Name', 'App')}</span>
      </span>
    )
  }
}


export default HeaderTitle;
