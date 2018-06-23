// @flow

import * as React from 'react';
import Icon from '../Icon/Icon';
import { ICON_LIST } from '../../constants/icons';
import './InfoMsg.css';

type Props = {
  children?: React.Node,
  icon: string,
  msg: string,
};


/**
* Displays an informational message with an icon.
*/
export class InfoMsg extends React.Component<Props> {
  static defaultProps = {
    children: null,
    icon: ICON_LIST,
    msg: '',
  };

  props: Props;

  render() {
    return (
      <section className="InfoMsg">
        <Icon type={this.props.icon} />
        <div className="InfoMsg__msg">{this.props.msg}</div>
        { this.props.children && <div className="InfoMsg__sub">{this.props.children}</div> }
      </section>
    )
  }
}


export default InfoMsg;