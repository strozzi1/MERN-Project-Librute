import {v1 as uuid} from 'uuid';
import {GET_BOOKS, ADD_BOOK, DELETE_BOOK, BOOKS_LOADING} from '../actions/types';

const initialState = {
    books: [],
    loading: false
}

export default function(state=initialState, action) {
    console.log(action.type, "in reducer");
    switch(action.type){
        case ADD_BOOK: 
            {
                console.log("ADD_BOOK in reducer called: ", action.payload);
                return {
                    ...state,
                    books: [action.payload, ...state.books]
                }
            };
        case GET_BOOKS:
            return {
                ...state
            };
        case DELETE_BOOK:
            {
                
                return {
                    ...state,
                    books: state.books.filter(book => book.id !== action.payload)
                }
            };
        case BOOKS_LOADING:
            return {
                ...state, 
                loading: true
            }
        
        default:
            return state;
    }
}