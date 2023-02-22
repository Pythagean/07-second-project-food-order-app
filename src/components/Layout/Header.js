import React from 'react';
import classes from './Header.module.css';
import headerImage from '../../assets/burger.jpg';
import HeaderCartButton from './HeaderCartButton';

function Header(props){
    return (
        <React.Fragment>
            <header className={classes.header}>
                <h1>The Resistance Bar & Cafe</h1>
                <HeaderCartButton onClick={props.onShowCart} />
            </header>
            <div className={classes['main-image']}>
                <img src={headerImage} alt='header-burger' />
            </div>
        </React.Fragment>
    );
}

 export default Header;