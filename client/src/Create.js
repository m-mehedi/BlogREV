import React, {useState} from 'react';
import axios from 'axios';
import Nav from './Nav';
import ReactQuill from 'react-quill'
import {getUser, getToken} from './helpers'
import 'react-quill/dist/quill.bubble.css'

function Create() {

    const  [state, setState] = useState({
        title: '',
        user: getUser()
    })

    const [content, setContent] = useState('')
    
    // rich text editor handle change
    const handleContent = (event) => {
        // console.log(event);
        setContent(event);
    }

    // Destricture values from state
    const { title, user } = state
    
    // onChange event handler
    const handleChange= (name) => (event) =>{
        // console.log('name', name, 'event', event.target.value);
        setState({...state, [name]: event.target.value})
    }
    // OldSchool Fn
    // function handleChange(name){
    //     return function(event){
    //         setState({...state, [name]: event.target.value });
    //     };
    // }

    const handleSubmit = event => {
        event.preventDefault()
        // console.table({ title, content, user});
        axios.post(`${process.env.REACT_APP_API}/post`, // URL
        {title, content, user}, // Data
        {
            headers:{
                authorization: `Bearer ${getToken()}`
            }
        })
        .then(response => {
            // console.log(response)
            // empty state
            setState({...state, title:'', user:''});
            setContent('');

            //Show alert
            alert(`Post titled ${response.data.title} is created`)
        })
        .catch(error =>{
            console.log(error.response)
            alert(error.response.data.error)
        })
    }

    return (
      <div className="container pb-5">
          <Nav />
        <h1 className="text-center">নিবন্ধ লিখুন</h1>
        <p className="text-success">
            {/* {JSON.stringify(state)} */}
        </p>

        <br />
        <form onSubmit={handleSubmit}>
            <div className="form-group py-1">
                <label className="text-muted">শিরোনাম</label>
                <input onChange={handleChange('title')} value={title} type="text" className="form-control" placeholder="পোস্টের শিরোনাম" required />
            </div>

            
            <div className="form-group py-1">
                <label className="text-muted">পোস্ট</label>
                <ReactQuill 
                onChange={handleContent} 
                value={content} 
                theme="bubble"
                className="pb-5 mb-3" 
                placeholder="এখানে কিছু লিখুন..." 
                style={{ border: '1px solid #666'}} />
            </div>

            
            <div className="form-group py-1">
                <label className="text-muted">ব্যবহারকারী</label>
                <input onChange={handleChange('user')} value={user} type="text" className="form-control" placeholder="আপনার নাম" required />
            </div>

            <div className="py-2">
                <button className="btn btn-success">তৈরি করুন</button>
            </div>
        </form>
  
  
      </div>
    );
  }
  
  export default Create;
  