import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Nav from './Nav'
import ReactQuill from 'react-quill'
import {getToken} from './helpers'
import 'react-quill/dist/quill.bubble.css'

const UpdatePost = (props) => {

    const [ state, setState ] = useState({
        title: '',
        slug: '',
        user: ''
    })

    const  { title, slug, user } = state;

    const [ content, setContent ] = useState('')

    // rich text editor handle change
    const handleContent = event => {
        // console.log(event);
        setContent(event);
    }


    useEffect( () => {
        axios.get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`)
        .then(response => {
            const { title, content, slug, user } = response.data;
            setState({...state, title, slug, user });
            setContent(content);
        })
        .catch(error => alert('Error updating post'));
    },[]);


    const handleChange= (name) => (event) =>{
        // console.log('name', name, 'event', event.target.value);
        setState({...state, [name]: event.target.value})
    }
    const handleSubmit = event => {
        event.preventDefault()
        // console.table({ title, content, user});
        axios.put(`${process.env.REACT_APP_API}/post/${slug}`, {title, content, user}, // Data
        {
            headers:{
                authorization: `Bearer ${getToken()}`
            }
        })
        .then(response => {
            const { title, content, slug, user } = response.data;
            // empty state
            setState({...state, title, content, slug, user})

            //Show alert
            alert(`Post titled ${title} is updated`)
        })
        .catch(error =>{
            console.log(error.response)
            alert(error.response.data.error)
        })
    }

    // Form
    const ShowUpdateForm = () => (
        <form onSubmit={handleSubmit}> 
            <div class="alert alert-warning" role="alert">
                আপনি {title} - পোস্ট সম্পাদনা করছেন
            </div>

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
                <button className="btn btn-success">সম্পাদনা করুন</button>
            </div>
            
        </form>
    )

    return(
        <div className="container pb-5">
            <Nav />

            <h1>সম্পাদনা</h1>
            {ShowUpdateForm()}

        </div>
    )
}

export default UpdatePost;