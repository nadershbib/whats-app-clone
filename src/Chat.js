import { Avatar,IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@material-ui/icons'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MicIcon from '@material-ui/icons/Mic';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './Chat.css'
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase'
import { scrollIntoView } from 'scroll-js';
import PlayCircleFilledOutlinedIcon from '@material-ui/icons/PlayCircleFilledOutlined';
function Chat() {
    const [input,setInput] = useState("")
    const [seed,setSeed] = useState("")
    const { roomId } = useParams();
    const [roomName,setRoomName] = useState("");
    const [messages,setMessages] = useState([])
    const [{user},dispatch] = useStateValue();
    const [isTyping,setIsTyping] = useState(false);

    useEffect(()=>{
        if(roomId){
              db.collection('rooms').doc(roomId).onSnapshot(snapshot=>{
              setRoomName(snapshot.data().name)
              setSeed(snapshot.data().seed)
            }

            )
           db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp','asc').onSnapshot(snapshot=>(
                setMessages(snapshot.docs.map((doc)=>doc.data()))
           ))
        }
       

        
    },[roomId])


    useEffect(()=>{
        var myElement = document.getElementById('scrollToDiv');
        myElement.scrollIntoView({behavior:'smooth',top:10000});
          
    },[messages])

    const sendMessage = (e)=>{
        e.preventDefault();
        db.collection('rooms').doc(roomId).
        collection('messages').add({
           name:user.displayName,
           message:input,
           timestamp:firebase.firestore.FieldValue.serverTimestamp(), 
        });
        setInput('')
        // setIsTyping(false);
        
    } 

    const removeChat = ()=>{
        document.getElementById('chat').style.display='none';
        document.getElementById('sidebar').style.display='initial';
    } 
   

    const handleInputChange = (e)=>{
         setInput(e.target.value);
         
    }

    useEffect(()=>{
        if(input.length>0){
            setIsTyping(true);
        }
        else{
            setIsTyping(false);
        }
    },[input])

    return (
        <div class="chat" id="chat">
           <div className="chat__header__wrapper">
             <div className="chat__header">
               <IconButton className="material-arrow" onClick={removeChat}>

                <ArrowBackIcon />

               </IconButton>
                <Avatar src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`} />  
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen {" "}
                       {
                         messages.length>0 && new Date(
                             messages[messages.length-1]?.timestamp?.toDate()).toUTCString()
                             
                             
                       }

                                   
                       
                    </p>
                
                </div>
                <div className="chat__headerRight">
                   <IconButton>
                       <SearchOutlined />
                   </IconButton>
                   <IconButton>
                       <AttachFile />
                   </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>

             </div>
            </div>
             <div className="chat__body" id="message-body">
                 {
                   messages.map(message=>(

                 <p className={`chat__message ${message.name === user.displayName &&'chat__reciever'}`} id="message">
                <span className="chat__name">
                    {message.name}
                </span>
                   {message.message}
                   <br />
                   <span className="chat__timestamp">
                       {new Date(message.timestamp?.toDate()).toUTCString()}
                   </span>
                 </p>
                   ))  
                 }
                 <div id="scrollToDiv"></div>

             </div>
             <div className="chat__footer">
                 <InsertEmoticon />
                 <form>
                   <input type="text" placeholder="Type a message" value={input}
                   onChange={handleInputChange}
                                    
                   />
                   <button onClick={sendMessage} type="submit">Send a message</button>
                 </form>
                 <MicIcon className={isTyping? 'change-mic':'show-mic'} />

                 <PlayCircleFilledOutlinedIcon className={isTyping? 'showSend':'dontShowSend'} onClick={sendMessage}/>

             </div>
        </div>
    )
}

export default Chat
