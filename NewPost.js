import React, { useState } from 'react';

const NewPost = ({close, addNewPost}) => {
    
const [title, setTitle] = useState('');
const [body, setBody] = useState('');
 

const handleSubmit = (event) => {
  event.preventDefault();
  const post = {title, body};
    
  fetch( 'https://jsonplaceholder.typicode.com/posts', {
     method: 'POST',
        body: JSON.stringify(
           post
       ),
      headers: {
        'Content-type': 'application/json',
       },
       body: JSON.stringify(post)
      })
     .then((res) => res.json())
     .then(() => {
        addNewPost(post);
        setTitle('');
        setBody('');
        close();
    }).catch((error)=>{
        console.log('error', error.message)
    } )     
}

        
  return (

   <div style={styles.overlay}>
       <div style={styles.modal}>
        <button onClick={close}>Close</button>
        <form onSubmit={handleSubmit}>
            Title
        <input 
           type="text"  name="title" required
          value={title} 
      onChange={(e) => setTitle(e.target.value)} 
        />
        Body
        <input 
          type="text" name="body" required
          value={body} 
          onChange={(e) => setBody(e.target.value)} 
        />
        <button type="submit">Submit</button>
      </form>
      </div> 
  </div>

 );
  
 };



const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',   
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
  }
};

export default NewPost;
