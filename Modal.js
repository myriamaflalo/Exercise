import React, {useEffect, useState} from 'react';
import NewPost from './NewPost';

const Modal = ({ onClose, workerId }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [workerPosts, setWorkerPosts] = useState([]);
  const [error, setError] = useState(null);


useEffect(()=>{
  fetch('https://jsonplaceholder.typicode.com/posts') // Replace with your API URL
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
    <div>
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {console.log('isDialogOpen',isDialogOpen)}
      {isDialogOpen && <NewPost close={close}  addNewPost={addNewPost}/>}
        <button onClick={onClose}>Close</button>
        <button onClick={()=>{setIsDialogOpen(true)}}>New post</button>
         {workerPosts.map((item) => {
          return(
            <div key={item.id}>
            <div>Title: {item.title}</div>
            <div>Body: {item.body}</div>
            </div>
          )
        })
      }
      </div>
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

export default Modal;