import React from 'react';
import { TNullable } from '../../types/types';
import { useField } from 'formik';
import { ErrorMessage } from '../';
import './input-control.scss';

interface IInputControlProps {
    label: string;
    name: string;
    id?: string;
    isWrapped?: boolean;
    icon?: TNullable<JSX.Element>;
    type?: string;
}

const blockName = 'input-control';

const InputControl = ({
    label,
    isWrapped = true,
    icon = null,
    type = 'text',
    ...props
}: IInputControlProps) => {
    const [field] = useField(props.name);
    const inputControl: JSX.Element = <>
        <label
            className={`${blockName}__label`}
            htmlFor={props.id || props.name}>{label}</label>
        <input
            className={`${blockName}__input`}
            {...field}
            {...props}
            type={type}
            id={props.id || props.name}/>
        {icon}
    </>;
    return <>
        {isWrapped && <div className={`${blockName}__field-wrapper`}>{inputControl}</div> || inputControl}
        <ErrorMessage name={props.name}/>
    </>;
};

export { InputControl };