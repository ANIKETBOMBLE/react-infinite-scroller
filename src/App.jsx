import React from 'react'
import { useState, useEffect } from 'react';

import './App.css';
const acc_key = `7SGZfplel5FUByy2l1lupFMqEzg-r6zGyVnAUiL3i_g`;










export default function App() {
  const [photo , setphoto] = useState([]);
  const [ loading , setloading]= useState(false);
  const[page , setpage]= useState(1);
  
  
  async function getphotos(){
    const response = await fetch(`https://api.unsplash.com/photos/?client_id=${acc_key}&page=${page}`);
    const data = await response.json();
    // console.log(data);
    setphoto((previous)=>{
      return[...previous , ...data];
    })
    setloading(false);
    console.log(data);
    // console.log(photo);
  }
  
  
  useEffect(() => {
    getphotos();
  }, [page]);
  
  useEffect(() => {
    const handelscroll = () => {  
      if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 200){
        setloading(true);
        setpage((previous)=>{
          return previous + 1;
        })
      }
    }
    window.addEventListener('scroll' , handelscroll);
    return () => {
      window.removeEventListener('scroll' , handelscroll);
    }
  }
);
  

  return (
    <div className='container'>
      <h1>Infinite Scroll</h1>
      <div className='photos'>
        {photo.map((item) => {
          return(
            <img  
             key={item.id} 
            src={item.urls.regular}
             alt={item.alt_description}/>
          )
        })}
      </div>
      {loading && <h2>Loading...</h2>}
    </div>
  )

}
