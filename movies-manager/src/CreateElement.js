import React from 'react';

export function CreateElement(props) {
    return React.createElement(
        'h1',
        { style: {
            color: 'red',
            textAlign: 'center'
        } },
        `Hello World, from ${props.name}`
    );
}