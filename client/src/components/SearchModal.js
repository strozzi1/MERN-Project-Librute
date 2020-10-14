import React, {Component, useState, useEffect} from 'react';
import {
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    ListGroup,
    ListGroupItem
} from 'reactstrap';
import { connect } from 'react-redux';
import {addBook} from '../actions/bookActions';
import { FaSearch } from 'react-icons/fa';
import axios from "axios";

function SearchModal() {
    
    let initialState = {
        //modal: false,
        title: '',
        items: [],
        isFetching: false
    };
    const [state, setState] =  useState(initialState);
    const [modal, setModal] = useState({modal: false});

    const toggle = () => {
        setModal({
            modal: !modal.modal
        });
    }

    let onChange = (e) => {
        
        //setState({ [e.target.title]: e.target.value });
        setState({ title: e.target.value });
        /*const query = `https://www.googleapis.com/books/v1/volumes?q=${e.target.value}&key=AIzaSyA2DOGbsIsQqTyOEsyZWXjTAJY-WwEAyjE`
        fetch(query)
        .then(res => res.json())
        .then(json => {
            setState({
                items: json.items,
            })
        }); */
    }

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const query = `https://www.googleapis.com/books/v1/volumes?q=${state.title}&key=AIzaSyA2DOGbsIsQqTyOEsyZWXjTAJY-WwEAyjE`
                setState({items: state.items, isFetching: true, title: state.title});
                const response = await axios.get(query);
                console.log(response);
                setState({items: response.data.items, isFetching: false, title: state.title});
            } catch (e) {
                console.log(e);
                setState({items: state.items, isFetching: false, title: ''});
            }
        };
        fetchItems();
    }, [state.title]);

    /*useEffect(() => {
        const fetchItems = async () => {
            const query = `https://www.googleapis.com/books/v1/volumes?q=${state.title}&key=AIzaSyA2DOGbsIsQqTyOEsyZWXjTAJY-WwEAyjE`;
            const response = await axios.get(query);
            setState({items: response.data.items, title: state.title});
            
        };
        fetchItems();
    }, [state.title]);*/

    const res = state.items;
    let resultsToRender = '';
    if (state.items > 0){
        const { books }  = state.items;   
        resultsToRender = <ListGroup>
            {books.map(book => (
            <ListGroupItem key={book.id}>
                {book.volumeInfo.title}
            </ListGroupItem>
            ))} 
        </ListGroup>
        }
        return(
            <div>
                <FaSearch 
                    className="search-icon"
                    size="1.2em"
                    title="Search books"
                    onClick = {toggle}
                />

            <Modal
                isOpen={modal.modal}
                toggle={toggle}
            >
                <Input
                    type="text"
                    name="title"
                    id="search"
                    placeholder="Search Books..."
                    onChange={onChange} 
                >
                </Input>
                <Container>
                    {resultsToRender}
                </Container>
                

            </Modal>

            </div>
        )
    

}

export default connect()(SearchModal);