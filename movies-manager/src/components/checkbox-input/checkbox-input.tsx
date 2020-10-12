import React from 'react';
import { useField } from 'formik';

interface ITextInputProps {
    onChange?: any;
    name: string;
    id?: string;
    label: string;
    checked: boolean;
}

const CheckboxInput = (props: ITextInputProps) => {
    const [field] = useField(props.name);
    return <>
        <input 
            type="checkbox"
            {...field}
            {...props}
            id={props.id || props.name}
        />
        <label htmlFor={props.id || props.name}>{props.label}</label>
    </>;
};

export { CheckboxInput }