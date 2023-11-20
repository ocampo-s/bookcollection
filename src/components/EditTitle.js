import React from "react";
import { Button, Modal, Form, ModalHeader } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ref, get, update, remove, child } from "firebase/database";
import { getDatabase, onValue } from 'firebase/database';

const db = getDatabase();

export class EditTitle extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            record: {
                //I already used title: props.key the data; to call the key, does it need to be title: props.record.key?
                title: props.title,

                authors: props.record.authors,
                category: props.record.category,
                language: props.record.language,
                edition: props.record.edition,
                ISBN: props.record.ISBN
            },
        }
        
    }
    //remove componentDidMount after testing
    componentDidMount(){
        const dbRef = ref(db, 'books');
        onValue(dbRef, (snapshot) => {
            let records = [];
            snapshot.forEach((childSnapshot) => {
              let keyName = childSnapshot.key;
              let data = childSnapshot.val();
              records.push({ key: keyName, data });
            });
            this.setState({ tableData: records });
          });

        console.log(this.state.record);
    }

    render(){
        return (
            <>
                <Button variant="outline-warning" className="ms-2" onClick={()=>{this.openModal()}}>EDIT</Button>

                <Modal show={this.state.isOpen}>
                    <ModalHeader>
                        <Modal.Title>EDIT</Modal.Title>
                        <Button size="sm" variant="dark" onClick={()=>{this.closeModal()}}>X</Button>
                    </ModalHeader>

                    <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={this.state.title} onChange={e => {this.setState({title: e.target.value})}} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Author/s</Form.Label>
                            <Form.Control type="text" value={this.state.authors} onChange={e => {this.setState({authors: e.target.value})}} />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="text" value={this.state.category} onChange={e => {this.setState({category: e.target.value})}}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Language</Form.Label>
                            <Form.Control type="text" value={this.state.language} onChange={e => {this.setState({language: e.target.value})}}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Edition</Form.Label>
                            <Form.Control type="number" value={this.state.edition} onChange={e => {this.setState({edition: e.target.value})}}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>ISBN</Form.Label>
                            <Form.Control type="text" value={this.state.ISBN} onChange={e =>{this.setState({ISBN: e.target.value})}} />
                        </Form.Group>
                    </Form>  
                    </Modal.Body>

                    <Modal.Footer>
                        <Row>
                            <Col></Col>
                            <Col></Col>
                            <Col className='text-center'><Button variant='outline-warning' onClick={()=>{this.updateData()}}>EDIT</Button></Col>
                            <Col className='text-center'><Button variant='outline-danger' onClick={()=>{this.deletData()}}>DELETE</Button></Col>
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

    getAllData(){
        return {
            id: this.state.title,
            data: {
                title: this.state.title,
                authors: this.state.authors,
                category: this.state.category,
                language: this.state.language,
                edition: this.state.edition,
                ISBN: this.state.ISBN
            }
        }
    }

    interface(event){
        const id = event.target.id;

        if(id === 'update'){
            this.updateData();
        }
        else if(id === 'delete'){
            this.deleteData();
        }

        this.closeModal();
    }

    updateData(){
        const dbRef = ref(db);
        const record = this.getAllData();
        const address = 'books/' + record.id;

        get(child(dbRef, address)).then(snapshot => {
            if(snapshot.exists()){
                update(ref(db, address), record.data);
                alert('The title was updated successfully');
            }
            else {
                alert('To update the book\'s title, exit this form and click on the ADD TITLE')
            }
        })
    }

    deletData(){
        const dbRef = ref(db);
        const record = this.getAllData();
        const address = 'books/' + record.id;

        get(child(dbRef, address)).then(snapshot => {
            if(snapshot.exists()){
                remove(ref(db, address));
                alert('The title was deleted successfully');
            }
            else {
                alert('cannot delete the title')
            }
        })
    }

}


