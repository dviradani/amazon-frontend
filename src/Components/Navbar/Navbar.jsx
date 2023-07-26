import {Navbar , Container, Badge, NavDropdown} from 'react-bootstrap';
import {Link , useNavigate } from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import './Navbar.css'
import { useContext } from 'react';
import { store } from '../../Context/store';
import { USER_SIGNOUT } from '../../Reducers/Actions';
const NavBar = () => {
    const navigate = useNavigate();
    const {state , dispatch : ctxDispatch} = useContext(store);
    const {cart, userInfo} = state;
    const {cartItems} = cart;

    const signoutHandler = () => {
        ctxDispatch({type: USER_SIGNOUT})
    }
  return (
    <header className="app-header">
      <Navbar bg='dark' variant="dark">
        <Link onClick={() => {navigate(-1)}} className='ms-5'>
            Back
        </Link>

        <Container>
        <LinkContainer to="/">
            <Navbar.Brand>
        <img src="https://companieslogo.com/img/orig/AMZN_BIG.D-8fb0be81.png?t=1632523695" width={100}  alt="AMZN" />
            </Navbar.Brand>
        </LinkContainer>

        <nav className="d-flex mx-auto align-items-center">
        <input type="text" />
        </nav>

        <Link to='/cart' className='nav-link me-4 ms-4'>
            <i className='fas fa-shopping-cart text-white'>
            </i>
        {cart.cartItems.length > 0  && (
          <Badge pill bg='danger'>
            {cartItems.reduce((acc, item) => acc + item.quantity,0)}
          </Badge>
        )}
        </Link>
        {userInfo ? (
          <NavDropdown className='text-white me-5' title={userInfo.name}>
            <Link className='dropdown-item' to='#signout' onClick={signoutHandler}>
            sign out 
            </Link>
          </NavDropdown>
        ) : (
          <Link className='text-white' to='/signin'>
            sign in
          </Link>
        )}
        </Container>
      </Navbar>
    </header>
  );
};
export default NavBar
