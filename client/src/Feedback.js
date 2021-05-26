import React, {useState} from 'react';
import Nav from './Nav';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.bubble.css'

const Feedback = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        message: '',
        phone: '',
        uploadedFiles: [],
        buttonText: 'প্রেরণ করুন',
        uploadPhotoButtonText: 'Upload Files'
    })

    // destructure state variables
    const {name, email, message, phone, uploadedFiles, buttonText, uploadPhotoButtonText } = values;
    
    // event handler
    const handleChange = () => {
        console.log('handle Change')
    }
    const handleSubmit = () => {
        console.log('handle Submit')
    }
    
    const feedbackForm = () => {
        <React.Fragment>
            <form onSubmit={handleSubmit}>
            <div className="form-group py-1">
                <label className="text-muted">শিরোনাম</label>
                <input  type="text" className="form-control" placeholder="পোস্টের শিরোনাম" required />
            </div>

            
            <div className="form-group py-1">
                <label className="text-muted">প্রতিক্রিয়া</label>
                <ReactQuill 
                onChange={handleChange('message')}
                value={message}
                theme="bubble"
                className="pb-5 mb-3" 
                placeholder="এখানে কিছু লিখুন..." 
                style={{ border: '1px solid #666'}} />
            </div>

            
            <div className="form-group py-1">
                <label className="text-muted">নাম</label>
                <input onChange={handleChange('name')} value={name} type="text" className="form-control" placeholder="আপনার নাম" required />
            </div>
            
            <div className="form-group py-1">
                <label className="text-muted">ইমেইল</label>
                <input onChange={handleChange('email')} value={email} type="email" className="form-control" placeholder="আপনার ইমেইল" required />
            </div>
            
            <div className="form-group py-1">
                <label className="text-muted">ফোন</label>
                <input onChange={handleChange('phone')} value={phone} type="number" className="form-control" placeholder="আপনার ফোন নাম্বার" required />
            </div>

            <div className="py-2">
                <button className="btn btn-success">{buttonText}</button>
            </div>
        </form>
        </React.Fragment>
    }
        


    return(
        <div className="container pb-5">
          <Nav />
        <h1 className="text-center">আপনার প্রতিক্রিয়া জানান</h1>
        <br />
        <div>{feedbackForm()}</div>   
  
  
        </div>
    )
}

export default Feedback;
