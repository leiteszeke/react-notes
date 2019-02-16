// Dependencies
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.button.attrs(props => ({
    onClick: props.onClick,
}))`
    align-items: center;
    background: ${ props => props.color || '#CCCCCC' };
    border: none;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    height: 36px;
    justify-content: center;
    margin-left: 5px;
    outline: none;
    width: 36px;

    i {
        color: #FFFFFF;
    }
`;

const Button = (props) => {
    const {
        color,
        icon,
        label,
        onClick,
    } = props;

    const handleClick = () => {
        if (typeof onClick === 'function') {
            onClick();
        }
    }

    return (
        <Container
            color={ color }
            onClick={ handleClick }
        >
            <i className="material-icons" title={ label }>
                { icon }
            </i>
        </Container>
    )
};

Button.propTypes = {
    icon: PropTypes.string,
    label: PropTypes.string,
    onClick: PropTypes.func,
};

export default Button;