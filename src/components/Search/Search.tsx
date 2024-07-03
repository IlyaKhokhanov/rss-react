import React from 'react';
import { request } from '../../api';
import { IRequest, requestObj } from '../../types';
import './Search.scss';

interface IProps {}

interface IState {
  input: string;
  list: requestObj[];
}

export class Search extends React.Component<IProps, IState> {
  constructor(props: object) {
    super(props);
    this.state = {
      input: localStorage.getItem('searchString') || '',
      list: [],
    };
    this.searchHandler = this.searchHandler.bind(this);
    this.searchHandler();
  }

  searchHandler() {
    localStorage.setItem('searchString', this.state.input);
    request<IRequest>(
      `https://swapi.dev/api/people/?search=${this.state.input}`,
    )
      .then((data) => {
        if (typeof data !== 'string') {
          this.setState({
            list: data.results,
          });
        }
      })
      .catch((err) => console.error(err));
  }

  render(): React.ReactNode {
    return <></>;
  }
}
