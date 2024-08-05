import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <nav>
      <Link to='/' className='logo'>
        <img src={logo} alt='Logo' />
        <p>BANCO</p>
      </Link>
      {location.pathname !== "/" && (
        <button onClick={handleBackClick} className='back-button'>
          Regresar
        </button>
      )}
    </nav>
  );
};

export default Navbar;
