// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from '../Icon/Icon';
import Button from '../ui/Button/Button';
import FieldWrap from '../ui/FieldWrap/FieldWrap';
import TextInput from '../ui/TextInput/TextInput';
import { text } from '../Translation/Translation';
import { ICON_ASC, ICON_DESC } from '../../constants/icons';
import { searchIssues } from '../../actions/issueActions';
import type { DispatchType, EventHandlerType } from '../../types/functions';
import { GQL_ASC,GQL_DESC } from '../../constants/gql';
import './SearchBar.css';

type Props = {
  dispatch: DispatchType,
  initialSort: string,
  initialTerm: string,
  searchIssues: (term: string, sort: string) => void,
};

type State = {
  sort: string,
  term: string,
};


/**
* Search Bar Component.
*/
export class SearchBar extends Component<Props, State> {
  props: Props;
  state: State;
  handleClickAsc: EventHandlerType;
  handleClickDesc: EventHandlerType;
  handleOnKeyUp: EventHandlerType;
  handleSearchChange: EventHandlerType;

  constructor(props: Props) {
    super(props);

    this.state = {
      term: this.props.initialTerm,
      sort: this.props.initialSort,
    };

    this.handleClickAsc = this.handleClickAsc.bind(this);
    this.handleClickDesc = this.handleClickDesc.bind(this);
    this.handleOnKeyUp = this.handleOnKeyUp.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(event: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({ term: event.currentTarget.value });
  }

  handleOnKeyUp(event: SyntheticInputEvent<HTMLInputElement>) {
    if (this.state.term !== '') {
      if (event.key === 'Enter') {
        this.props.searchIssues(event.currentTarget.value, this.state.sort);
      } else if (event.key === 'Escape' || event.key === 'Delete') {
        this.setState({ term: '' });
      }
    }
  }

  handleClickAsc(event: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({ sort: GQL_ASC }, () => {this.submitSearch()});
  }

  handleClickDesc(event: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({ sort: GQL_DESC }, () => {this.submitSearch()});
  }

  submitSearch() {
    this.props.searchIssues(this.state.term, this.state.sort);
  }

  render() {
    return (
      <div className="SearchBar">
        <FieldWrap>
          <FieldWrap>
            <TextInput 
              autoFocus={true}
              onBlur={this.handleSearchChange} 
              onChange={this.handleSearchChange} 
              onKeyUp={this.handleOnKeyUp} 
              placeholder={text('Placeholder', 'SearchBar')} 
              value={this.state.term} 
            />
          </FieldWrap>
          <FieldWrap>
            <Button onClick={this.handleClickAsc} title={text('Asc', 'SearchBar')}>
              <Icon type={ICON_ASC} />
            </Button>
          </FieldWrap>
          <FieldWrap>
            <Button onClick={this.handleClickDesc} title={text('Desc', 'SearchBar')}>
              <Icon type={ICON_DESC} />
            </Button>
          </FieldWrap>
        </FieldWrap>
      </div>
    )
  }
}

const mapStateToProps = (state: Object) => (
  {
    initialSort: state.issues.sort,
    initialTerm: state.issues.term,
  }
);

const mapDispatchToProps = (dispatch: DispatchType) => {
  return {
    searchIssues: (term: string, sort: string) => {
      dispatch(searchIssues(term, sort))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);