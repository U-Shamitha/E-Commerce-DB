// components/Navbar.js
import styled from 'styled-components';
import { primaryColor } from '../values/color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'

const StyledNav = styled.nav`
  background-color: ${primaryColor};
  color: white;
  height: 60px;
  padding: 0px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add box shadow */
  position: sticky;
  top: 0; /* Stick to the top */
  z-index: 1000; /* Add z-index to ensure it appears above other elements */
//   border-radius: 0px 0px 10px 10px;
`;

const Navbar = ({toggleSidebar}) =>{
    return(
        <StyledNav>
            <div style={{display:'flex', gap:'40px'}}>
                <FontAwesomeIcon icon={faBars}  onClick={toggleSidebar} size='lg'/>
                <Link to="/fillDetails">Fill Details</Link>
                <Link to="/products">Products</Link>
                <Link to="/profile">Profile</Link>
            </div>
            <Link to="/">E COMMERCE</Link>
        </StyledNav>
    )
}

export default Navbar;
