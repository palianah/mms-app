// @flow

import React, { Component } from 'react';
import 'intersection-observer';
import Observer from 'react-intersection-observer';
import { text } from '../Translation/Translation';
import './Avatar.css';

type Props = {
  src: string,
};


/**
* An avatar image.
*/
export class Avatar extends Component<Props> {
  props: Props;

  render() {
    return (
      <span className="Avatar">
        <Observer
          render={({ inView, ref }) => (
            <img ref={ref} src={this.props.src} alt={text('Alt', 'Avatar')} />
          )}
        />
      </span>
    )
  }
}


export default Avatar;
