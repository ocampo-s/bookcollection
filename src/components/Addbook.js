import React from 'react';
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { getDatabase } from "firebase/database"
import { ref, set, get, update, remove, child } from "firebase/database"

export class Addbook extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            db:'',
            key:'',
            authors:'',
            category:'',
            language:'',
            edition:'',
            ISBN:''
        }
        this.interface = this.interface.bind(this);
    }


    
    componentDidMount(){
        this.setState({
            db: getDatabase()
        });
    }

    render(){

        return(
            
        <Container fluid="md">
        <div>
            <p></p>
            <h3>ADD A TITLE</h3>
            <p ></p>
        </div>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter the name of the book, magazine, newspaper, or loose article" value={this.state.key} onChange={e => {this.setState({key: e.target.value})}}/>
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
                <Row>
                    <Col className='text-center'><Button variant='outline-info' id='addBtn' onClick={this.interface}>ADD</Button></Col>
                    <Col className='text-center'><Button variant='outline-info' id='selectBtn' onClick={this.interface}>GET TITLE</Button></Col>
                    <Col className='text-center'><Button variant='outline-warning' id='updateBtn' onClick={this.interface}>UPDATE</Button></Col>
                    <Col className='text-center'><Button variant='outline-danger' id='deleteBtn' onClick={this.interface}>DELETE</Button></Col>
                </Row>
            </Form>
        </Container>
                
        )
                
    }
     
        
    interface(event){
            const id = event.target.id;
        if(id === 'addBtn'){
            this.insertData();
        }

        else if(id === 'updateBtn'){
        this.updateData();
        }

        else if(id === 'deleteBtn'){
        this.deleteData();
        }

        else if(id === 'selectBtn'){
        this.selectData();
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

    updateData(){
        const db = this.state.db;
        const data = this.getAllInputs();
        
        update(ref(db, 'books/'+ data.key),
        {
            authors: data.authors,
            category: data.category,
            language: data.language,
            edition: data.edition,
            ISBN: data.ISBN
        })
        .then(() => {
            alert('The title was updated successfully');
            window.location.reload();
        })
        .catch((error) => {alert("there was an error, details: " + error)});
    }

    deleteData(){
        const db = this.state.db;
        const key = this.getAllInputs().key;

        remove(ref(db, 'books/'+ key))
        .then(() => {
            alert('The title was deleted successfully');
            window.location.reload();
        })
        .catch((error) => {alert("there was an error, details: " + error)});
    }

    selectData(){
        const dbref = ref(this.state.db);
        const key = this.getAllInputs().key;
        
        get(child(dbref, 'books/' + key)).then((snapshot) => {
            if(snapshot.exists()){
                this.setState({
                    authors: snapshot.val().authors,
                    category: snapshot.val().category,
                    language: snapshot.val().language,
                    edition: snapshot.val().edition,
                    ISBN: snapshot.val().ISBN,
                })
            }

            else {
                alert("No data found.");
            }
        })
        .catch((error) => {alert("There was an error, details: " + error)});
    }
    
}


