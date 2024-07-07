import React from 'react';
import './App.scss';
import { Search } from './components/Search/Search';

interface IProps {}

interface IState {
  hasError: boolean;
}
export class App extends React.Component<IProps, IState> {
  constructor(props: object) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidUpdate(): void {
    if (this.state.hasError) throw new Error('Something went erong');
  }

  render(): React.ReactNode {
    return (
      <div>
        <button
          className="error-btn"
          onClick={() => {
            this.setState(
              (state: IState): IState => ({ ...state, hasError: true }),
            );
          }}
        >
          Generate ERROR
        </button>
        <Search />
      </div>
    );
  }
}
