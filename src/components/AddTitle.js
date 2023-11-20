import React from "react";
import { Button, Modal, Form, ModalHeader } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { getDatabase } from 'firebase/database';
import { ref, set, get, update, remove, child } from "firebase/database";

export class AddTitle extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            record: {
                //I already used title: props.key the data; to call the key, does it need to be title: props.record.key?
                title: '',

                authors: '',
                category: '',
                language: '',
                edition: '',
                ISBN: ''
            },
        }
        
    }
   
    componentDidMount(){
        this.setState({
            db: getDatabase()
        });
    }


    render(){
        return (
            <>
                <Button variant="primary" className="ms-2" onClick={()=>{this.openModal()}}>ADD</Button>

                <Modal show={this.state.isOpen}>
                    <ModalHeader>
                        <Modal.Title>ADD</Modal.Title>
                        <Button size="sm" variant="dark" onClick={()=>{this.closeModal()}}>X</Button>
                    </ModalHeader>

                    <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter the name of the item" value={this.state.key} onChange={e => {this.setState({key: e.target.value})}}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Author/s</Form.Label>
                            <Form.Control type="text" placeholder="Use eds. or et. al. if more than two" value={this.state.authors} onChange={e => {this.setState({authors: e.target.value})}} />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="text" placeholder="anthropology, folklore, religion..." value={this.state.category} onChange={e => {this.setState({category: e.target.value})}}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Language</Form.Label>
                            <Form.Control type="text" placeholder="language" value={this.state.language} onChange={e => {this.setState({language: e.target.value})}}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Edition</Form.Label>
                            <Form.Control type="number" placeholder="Year of publication" value={this.state.edition} onChange={e => {this.setState({edition: e.target.value})}}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>ISBN</Form.Label>
                            <Form.Control type="text" placeholder="Include the dashes" value={this.state.ISBN} onChange={e => {this.setState({ISBN: e.target.value})}}/>
                        </Form.Group>                         
                    </Form>  
                    </Modal.Body>
                    <Modal.Footer>
                        <Row>
                            <Col></Col>
                            <Col></Col>
                            <Col className='text-center'><Button variant='primary' id='addBtn' onClick={this.interface}>ADD</Button></Col>
                            <Col></Col>

                        </Row>
                    </Modal.Footer>

                </Modal>
            </>
            )
    }

    openModal(){
        let rec = this.state.record;

        this.setState({
            isOpen: true,
            title: rec.title,
            authors: rec.authors,
            category: rec.category,
            language: rec.language,
            edition: rec.edition,
            ISBN: rec.ISBN 
        })
    }

    closeModal(){
        this.setState({
            isOpen: false
        })
    }
    
    interface(event){
        const id = event.target.id;
            if(id === 'addBtn'){
                this.insertData();
            }
    }

    getAllInputs(){
        return {
            key: this.state.key,
            authors: this.state.authors,
            category: this.state.category,
            language: this.state.language,
            edition: Number(this.state.edition),
            ISBN: this.state.ISBN

        }
    }


    insertData(){
        const db = this.state.db;
        const data = this.getAllInputs();
        
        set(ref(db, 'books/'+ data.key),
        {
            authors: data.authors,
            category: data.category,
            language: data.language,
            edition: data.edition,
            ISBN: data.ISBN
        })
        .then(() => {
            alert('The title was added successfully');
            window.location.reload();
        })
        .catch((error) => {alert("there was an error, details: " + error)});
    }


}


