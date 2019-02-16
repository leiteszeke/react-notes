// Dependencies
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div.attrs(props => ({

}))`
    align-items: center;
    display: flex;
    height: 34px;
    justify-content: space-between;
`;

const Color = styled.div.attrs(props => ({

}))`
    background: ${ props => props.color };
    cursor: pointer;
    height: 20px;
    margin: 0 6px;
    width: 20px;
`;

const colors = [
    '#6db8ff',
    '#f06292',
    '#81c784',
    '#ba68c8',
];

const ColorList = (props) => {
    const {
        onClick,
    } = props;

    const handleClick = color => () => {
        if (typeof onClick === 'function') {
            onClick(color);
        }
    }

    return (
        <Container>
            { colors.map(color =>
                <Color
                    color={ color }
                    key={ color }
                    onClick={ handleClick(color) }
                />
            ) }
        </Container>
    )
};

ColorList.propTypes = {
    onClick: PropTypes.func,
};

export default ColorList;