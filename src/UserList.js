import React, {useEffect,useState} from 'react'
import axios from 'axios'

function UserList() {
    const [post, setPost] = useState({})
    const [id, setId] = useState(1)
    const [idOnClick, setIdOnClick] = useState(1)
    
    //Map state
    const [posts, setPosts] = useState([])

    //Map effect

    useEffect(()=> {
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res=>{
            console.log(res)
            setPosts(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])


    const handleClick = () => {
        setIdOnClick(id)
    }


    useEffect(()=>{
        axios.get(`https://jsonplaceholder.typicode.com/users/${idOnClick}`)
        .then(response=> {
            console.log(response)
            setPost(response.data)
        })
        .catch(error=> {
            console.log(error)
        })
    }, [idOnClick])
  return (
    <div>
        
        <input type="text" value={id} onChange={e => setId(e.target.value)} />
        <button type='button' onClick={handleClick} > change user </button>
        {post.name}
        <ol>
            {posts.map(post=><li key={post.id}>{post.name}{post.email}</li>)}
        </ol>
    </div>
  )
}

export default UserList