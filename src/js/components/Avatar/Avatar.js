// @flow

import React, { PureComponent } from 'react';
import 'intersection-observer';
import Observer from 'react-intersection-observer';
import { text } from '../Translation/Translation';
import './Avatar.css';

type Props = {
  src: string,
  online: boolean,
};


/**
* An avatar image.
*/
export class Avatar extends PureComponent<Props> {
  props: Props;

  renderImg() {
    return <img src={this.props.src} alt={text('Alt', 'Avatar')} />
  }

  renderObserver() {
    return (
      <Observer
        render={({ inView, ref }) => (
          <img ref={ref} src={this.props.src} alt={text('Alt', 'Avatar')} />
        )}
      />
    )
  }

  render() {
    return (
      <span className="Avatar">
        {this.props.online ? (
          this.renderObserver()
        ) : (
          this.renderImg()
        )}
      </span>
    )
  }
}


export default Avatar;
