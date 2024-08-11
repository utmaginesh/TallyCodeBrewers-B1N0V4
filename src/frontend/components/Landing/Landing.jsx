import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import styled from 'styled-components';

const Navbar = styled.nav`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: transparent;
    padding: 20px 30px;
    font-family: 'Poppins', sans-serif;
    position: absolute;
    width: 100%;
    z-index: 1000;
    box-sizing: border-box;
`;

const NavItem = styled(Link)`
  color: #2c3e50;
  margin-left: 30px;
  text-decoration: none;
  font-weight: bold;
  font-size: 20px;
`;

const Logo = styled.div`
  position: absolute;
  left: 30px;
  font-size: 24px;
  font-weight: bold;
  color: white;
  font-family: 'Poppins', sans-serif;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #2c3e50 50%, #ffffff 50%);
  height: 100vh;
  color: #2c3e50;
  padding: 0 5px;
  box-sizing: border-box;
  overflow: hidden;
`;

const Content = styled.div`
  flex: 1;
  z-index: 1;
  max-width: 50%;
  margin-right: 25px;
`;

const Title = styled.h1`
  font-size: 40px;
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-weight: bold;
  margin-bottom: 20px;
  color: white;
  text-shadow: 1px 1px 5px rgba(0,0,0,0.2);
`;

const Description = styled.p`
  font-size: 20px;
  font-family: Verdana, Arial, Helvetica, sans-serif;
  margin-bottom: 40px;
  color: white;
  text-shadow: 1px 1px 5px rgba(0,0,0,0.2);
`;

const Button = styled(Link)`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 15px 30px;
  cursor: pointer;
  font-size: 18px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  text-decoration: none;
  display: inline-block;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #c0392b;
    transform: translateY(-2px);
  }
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  z-index: 1;
  object-fit: cover;
  max-height: 100%;
`;

function Landing() {
  return (
    <div>
        <Navbar>
            <Logo>CODESPHERE</Logo>
            <NavItem to="/login">Login</NavItem>
        </Navbar>
        <Header>
            <Content>
                <Title>A New Way to Learn</Title>
                <Description>
                    CodeSphere is the best platform to help you enhance your skills, expand your knowledge, and prepare for technical interviews.
                </Description>
                <Button to="/login">Register</Button>
            </Content>
            <Image src="https://static.vecteezy.com/system/resources/previews/033/223/075/non_2x/web-development-or-programming-language-concept-css-html-it-ui-cartoon-character-programmer-developing-website-coding-software-developer-with-laptop-illustration-on-white-background-vector.jpg" alt="Programming Illustration" />
        </Header>
    </div>
  );
}

export default Landing;
