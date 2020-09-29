import { Avatar } from '@material-ui/core'
import React, { useEffect } from 'react'
import './SidebarChat.css'
import db from './firebase'
import { Link } from 'react-router-dom';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {useState} from 'react'
function SidebarChat({addNewChat,id,name,seed}) {
    const [messages,setMessages]=useState([])
    const [Id,setId] = useState(id);
    const [isClicked,setIsClicked] = useState(false);
    useEffect(()=>{
      if(id){  
       db.collection('rooms').doc(id)
       .collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot=>setMessages(snapshot.docs.map(doc=>doc.data()))
        
       )
       console.log(id);
      }
    },[])   
    
  
    const createChat = ()=> {
        const roomName = prompt("Please enter name for chat");

     if(roomName){

        if(roomName.trim().length!==0) {
            // do some clever db stuff...
          if(roomName.length<=20){  
            db.collection('rooms').add({
             name:roomName,
             seed:Math.random()*5000   
            })      
          }
        }
        else if(roomName.trim().length===0){
            alert("Enter a room name!");
        }
        else{
            alert("Maximum room name length is 20 characters")
        }
     }
    };


    const deleteChat = ()=>{
        const adminPass = prompt("Please enter admin pass to be able to delete this chat");
        
        if(adminPass==='MegaMan'){
            db.collection('rooms').doc(id).delete();
           
        }
        else{
            alert("Sorry you are not authorized to delete this chat.")
        }
 

    }

    // useEffect(()=>{
    //   if(window.getComputedStyle(document.getElementById('app')).getPropertyValue('display') === 'grid'
         
         
    //   ){
    //     document.getElementById('sidebar').style.display='none';
    //      document.getElementById('chat').style.display='initial';
    //      document.getElementById('chat').style.flex='0 0 111%';
    //     console.log('working it is grid')
    //   }
      

    //   else if(window.getComputedStyle(document.getElementById('app')).getPropertyValue('display') ==='block'
      
    //   ){
    //     if(window.getComputedStyle(document.getElementById('app')).getPropertyValue('display') === 'grid'
         
         
    //     ){
    //       document.getElementById('sidebar').style.display='none';
    //      document.getElementById('chat').style.display='initial';
    //      document.getElementById('chat').style.flex='0 0 111%';
    //     }else{
    //       console.log('no it is not');
    //      document.getElementById('sidebar').style.display='none';
    //      document.getElementById('chat').style.display='initial';
    //      document.getElementById('chat').style.flex='0 0 111%';
    //    } 
    //   } 
    // },[isClicked])

    // const removeSidebar = ()=>{
    //       setIsClicked(true);
    // }

     
    return  !addNewChat ? (
      <Link to={`/rooms/${id}`}  style={{ color: 'inherit', textDecoration: 'inherit'}}  > 
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`} />
            <div className="sidebarChat__info">
               <h2>{name}</h2>
               <p>
                

                {(() => {
            if (messages.length!==0) {
              return (
                 <> 
                <span className="last-m-name">{messages[0].name+":"}
                
                </span>

                <span> {messages[0].message.substring(0,15)+"..."}

                </span>
                </>
              )
            } 
                })()}
                 
                 
                
                 
               </p>
            </div>
             <Link to='/' style={{ color: 'inherit', textDecoration: 'inherit'}} className="slideLeftLink" >

                   <DeleteForeverIcon onClick={deleteChat} />

             </Link>
        </div>
       </Link> 
        ): (
              <div className="sidebarChat" onClick={createChat}>
               <h2>Add new Chat</h2>

                  
              </div> 
       
        ); 
    
}

export default SidebarChat
