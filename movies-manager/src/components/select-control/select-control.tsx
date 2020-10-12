import React, { useState, MouseEvent } from 'react';
import { FieldArray, useField } from 'formik';
import { CheckboxInput } from '../checkbox-input/checkbox-input';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './select-control.scss';

interface ISelectControlProps {
    name: string;
    label: string;
    blockName?: string;
}

type TMouseClick = (event: MouseEvent) => void;

const SelectControl = ({ name, blockName='form-select', label }: ISelectControlProps) => {
    const [ isOpen , setIsOpen ] = useState(false);
    const [field, meta] = useField(name);

    const toggleSelectDropdown: TMouseClick = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(!isOpen);
    }

    const dropdownList: JSX.Element = <FieldArray name={name}>{(arrayHelpers: any) => {
            const onCheckboxChange = (idx: number, { label, isChecked }: any) => () => {
                arrayHelpers.replace(idx, { label, isChecked: !isChecked });
            }
            return <>
                {field.value.map(({ label, isChecked }: any, index: number) => {
                    return (<li
                        className={`${blockName}__item`}
                        key={label}>
                        <CheckboxInput
                            onChange={onCheckboxChange(index, { label, isChecked })}
                            name={`genres[${index}]`}
                            label={label}
                            checked={isChecked}/>
                    </li>);
                })}
            </>
        }}</FieldArray>;

    return <>
            <div className={`${blockName}__field-wrapper`}>
            <div className={`${blockName}__headline`}>{label}</div>
            <button
                className={`${blockName}__btn`}
                onClick={toggleSelectDropdown}>
                <span className={`${blockName}__chosen-items`}>
                    { field.value
                        .filter(({ isChecked }: any) => isChecked)
                        .map(({ label }: any) => label).join(', ') || 'Select Genre' }
                </span>
                <FontAwesomeIcon
                    className={`${blockName}__icon`}
                    icon={faAngleDown}
                    size='lg'/>
            </button>
            { isOpen && <ul className={`${blockName}__list`}>
                { dropdownList }
            </ul>}
            {meta.touched && meta.error ? (
            <div className={`${blockName}__error`}>{meta.error}</div>
            ) : null}
        </div>
    </>;
}

export { SelectControl };