import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const NewPost = ({isOpen, close, addNewPost}) => {
    
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
     <Dialog open={isOpen} onClose={close}>
        <DialogTitle>Create Post</DialogTitle>
        <DialogContent>
            <TextField
                // error={err}
                autoFocus
                margin="dense"
                id="outlined-basic"
                label="Title"
                fullWidth
                variant="outlined"
                rows={1}
                onChange={(e) => setTitle(e.target.value)}
            />

            <TextField
                // error={err}
                autoFocus
                margin="dense"
                id="outlined-basic"
                label="Body"
                fullWidth
                variant="outlined"
                multiline= {true}
                rows={7}
                onChange={(e) => setBody(e.target.value)}
            />       
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Close</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>

 );
  
 };


export default NewPost;
