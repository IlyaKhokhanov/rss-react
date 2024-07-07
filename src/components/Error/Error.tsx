import React from 'react';
import './Error.scss';

export class Error extends React.Component {
  constructor(props: object) {
    super(props);
  }

  render(): React.ReactNode {
    return <div>Something went wrong</div>;
  }
}
