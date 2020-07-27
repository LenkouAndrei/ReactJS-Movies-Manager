import React from 'react';

export function Bye(props) {
    // return <h3>Bye, {props.name}</h3>;
    return React.createElement('h3', null, `Bye, ${props.name}`);
}