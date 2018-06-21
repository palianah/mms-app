// @flow

import * as React from 'react';
import Icon from '../../Icon/Icon';
import { ICON_LIST } from '../../../constants/icons';
import './IssueListInfo.css';

type Props = {
  msg: string,
};


/**
* Displays information in the issue list if there was a problem.
*/
export class IssueListInfo extends React.Component<Props> {
  props: Props;

  render() {
    return (
      <div className="IssueListInfo">
        <Icon type={ICON_LIST} />
        <span className="IssueListInfo__msg">{this.props.msg}</span>
      </div>
    )
  }
}


export default IssueListInfo;