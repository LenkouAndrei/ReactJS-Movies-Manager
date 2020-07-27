import React from 'react';
import logo from './logo.svg';
import './App.css';
import { CreateElement } from './CreateElement';
import { RComponent } from './RComponent';
import { PComponent } from './PComponent';
import { Bye } from './FComponent';

const el = React.createElement;
const listOfRules = [
  {ruleKey: 1, label: 'Do not worry'},
  {ruleKey: 2, label: 'Be happy'},
]
const name = 'Tomas';

function App() {
  return (el(
      'div',
      { style: {border: '10px solid #0088ff'} },
      el(CreateElement, {name}, null),
      <RComponent data={listOfRules} />,
      <PComponent/>,
      <Bye name={name}/>
  ));
}

export default App;
