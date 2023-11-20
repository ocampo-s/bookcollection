import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';

const Account = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      console.log('You are logged out')
      alert("You have successfully signed out!")
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className='max-w-[600px] mx-auto my-16 p-4'>
      <h1 className='text-2xl font-bold py-4'>ACCOUNT</h1>
      <p>user</p>
      <p>{user && user.email}</p>
      <Row>
        <Col></Col>
        <Col></Col>
        <Col></Col>
        <Col className='float-md-right'>
          <Button onClick={handleLogout} variant="secondary" size="sm">
            SIGN OUT
          </Button>
        </Col>
      </Row>

    </div>
  );
};

export default Account;