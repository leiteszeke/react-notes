// Dependencies
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// Components
import Button from '../Button';

const Container = styled.div.attrs(props => ({

}))`
    background: ${ props => props.color || '#FAFAFA' };
    box-sizing: border-box;
    display: flex;
    align-items: center;
    height: 60px;
    padding: 10px;
    margin-bottom: 12px;
    width: 100%;

    &.disabled {
        background: #ACACAC;

        button {
            background: #d1d1d1;
            pointer-events: none;
        }
    }
`;

const TextContainer = styled.div.attrs(props => ({

}))`
    display: flex;
    flex-grow: 1;
    height: 100%;
`;

const Text = styled.p.attrs(props => ({

}))`
    font-size: 12px;
    margin: 0;
`;

const Note = (props) => {
    const {
        color,
        disabled,
        text,
        onDelete,
        onEdit,
    } = props;

    const handleDelete = () => {
        if (typeof onDelete === 'function') {
            onDelete();
        }
    }

    const handleEdit = () => {
        if (typeof onEdit === 'function') {
            onEdit();
        }
    }

    return (
        <Container
            className={ disabled === true ? 'disabled': '' }
            color={ color.toString() }
        >
            <TextContainer>
                <Text>{ text }</Text>
            </TextContainer>
            <Button
                color="#FFB700"
                icon="edit"
                label="Editar"
                onClick={ handleEdit }
            />
            <Button
                color="#DE132A"
                icon="close"
                label="Eliminar"
                onClick={ handleDelete }
            />
        </Container>
    )
};

Note.propTypes = {
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    text: PropTypes.string,
};

export default Note;