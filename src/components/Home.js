import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaUser, FaLock } from 'react-icons/fa';
import { TbBrandCitymapper } from 'react-icons/tb'



const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await signIn(email, password)
      navigate('/library')
    } catch (e) {
      setError(e.message)
      console.log(e.message)
      alert("Invalid Sign In. Try again")
    }
  };

  return (
    <Container fluid="md" className='mt-5'>
      <h1 className='text-center'>A <TbBrandCitymapper /> B <TbBrandCitymapper /> C</h1>
      <p></p>
      <Form  onSubmit={handleSubmit}>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1"><FaUser /></InputGroup.Text>
        <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="ENTER A" />
      </InputGroup>
      <p></p>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1"><FaLock /></InputGroup.Text>
        <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="ENTER B" />
      </InputGroup>

      <Row>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col className='float-md-right'>
            <Button variant="primary" type="submit">
            GO TO C
            </Button>
          </Col>
      </Row>
    </Form>

    </Container>
  );
}

export default Home