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
import searchSchema from '../../validation/schemas/search';
import { GQL_ASC, GQL_DESC } from '../../constants/gql';
import './SearchBar.css';

type Props = {
  dispatch: DispatchType,
  fetching: boolean,
  initialSort: string,
  initialTerm: string,
  searchIssues: (term: string, sort: GQL_ASC | GQL_DESC) => void,
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
  submitSearch: Function;

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
    this.submitSearch = this.submitSearch.bind(this);
  }

  handleSearchChange(event: SyntheticInputEvent<HTMLInputElement>) {
    const { value } = event.currentTarget;
    this.validateSearch(value);
  }

  handleOnKeyUp(event: SyntheticInputEvent<HTMLInputElement>) {
    const { value } = event.currentTarget;
    const { sort } = this.state;

    if (event.key === 'Enter') {
      this.validateSearch(value, () => {
        this.submitSearch(value, sort);
      });
    } else if (event.key === 'Escape' || event.key === 'Delete') {
      this.setState({ term: '' }, () => {this.submitSearch('', sort)});
    }
  }

  handleClickAsc(event: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({ sort: GQL_ASC }, () => {this.submitSearch()});
  }

  handleClickDesc(event: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({ sort: GQL_DESC }, () => {this.submitSearch()});
  }

  validateSearch(value: string, cb: Function = () => {}) {
    try {
      let validSearch = searchSchema.validateSync(value);
      this.setState({ term: validSearch }, cb);
    } catch (error) {
      // Error doesn't need showing as any transforms have already been done by yup.
    }
  }

  submitSearch(term: string, sort: GQL_ASC | GQL_DESC) {
    const siTerm = term || this.state.term;
    const siSort = sort || this.state.sort;

    this.props.searchIssues(siTerm, sort || siSort);
  }

  render() {
    return (
      <div className="SearchBar">
        <FieldWrap>
          <FieldWrap>
            <TextInput 
              disabled={this.props.fetching}
              autoFocus={true}
              onBlur={this.handleSearchChange} 
              onChange={this.handleSearchChange} 
              onKeyUp={this.handleOnKeyUp} 
              placeholder={text('Placeholder', 'SearchBar')} 
              value={this.state.term} 
            />
          </FieldWrap>
          <FieldWrap>
            <Button onClick={this.handleClickAsc} title={text('Asc', 'SearchBar')} disabled={this.props.fetching}>
              <Icon type={ICON_ASC} />
            </Button>
          </FieldWrap>
          <FieldWrap>
            <Button onClick={this.handleClickDesc} title={text('Desc', 'SearchBar')} disabled={this.props.fetching}>
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
    searchIssues: (term: string, sort: GQL_ASC | GQL_DESC) => {
      dispatch(searchIssues(term, sort))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);