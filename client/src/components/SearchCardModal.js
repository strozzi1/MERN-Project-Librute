import React, {Component, useState, useEffect} from 'react';

import {
    Container,
    Modal,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    Grid,
    Row,
    Col
} from 'reactstrap';
import { connect } from 'react-redux';
import { addBook } from '../actions/bookActions';

// For now I'll make this a clickable button that we'll put at the end of ..
// .. the result list group item that when clicked opens up a new modal ..
// .. that get's passed the data of that item as a prop that'll we'll parse into..
// .. a card of some type


// prop will be an item in the items array of our google api return call
//call this like <SearchCardModal book = bookObj/>
function SearchCardModal(props) {
    const {id, volumeInfo} = props.item;
    const [cardModal, setCardModal] = useState({modal: false});
    
    
    const toggleCard = () => {
        setCardModal({
            modal: !cardModal.modal
        });
    };

    const onSubmit = () => {
        const newBook = {
            title: volumeInfo.title,
            genre: volumeInfo.categories[0] ? volumeInfo.categories : 'Unknown',
            author: volumeInfo.authors[0] ? volumeInfo.authors : 'Unknown',
            description: volumeInfo.description,
            imageLinks: volumeInfo.imageLinks ? volumeInfo.imageLinks.smallThumbnail : '',
            id: id,
            rating: 0

        }

        
        // add item via addBook redux action
        props.addBook(newBook);

        // Close Modal
        toggleCard();
        

    };


    const thumbnailImage = volumeInfo.imageLinks ? <img src={volumeInfo.imageLinks.thumbnail}/> : <img style={{width: 128, height: 197}} src="https://mel.cgiar.org/graph/getthumbhash/hash/wZ6S6117/fetchthumbs/1/file_type/pdf"/>
    const bookAuthor = volumeInfo.authors ? <strong>Authored by {volumeInfo.authors[0]}</strong> : <span>Authored by Unknown</span>
    const bookGenre = volumeInfo.categories ? <span>{volumeInfo.categories[0]}</span> : <span></span>
    const bookDetails = <Col>{bookAuthor}<br/>{bookGenre} </Col>
    return (
        <div>
            <Button color="info" onClick={toggleCard}>+</Button>
            <Modal isOpen={cardModal.modal} toggle={toggleCard} key={id}>
                <ModalHeader toggle={toggleCard}>{volumeInfo.title}</ModalHeader>
                <ModalBody>
                    <Container fluid>
                        <Row>
                            <Col md="auto">{thumbnailImage}</Col>
                            {bookDetails}
                        </Row>
                        <hr/>
                        <Row>
                            <strong>Description:</strong><br/>
                            {volumeInfo.description}
                        </Row>
                    </Container>
                    
                    
                    
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={onSubmit}>Add to List</Button>{' '}
                <Button color="secondary" onClick={toggleCard}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );


}

const mapStateToProps = (state) => {
    console.log("This is the redux State: ", state);
    return { book: state.book }
}

export default connect(mapStateToProps, { addBook })(SearchCardModal);