import React, { Component } from 'react'
import { Container, Pagination } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Redirectbutton from './Redirectbutton';
import { EditTitle } from './EditTitle';
import { getDatabase, ref, onValue } from 'firebase/database';

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const db = getDatabase();
let UniqueNumber = 0;

export default class Library extends Component {
  
  constructor() {
    super();
    this.state = {
      tableData: [],
      searchInput: '',
      currentPage: 1,
      recordsPerPage: 10,
    };
  }

  componentDidMount() {
    const dbRef = ref(db, 'books');

    onValue(dbRef, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapshot) => {
        let title = childSnapshot.key;
        let data = childSnapshot.val();
        records.push({ key: title, data });
      });
      this.setState({ tableData: records });
    });
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ searchInput: e.target.value });
  };

  filteredBooks = () => {
    const searchInput = this.state.searchInput;
    const tableData = this.state.tableData;

    return tableData.filter((row) => {
      return (
        row.key.includes(searchInput) ||
        row.data.authors.includes(searchInput) ||
        row.data.category.includes(searchInput) ||
        String(row.data.edition).includes(searchInput) ||
        row.data.ISBN.includes(searchInput) ||
        row.data.language.includes(searchInput)
      );
    });
  };

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  render() {
    const filteredBooks = this.filteredBooks();
    const currentPage = this.state.currentPage;
    const recordsPerPage = this.state.recordsPerPage;
    
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = filteredBooks.slice(firstIndex, lastIndex);
    const npage = Math.ceil(filteredBooks.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);
    const filteredNumbers = numbers.filter((pageNumber) => {
      return (
        pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2
      );
    });
      
    return (
      <Container className='container p-3 my-5 bg-light border border-primary'>
        <div>
          <h3 className='text-2xl font-bold py-3'>Home Collection</h3>
          <Row>
            <Col sm={6}><Form.Control
              type="search"
              placeholder="Search the Collection"
              onChange={this.handleChange}
              value={this.state.searchInput}/>
              <Form.Text>
                <p>Start in Page 1 and use capital letters to search for titles and authors, and dashes for the ISBN.</p>
              </Form.Text>
            </Col>
            <Col></Col>
            <Col sm={4} className='float-md-right'><Redirectbutton /></Col>
          </Row>    
          <br />

          {filteredBooks &&(
              <Table className='table table-striped nowrap' >
                <Thead>
                  <Tr>
                      <Th>#</Th>
                      <Th>TITLE</Th>
                      <Th>AUTHORS</Th>
                      <Th>CATEGORY</Th>
                      <Th>LANGUAGE</Th>
                      <Th>EDITION</Th>
                      <Th>ISBN</Th>
                      <Th>...</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {records.map((row, index) => {
                    return (
                      <Tr key={UniqueNumber++}>
                        <Td>{index + 1}</Td>
                        <Td>{row.key}</Td>
                        <Td>{row.data.authors}</Td>
                        <Td>{row.data.category}</Td>
                        <Td>{row.data.language}</Td>
                        <Td>{row.data.edition}</Td>
                        <Td>{row.data.ISBN}</Td>
                        <Td className='text-center'><EditTitle title={row.key} record={row.data}/></Td>
                    </Tr>
                      );
                    })}       
                </Tbody>
              </Table>
            )}

            <Pagination limit={5} hide-ellipsis>
              <Pagination.First
                onClick={() => this.handlePageChange(1)}
                disabled={currentPage === 1}
              />
              <Pagination.Prev
                onClick={() => this.handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {filteredNumbers.map((pageNumber, index) => (
                <Pagination.Item
                  key={index}
                  active={currentPage === pageNumber}
                  onClick={() => this.handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => this.handlePageChange(currentPage + 1)}
                disabled={currentPage === npage}
              />
              <Pagination.Last
                onClick={() => this.handlePageChange(npage)}
                disabled={currentPage === npage}
              />
            </Pagination>            

        </div>
      </Container>
    )
  }
}