// @flow

import React, { Component } from 'react';
import Icon from '../Icon/Icon';
import Button from '../ui/Button/Button';
import FieldWrap from '../ui/FieldWrap/FieldWrap';
import TextInput from '../ui/TextInput/TextInput';
import Translation, { text } from '../Translation/Translation';
import { ICON_SEARCH } from '../../constants/icons';
import './SearchBar.css';

type Props = {
};


/**
* Search Bar Component.
*/
export class SearchBar extends Component<Props> {
  props: Props;

  componentDidMount() {
  }

  render() {
    return (
      <div className="SearchBar">
        <FieldWrap>
          <FieldWrap>
            <TextInput placeholder={text('Placeholder', 'SearchBar')} />
          </FieldWrap>
          <FieldWrap>
            <Button title={text('BtnLabel', 'SearchBar')}>
              <Icon type={ICON_SEARCH} />
              <span className="SearchBar__mobilebtlabel"><Translation name="BtnLabel" ns="SearchBar" /></span>
            </Button>
          </FieldWrap>
        </FieldWrap>
      </div>
    )
  }
}


export default SearchBar;