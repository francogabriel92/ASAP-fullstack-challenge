import { Navbar as Nav } from 'react-bootstrap';
import Search from '../Search/Search';

const Navbar = () => {
  return (
    <Nav bg="danger" className='px-2 px-md-5 d-flex flex-column align-items-start flex-md-row'>
      <Nav.Brand className='text-white'>React Test App</Nav.Brand>
      <Search />
    </Nav>
  )
}

export default Navbar