// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from '../Icon/Icon';
import Button from '../ui/Button/Button';
import FieldWrap from '../ui/FieldWrap/FieldWrap';
import TextInput from '../ui/TextInput/TextInput';
import Translation, { text } from '../Translation/Translation';
import { ICON_SEARCH } from '../../constants/icons';
import * as searchActions from '../../actions/searchActions';
import './SearchBar.css';

type Props = {
  dispatch: Function,
  searchIssues: Function,
  term: string,
};

type State = {
  term: string,
};


/**
* Search Bar Component.
*/
export class SearchBar extends Component<Props, State> {
  props: Props;
  state: State;
  handleSearchChange: Function;
  handleSearchSubmit: Function;

  constructor(props: Props) {
    super(props);

    this.state = {
      term: '',
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  handleSearchChange(event: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({ term: event.currentTarget.value });
  }

  handleSearchSubmit(event: SyntheticInputEvent<HTMLInputElement>) {
    this.props.searchIssues(this.state.term);
  }

  render() {
    console.log(this.props, this.state);
    return (
      <div className="SearchBar">
        <FieldWrap>
          <FieldWrap>
            <TextInput 
              onChange={this.handleSearchChange} 
              onBlur={this.handleSearchChange} 
              value={this.state.term} 
              placeholder={text('Placeholder', 'SearchBar')} 
            />
          </FieldWrap>
          <FieldWrap>
            <Button onClick={this.handleSearchSubmit} title={text('BtnLabel', 'SearchBar')}>
              <Icon type={ICON_SEARCH} />
              <span className="SearchBar__mobilebtlabel">
                <Translation name="BtnLabel" ns="SearchBar" />
              </span>
            </Button>
          </FieldWrap>
        </FieldWrap>
      </div>
    )
  }
}

const mapStateToProps = (state: Object) => (
  {
    term: state.search,
  }
);
const mapDispatchToProps = dispatch => {
  return {
    searchIssues: (term: string) => {
      dispatch(searchActions.search(term))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);