import React, { useState, useEffect} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import Nav from './Nav';
import { authenticate, getUser } from './helpers'

const Login = (props) => {
    const [state,setState] = useState({
        name: '',
        password:''
    })
    const {name, password} = state  // destructure values from state

    useEffect( ()=> {
        getUser() && props.history.push('/');
    }, [])


    // onChange event handler
    const handleChange= (name) => (event) =>{
        // console.log('name', name, 'event', event.target.value);
        setState({...state, [name]: event.target.value})
    }

    const handleSubmit = event => {
        event.preventDefault()
        // console.table({ name, password });
        axios.post(`${process.env.REACT_APP_API}/login`, { name, password})
        .then(response => {
            console.log(response)
            // response will contain token and name
            authenticate(response, () => props.history.push('/create'))

            // redirect to create page
        })
        .catch(error =>{
            console.log(error.response)
            alert(error.response.data.error)
        })
    }

    return (
        <div className="container pb-5">
            <Nav />
          <h1 className="text-center">লগ ইন</h1>
          <p className="text-success">
              {/* {JSON.stringify(state)} */}
          </p>
  
          <br />
          <form onSubmit={handleSubmit}>
              <div className="form-group py-1">
                  <label className="text-muted">নাম</label>
                  <input onChange={handleChange('name')} value={name} type="text" className="form-control" placeholder="নাম" required />
              </div>  
              
              <div className="form-group py-1">
                  <label className="text-muted">পাসওয়ার্ড</label>
                  <input onChange={handleChange('password')} value={password} type="text" className="form-control" placeholder="আপনার পাসওয়ার্ড" required />
              </div>
  
              <div className="py-2">
                  <button className="btn btn-success">লগ-ইন করুন</button>
              </div>
          </form>
    
    
        </div>
      );
}

export default withRouter(Login);