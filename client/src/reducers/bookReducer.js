import {v1 as uuid} from 'uuid';
import {GET_BOOKS, ADD_BOOK, DELETE_BOOK} from '../actions/types';

const initialState = {
    books: [
        { id: uuid(), title: 'Exhalation', rating: 9, genre: 'Fiction'},
        { id: uuid(), title: 'Animal Farm', rating: 8, genre: 'Satire'},
        { id: uuid(), title: '1984', rating: 9, genre: 'Dystopia'},
        { id: uuid(), title: 'Stories of Your Life and Others', rating: 9, genre: 'Fiction'},
    ]
}

export default function(state=initialState, action) {
    switch(action.type){
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
            }
        default:
            return state;
    }
}