import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

const OuterContainer = styled.div`
  position: relative;
  min-height: 100vh;
  padding: 20px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 60px; /* Add padding to account for the logo height */
`;

const Logo = styled.img`
  position: absolute;
  top: 20px;
  left: 20px;
  height: 50px;
`;

const FormContainer = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  width: 600px;
  text-align: left;
  margin-right: 20px; /* Add some space between form and image */
`;

const Title = styled.h2`
  margin-top: 100px;
  margin-bottom: 80px;
  font-size: 24px;
  color: #333;
`;

const Input = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 50px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #116E6A;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
`;

const SmallButton = styled(Button)`
  margin-bottom: 50px;
  width: auto;
  padding: 10px 20px;
  margin-left: 20px;
`;

const Image = styled.img`
  margin-top: 80px;
  height: 400px; /* Adjust as needed */
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;



const EmailVerification = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { name, dateOfBirth, institution } = location.state;
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
  
    const handleConfirm = async () => {
      try {
        const response = await fetch('http://localhost:3000/save-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, dateOfBirth, institution, email, verificationCode }),
        });
        if (response.ok) {
          alert('User information saved successfully');
          navigate('/'); // Redirect to a success page or home page
        } else {
          alert('Error saving user information');
        }
      } catch (error) {
        alert('Error saving user information');
      }
    };
  
    return (
      <OuterContainer>
        <Logo src="/assets/Logo.png" alt="EduHive Logo" /> {/* Ensure the correct path to your image */}
        <Container>
          <FormContainer>
            <Title>Input your email, click “Verify”, Check your email and get verification code</Title>
            <Row>
              <Input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
              <SmallButton>Verify</SmallButton>
            </Row>
            <Row>
              <Input type="text" placeholder="Verification Code" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
              <SmallButton onClick={handleConfirm}>Confirm</SmallButton>
            </Row>
          </FormContainer>
          <Image src="/assets/Hive.png" alt="Verification" />
        </Container>
      </OuterContainer>
    );
  };
  
  export default EmailVerification;
