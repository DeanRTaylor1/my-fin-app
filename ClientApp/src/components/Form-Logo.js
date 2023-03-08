import { NavLink } from 'react-router-dom';

const FormLogo = ({ color }) => {
  const logoStyle = `logo ${color}`;

  return (
    <div className={logoStyle}>
      <NavLink to='/'>MyFin</NavLink>
    </div>
  );
};

export default FormLogo;
