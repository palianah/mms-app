//@flow

import * as React from 'react';
import { UI_ERROR_CLASS } from '../../../constants/ui';
import './TextInput.css';

type Props = {
  className?: string,
  disabled?: boolean,
  isValid?: boolean,
  maxLength?: number,
  name?: string,
  onBlur?: Function | null,
  onChange?: Function | null,
  placeholder?: string,
  title?: string,
  type?: string,
  value?: string,
};


/**
* Generic input tag.
*/
class TextInput extends React.Component<Props> {
  static defaultProps = {
    disabled: false,
    className: '',
    isValid: true,
    onBlur: null,
    onChange: null,
    type: 'text',
  };

  props: Props;

  render() {
    let classes = 'TextInput';
    if (this.props.className && this.props.className !== '') classes += ` ${this.props.className}`;
    if (this.props.isValid === false) classes += ` ${UI_ERROR_CLASS}`;

    return (
        <input
          className={classes}
          disabled={this.props.disabled}
          name={this.props.name}
          maxLength={this.props.maxLength}
          onBlur={this.props.disabled ? null : this.props.onBlur}
          onChange={this.props.disabled ? null : this.props.onChange}
          placeholder={this.props.placeholder}
          title={this.props.title}
          type={this.props.type}
          value={this.props.value}
        />
    )
  }
}


export default TextInput;
