import axios from 'axios';
import {GET_BOOKS, ADD_BOOK, DELETE_BOOK, BOOKS_LOADING} from './types';
const username = "test4";
const uid = "5fa37c6c5c81861184e065fd"
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


export const addBook = bookObject => dispatch => {
    console.log("bookObject: ", bookObject);
    axios.post(`/lists/${uid}`, bookObject)
    .then(res => 
        dispatch({
            type: ADD_BOOK,
            payload: res.data
        })
    )
    /*return{
        type: ADD_BOOK,
        payload: bookObject 
    }*/
};


export const deleteBook = id  => dispatch => {
    //axios.delete(`/lists/${uid}`, {data: {id: id}})
    axios.delete(`/lists/${uid}/${id}`)
    .then(res =>
        dispatch({
            type: DELETE_BOOK,
            payload: id
        })
    )

    /*return{
        type: DELETE_BOOK,
        payload: id
    }*/
};



export const setBooksLoading = () => {
    return {
        type: BOOKS_LOADING
    }
}