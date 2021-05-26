import './App.css';

import React, {useState, useEffect} from 'react';
import Nav from './Nav';
import axios from 'axios';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html'
import { getUser, getToken } from './helpers'


function App() {

  // Fetch posts
  const [ posts, setPosts] = useState([])

  const fetchPosts = () => {
    axios.get(`${process.env.REACT_APP_API}/posts`)
    .then( response =>{
      // console.log(response)
      setPosts(response.data)
    })
    .catch(error => alert('Error fetching posts.'));
  }

  useEffect(() => {
    fetchPosts()
  },[]);

  const deleteConfirm = (slug) => {
    let answer = window.confirm('আপনি কি সত্যিই এই পোস্ট মুছে ফেলতে চাচ্ছেন?')
    if(answer) {
      deletePost(slug)
    }
  }

  const deletePost = (slug) => {
    // console.log('delete', slug, ' post');

    axios.delete(`${process.env.REACT_APP_API}/post/${slug}`, // URL
    {
        headers:{
            authorization: `Bearer ${getToken()}`
        }
    })
    .then( response => {
      alert(response.data.message)
      fetchPosts()
    })
    .catch(error => alert('Error deleting post'))
  }

  return (
    <div className="container pb-5">
      <Nav />
      <br />
      <h1>BlogREV</h1>

      {/* {JSON.stringify(posts)} */}
      
      {
        posts.map( (post, i) => (
          <div className="row" key={post._id} style={{ borderBottom: '1px solid silver'}}>
            <div className="col pt-3 pb-2">

              <div className="row">
                <div className="col-md-10">
                <Link  to={`/post/${post.slug}`} style={{ textDecoration: 'none' }}><h2>{post.title}</h2></Link>
              
              <div className="lead pt-3">{renderHTML(post.content.substring(0, 150))}</div>
              <p>লেখক <span className="badge">{post.user}</span> তারিখ {' '} <span className="badge">{new Date(post.createdAt).toLocaleString()}</span></p>
            
                </div>                

              {getUser() && (
                              <div className="col-md-2">
                              <button className="btn btn-sm btn-success">
                              <Link  to={`/post/update/${post.slug}`} style={{textDecoration: 'none', color:'white', fontWeight:600}}>হালনাগাদ</Link>
                              </button>
                              <button onClick={()=> deleteConfirm(post.slug)} className="btn btn-sm btn-danger ml-1">
                              <Link  to={''} style={{textDecoration: 'none', color:'white',fontWeight:600}}>রিমুভ করুন</Link>
                              </button>
              
                            </div>
              )}

              </div>


            </div>
          </div>

        ))
      }
    </div>
  );
}

export default App;
