// Dependencies
import React from 'react';
import styled from 'styled-components';
// Components
import Button from '../components/Button';
import ColorList from '../components/ColorList';
import Note from '../components/Note';
import TextField from '../components/TextField';

class NoteApp extends React.Component {
    constructor (props) {
        super(props);

        const notes = JSON.parse(localStorage.getItem('notes-app'));

        this.state = {
            color: '#E3E3E3',
            editing: false,
            noteId: false,
            notes: notes !== null ? notes : [],
            text: '',
        }

        this.removeNote = this.removeNote.bind(this);
        this.saveNote = this.saveNote.bind(this);
        this.editNote = this.editNote.bind(this);
        this.addNote = this.addNote.bind(this);
    }

    addNote() {
        const { color, notes, text } = this.state;

        if (text !== "") {
            notes.push({
                color,
                id: new Date().getTime(),
                text,
            });

            this.setState({
                color: '#E3E3E3',
                notes,
                text: ''
            }, () => {
                this.writeNotes()
                const element = document.getElementById('container');
                element.scrollTop = element.scrollHeight;
            });
        } else {
            alert("Debes escribir algo para guardar una nota.");
        }
    }

    saveNote() {
        const { color, noteId, notes, text } = this.state;
        const index = notes.findIndex(note => note.id === noteId);

        if (text === "") {
            if (window.confirm("Al editar e intentar guardar una nota vacia, la eliminaras... ¿Estás seguro?")) {
                this.removeNote(noteId);
            }
        } else {
            notes[index].color = color;
            notes[index].text = text;

            this.setState({
                color: '#E3E3E3',
                editing: false,
                noteId: false,
                notes,
                text: '',
            }, () => this.writeNotes());
        }
    }

    writeNotes() {
        localStorage.setItem('notes-app', JSON.stringify(this.state.notes));
    }

    editNote = id => () => {
        const { notes } = this.state;
        const index = notes.findIndex(note => note.id === id);

        this.setState({
            color: notes[index].color,
            editing: true,
            text: notes[index].text,
            noteId: id
        });
    }

    removeNote = id => {
        const { notes } = this.state;
        const index = notes.findIndex(note => note.id === id);

        if (index >= 0) {
            notes.splice(index, 1);
            this.setState({
                color: '#E3E3E3',
                editing: false,
                notes,
                noteId: false
            }, () => this.writeNotes());
        }
    }

    render() {
        const {
            color,
            editing,
            noteId,
            notes,
            text,
        } = this.state;

        return(
            <React.Fragment>
                <Container id="container">
                    { notes.map(note =>
                        <Note
                            disabled={ noteId === note.id }
                            key={ note.id }
                            onEdit={ this.editNote(note.id) }
                            onDelete={ () => this.removeNote(note.id) }
                            {...note}
                        />
                    ) }
                </Container>
                <Footer>
                    <TextField
                        color={ color }
                        value={ text }
                        onChange={ (value) => this.setState({ text: value })}
                    />
                    <ColorList onClick={ (color) => this.setState({ color }) } />
                    { editing === false
                        ? (
                            <Button
                                color="#2C91D1"
                                icon="add"
                                label="Agregar"
                                onClick={ this.addNote }
                            />
                        )
                        : (
                            <Button
                                color="#2C91D1"
                                icon="save"
                                label="Guardar"
                                onClick={ this.saveNote }
                            />
                        )
                    }
                </Footer>
            </React.Fragment>
        );
    }
}

const Container = styled.div`
    align-content: flex-start;
    box-sizing: border-box;
    display: flex;
    height: calc(100% - 137px);
    flex-wrap: wrap;
    overflow: auto;
    margin-bottom: 12px;
    padding: 12px;
    width: 100%;

    > div:last-child {
        margin-bottom: 0;
    }
`;

const Footer = styled.div`
    box-sizing: border-box;
    display: flex;
    height: 125px;
    flex-wrap: wrap;
    justify-content: flex-end;
    padding: 0 12px;
    width: 100%;
`;

export default NoteApp;