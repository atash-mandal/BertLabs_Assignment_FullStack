// src/Header.js
import React from 'react';
import { Row, Col, Button } from 'react-bootstrap'; 
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const navigate = useNavigate();

  const gotohome = () => {
    navigate('/');
  };

  const gotocharts = () =>{
    navigate('/charts');
  };


  return (
    <div>
      <div className='header'>
        <Row>
          <Col className='header-logo' sm={4} md={4} lg={4}>
            
          </Col>

          <Col className='header-text-logo' sm={4} md={4} lg={4}>
              <span onClick={gotohome}>Logo</span>
              <span onClick={gotohome}>RyoTen Luxury</span>
          </Col>

          <Col className='header-btn' sm={4} md={4} lg={4}>
            <span>
              <Button className="header-analytics-btn" onClick={gotocharts}>Analytics</Button>
            </span>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Header;