import React from 'react';
import { useField } from 'formik';
import './error-message.scss';

interface IErrorMessageProps {
    name: string;
}

export const ErrorMessage = ({ name }: IErrorMessageProps) => {
    const [_field, meta] = useField(name);

    return meta.touched && meta.error ? (
        <div className={'error'}>{meta.error}</div>) : null;
};