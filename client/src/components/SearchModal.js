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
        //title: '',
        items: [],
        isFetching: false
    };
    const [state, setState] =  useState(initialState);
    const [modal, setModal] = useState({modal: false});
    const [title, setTitle] = useState({title: ''})
    const toggle = () => {
        setModal({
            modal: !modal.modal
        });
    }

    let onChange = (e) => {
        
        //setState({ [e.target.title]: e.target.value });
        setTitle({ title: e.target.value });
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
            
            //if(title.title == "") state.items = [];
            try {
                const query = `https://www.googleapis.com/books/v1/volumes?q=${title.title}&key=AIzaSyA2DOGbsIsQqTyOEsyZWXjTAJY-WwEAyjE`
                //const query = 'https://www.googleapis.com/demo/v1'
                setState({items: state.items, isFetching: true});
                const response = await axios.get(query);
                console.log(response);
                
                setState({items: response.data.items, isFetching: false});
            } catch (e) {
                console.log(e);
                setState({items: state.items, isFetching: false});
            }
        };
        
        
        fetchItems();
        
    }, [title.title]);


    const res = state.items;
    let resultsToRender = '';
    if (state.items != undefined){
        
        const books  = state.items;   
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
                    autoComplete="off"
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