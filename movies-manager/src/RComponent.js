import React from 'react';

export class RComponent extends React.Component {
    render() {
      return (<ul>
          { this.props.data.map(({ruleKey, label}) => <li key={ruleKey}>{label}</li>) }
      </ul>);
    }
  }