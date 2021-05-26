import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { getUser, logout } from './helpers';

const Nav = ({history}) => (
    <nav>
        <ul className="nav nav-tabs">
            <li className="nav-item pr-3 pt-3 pb-3" >
                <Link id="navStyle" to="/" style={{ textDecoration: 'none' }}> হোম </Link>
            </li>
            
            <li className="nav-item pr-3 pt-3 pb-3">
                <Link to="/create" style={{ textDecoration: 'none' }}> নিবন্ধ লিখুন </Link>
            </li>
            
            {!getUser() && 
            <li className="nav-item ml-auto pr-3 pt-3 pb-3">
            <Link to="/login" className="text-success" style={{ textDecoration: 'none' }}> লগ-ইন </Link>
            </li>
            }

            
            {getUser() && 
            <li onClick={ () => logout( ()=> history.push('/') ) } className="nav-item ms-auto pr-3 pt-3 pb-3"
            stlye={{ cursor: 'pointer'}}
            >
            <Link to="/logout" className="text-danger" style={{ textDecoration: 'none' }}> লগ-আউট </Link>
            </li>
            }
            
            {getUser() && 
            <li className="nav-item ml-auto pr-3 pt-3 pb-3"
            stlye={{ cursor: 'pointer'}}
            >
            <Link to="/feedback" className="text-warning" style={{ textDecoration: 'none' }}> প্রতিক্রিয়া </Link>
            </li>
            }
        </ul>
    </nav>
)

export default withRouter(Nav);