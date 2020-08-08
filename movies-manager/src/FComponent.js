import React from 'react';

export function FComponent(props) {
    return React.createElement('h3', null, `Bye, ${props.name}`);
}