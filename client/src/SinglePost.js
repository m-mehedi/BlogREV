import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Nav from './Nav';
import renderHTML from 'react-render-html'

const SinglePost = (props) => {
    // return <div>{JSON.stringify(props)}</div>

    const [ post, setPost ] = useState('')

    useEffect( () => {
        axios.get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`)
        .then(response => setPost(response.data))
        .catch(error => alert('Error fetching single post'));
    },[]);

    const showSinglePost = () => (
        <div className="row">
            <div className="col-md-8 offset-md-2 pb-3">
            <h1>{post.title}</h1>
            <div>              
            <div className="lead pt-3">{renderHTML(post && post.content)}</div>
            <p>লেখক <span className="badge">{post.user}</span> তারিখ {' '} <span className="badge">{new Date(post.createdAt).toLocaleString()}</span></p>
            </div>
            </div>
        </div>
    )

    return(
        <div className="container pb-5">
            <Nav />

            {post && showSinglePost()}

        </div>
    )
}

export default SinglePost;