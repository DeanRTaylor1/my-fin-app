import { NavLink } from 'react-router-dom';


const Logo = ({
    color,
    mobileNavHandler,
    mobileProfileHandler,
}) => {
    const logoStyle = `logo ${color}`;

    const closeModalHandler = (e) => {
        //console.log('test');
        mobileNavHandler(e, 'button');
        mobileProfileHandler(e, 'button');
    };

    return (
        <div onClick={(e) => closeModalHandler(e)} className={logoStyle}>
            <NavLink className={logoStyle} style={{ textDecoration: 'none' }} activeStyle={{ color: 'red' }} to='/'>MyFin</NavLink>
        </div>
    );
};

export default Logo;