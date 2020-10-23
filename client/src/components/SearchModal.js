import React, {Component, useState, useEffect} from 'react';

import {
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Media,
    Spinner,
    Input,
    ListGroup,
    ListGroupItem
} from 'reactstrap';
import { connect } from 'react-redux';
import {addBook} from '../actions/bookActions';
import { FaSearch } from 'react-icons/fa';
import axios from "axios";
import useDebounce from '../utils/use-debounce';
import SearchCardModal from './SearchCardModal';

function SearchModal() {
    
    //I should separate this out, but this state holds current search items and 
    //isFetching bool
    let initialState = {
        items: [],
        isFetching: false
    };
    // Gets past into use State hook
    const [state, setState] =  useState(initialState);
    const [modal, setModal] = useState({modal: false});
    const [title, setTitle] = useState({title: ''})
    
    // Now we call our hook, passing in the current searchTerm value.
    // The hook will only return the latest value (what we passed in) ...
    // ... if it's been more than 500ms since it was last called.
    // Otherwise, it will return the previous value of searchTerm.
    // The goal is to only have the API call fire when user stops typing ...
    // ... so that we aren't hitting our API rapidly.
    const debouncedSearchTerm = useDebounce(title, 500);
    
    const toggle = () => {
        setModal({
            modal: !modal.modal
        });
        setTitle({
            title: ''
        });
        setState({
            items: [],
            isFetching: false
        })
    }

    const onChange = (e) => {
        setTitle({ title: e.target.value });
    }

    // Here's where the API call happens
    // We use useEffect since this is an asynchronous action
    useEffect(() => {
        // Make sure we have a value (user has entered something in input)
        if(debouncedSearchTerm.title){
            setState({isFetching: true});
            // Fire off our API call
            fetchItems(debouncedSearchTerm.title).then(results => {
                setState({isFetching: false, items: results})
            })

        } else {
            setState({isFetching: false, items: []});
        }
        // Our useEffect function will only execute if this value changes ...
        // ... and thanks to our hook it will only change if the original ...
        // value (searchTerm) hasn't changed for more than 500ms.
    }, [debouncedSearchTerm]);

    // API search function
    const fetchItems = async (searchTerm) => {
 
        try {
            //const query = `https://www.googleapis.com/books/v1/volumes?q=${title.title}&key=AIzaSyA2DOGbsIsQqTyOEsyZWXjTAJY-WwEAyjE`
            console.log(searchTerm);
            const query = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=AIzaSyBCK9Ek9zeKRdfeZuif0S499J25MTFgHFM` //backup key        
            const response = await axios.get(query);
            console.log(response.data.items);
            return response.data.items
        } catch (e) {
            console.log(e);
            return [];
        }
    };

    const truncate = (str) => {
        return str.length > 45 ? str.substring(0, 45) + '...' : str;
    }
    
    let resultsToRender = '';
    if (state.items !== undefined){
        const books  = state.items;   
        resultsToRender = <ListGroup>
            {books.map(book => (
            <ListGroupItem key={book.id} className="d-flex justify-content-between align-items-center">
                {truncate(book.volumeInfo.title)} <SearchCardModal item={book}/>
            </ListGroupItem>
            ))} 
        </ListGroup>
    }
    else{
        resultsToRender = <div><Spinner color="dark" /></div>
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
                
                {resultsToRender}
                
                

            </Modal>

            </div>
        )
    

}

export default connect()(SearchModal);