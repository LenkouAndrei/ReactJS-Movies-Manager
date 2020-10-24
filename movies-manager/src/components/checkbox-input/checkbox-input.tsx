import React from 'react';
import { useField } from 'formik';

interface ITextInputProps {
    name: string;
    label: string;
    checked: boolean;
    id?: string;
    onChange?(): void;
}

const CheckboxInput = (props: ITextInputProps) => {
    const [field] = useField(props.name);
    return <>
        <input
            type='checkbox'
            {...field}
            {...props}
            id={props.id || props.name}
        />
        <label htmlFor={props.id || props.name}>{props.label}</label>
    </>;
};

export { CheckboxInput };