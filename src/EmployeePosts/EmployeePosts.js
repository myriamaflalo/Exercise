import React, {useEffect, useState} from 'react';
import NewPost from '../NewPost';
import Button from '@mui/material/Button';
import './Posts.css'
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


const EmployeePosts = ({ onClose, workerId }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [workerPosts, setWorkerPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const posts = data.filter(x => x.userId === workerId)
        setWorkerPosts(posts);
        // setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
        // setLoading(false);
      })
  },[])

  const close = () => {
    setIsDialogOpen(false);
  }

  const addNewPost = (newPost) => {
    setWorkerPosts([newPost, ...workerPosts]);
  }

  return (
    <div className='overlay'>
      <div className='modal'>
        <NewPost isOpen={isDialogOpen} close={close}  addNewPost={addNewPost}/>

        <div className="header"> 
          <Button className="right" variant="contained" onClick={onClose}><CloseIcon/></Button>
          <Button size="large" variant="contained" onClick={()=>{setIsDialogOpen(true)}}>New Post</Button>
        </div>
        
        <List className='list'>
         {workerPosts.map((item) => {
          return(
              <ListItem className='item' key={item.id}>

                <ListItemText>
                  <div>Title:</div>
                  <div>{item.title}</div>
                  <br></br>
                  <div> Body:</div>
                  <div>{item.body}</div>
                </ListItemText>
              </ListItem>
            )
          })
          }
        </List> 
      </div>
    </div> 
  );
};

export default EmployeePosts;