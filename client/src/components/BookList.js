import React, {Component} from 'react';
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {v1 as uuid} from 'uuid';   //For prototyping with static data
import {connect} from 'react-redux';
import {getBooks} from '../actions/bookActions';
import PropTypes from 'prop-types';


class BookList extends Component {

    componentDidMount() {
        this.props.getBooks();
    }

    render(){
        const { books } = this.props.book;
        return (
            <Container>
                <ListGroup>
                    <TransitionGroup className="book-list">
                        {books.map(({id, title, rating, genre}) =>(
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

BookList.propTypes = {
    getBooks: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    book: state.book                        //book: because in root reducer we named it book
})

export default connect(mapStateToProps, {getBooks})(BookList);