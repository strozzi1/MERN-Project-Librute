import React, {Component, component} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import {addBook} from '../actions/bookActions';
import { FaSearch } from 'react-icons/fa'

class SearchModal extends Component {
    state = {
        modal: false,
        title: ''
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({ [e.target.title]: e.target.value })
    }

    render() {
        return(
            <div>
                <FaSearch 
                    className="search-icon"
                    size="1.2em"
                    title="Search books"
                    onClick = {this.toggle}
                />

            <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
            >
                <Input
                    type="text"
                    name="title"
                    id="search"
                    placeholder="Search Books..."
                    onChange={this.onChange} 
                >
                </Input>
            </Modal>

            </div>
        )
    }

}

export default connect()(SearchModal);