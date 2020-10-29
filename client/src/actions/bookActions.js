import axios from 'axios';
import {GET_BOOKS, ADD_BOOK, DELETE_BOOK, BOOKS_LOADING} from './types';
const username = "test4";
const uid = "5f854ee1a9bcc82d440d9d4b"
export const getBooks = () => dispatch => {
    dispatch(setBooksLoading());
    //axios.get(`/users/${username}/booklist`)
    axios.get(`/lists/${uid}`)
    .then(res =>
        dispatch({
            type: GET_BOOKS,
            payload: res.data.list
        }) 
    )
};

export const deleteBook = (id) => {
    
    return{
        type: DELETE_BOOK,
        payload: id
    }
};

export const addBook = bookObject => {
    return{
        type: ADD_BOOK,
        payload: bookObject 
    }
};

export const setBooksLoading = () => {
    return {
        type: BOOKS_LOADING
    }
}