import React, {Component} from 'react';
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {connect} from 'react-redux';
import {getBooks, deleteBook} from '../actions/bookActions';
import PropTypes from 'prop-types';


class BookList extends Component {

    componentDidMount() {
        console.log("getBooks");
        this.props.getBooks();
    }

    onDeleteClick = (id) => {
        //let idObj={};
        //idObj.id = id;
        this.props.deleteBook(id);
    }

    render(){
        const { books } = this.props.book;
        console.log(books);
        return (
            <Container>
                <ListGroup>
                    <TransitionGroup className="book-list">
                        {books.map(({id, title, rating, genre}) =>(
                            <CSSTransition key={id} timeout={500} classNames="fade">
                                <ListGroupItem transition="false" className="d-flex justify-content-between align-items-center">
                                    {title}
                                    <Button
                                    color="danger"
                                    size="sm"
                                    onClick={this.onDeleteClick.bind(this, id)}
                                    >

                                    </Button>
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

const mapStateToProps = (state) => {
    //console.log(state);
    return {book: state.book}                        //book: because in root reducer we named it book
}

export default connect(mapStateToProps, {getBooks, deleteBook})(BookList);