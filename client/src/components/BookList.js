import React, {Component} from 'react';
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {v1 as uuid} from 'uuid';   //For prototyping with static data

class BookList extends Component {
    state = {
        items: [
            { id: uuid(), title: 'Exhalation', rating: 9, genre: 'Fiction'},
            { id: uuid(), title: 'Animal Farm', rating: 8, genre: 'Satire'},
            { id: uuid(), title: '1984', rating: 9, genre: 'Dystopia'},
            { id: uuid(), title: 'Stories of Your Life', rating: 9, genre: 'Fiction'},
        ]
    }

    render(){
        const { items } = this.state;
        return (
            <Container>
                <ListGroup>
                    <TransitionGroup className="book-list">
                        {items.map(({id, title, rating, genre}) =>(
                            <CSSTransition key={id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    {title}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}
export default BookList;