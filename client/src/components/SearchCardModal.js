import React, {Component, useState, useEffect} from 'react';

import {
    Container,
    Modal,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button
} from 'reactstrap';
import { connect } from 'react-redux';
import {addBook} from '../actions/bookActions';

// For now I'll make this a clickable button that we'll put at the end of ..
// .. the result list group item that when clicked opens up a new modal ..
// .. that get's passed the data of that item as a prop that'll we'll parse into..
// .. a card of some type


// prop will be an item in the items array of our google api return call
//call this like <SearchCardModal book = bookObj/>
function SearchCardModal(props) {
    const {id, volumeInfo} = props.book;
    const [cardModal, setCardModal] = useState({modal: false});
    
    const toggleCard = () => {
        setCardModal({
            modal: !cardModal.modal
        });
    }

    return (
        <div>
            <Button color="info" onClick={toggleCard}>+</Button>
            <Modal isOpen={cardModal.modal} toggle={toggleCard} key={id}>
                <ModalHeader toggle={toggleCard}>{volumeInfo.title}</ModalHeader>
                <ModalBody>
                    <img src={volumeInfo.imageLinks.thumbnail}/>
                    <br/>
                    {volumeInfo.description}
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={toggleCard}>Add to List</Button>{' '}
                <Button color="secondary" onClick={toggleCard}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );


}

export default connect()(SearchCardModal);