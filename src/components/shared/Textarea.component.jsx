import React from 'react'
import styled from 'styled-components'

function InputField({label,name,value,onChange,errors,...rest}) {

    return (
        <Field>
            <label htmlFor={name}>{label}:</label>
            <Textarea id={name} name={name} onChange={onChange} value={value} {...rest}/>
            {errors[name] && <Error>{errors[name]}</Error>}
        </Field>
    )
};

const Field = styled.fieldset`
    width: 100%;
    border: none;
    position:relative;
    margin: 20px 0;

    display:flex;
    flex-direction:column;
`;

const Textarea = styled.textarea`
    padding: 10px;
    border-radius: 8px;
    outline:none;
    border: 1px solid #ccc;
    background: #f2f2f2;
    font-family:inherit;
    font-size: 18px;
    max-height: 300px;
    resize: vertical;
`;

const Error = styled.span`
    color: #d82e2e;
    font-size: 12px;
    text-transform:capitalize;
`;

export default InputField
