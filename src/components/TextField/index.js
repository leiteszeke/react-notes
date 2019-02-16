// Dependencies
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.textarea.attrs(props => ({
    onChange: props.onChange,
}))`
    background: ${ props => props.color || '#FFFFFF' };
    border: 1px solid #0B2033;
    box-sizing: border-box;
    height: 60px;
    margin-bottom: 10px;
    outline: none;
    padding: 5px;
    resize: none;
    width: 100%;
`;

const TextField = (props) => {
    const {
        color,
        value,
        onChange,
    } = props;

    const handleChange = (e) => {
        if (typeof onChange === 'function') {
            onChange(e.target.value);
        }
    }

    return (
        <Container
            color={ color.toString() }
            onChange={ handleChange }
            value={ value }
        />
    )
};

TextField.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
};

export default TextField;