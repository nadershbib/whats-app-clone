import { Avatar, IconButton } from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import { SearchOutlined } from '@material-ui/icons'

import SidebarChat from './SidebarChat'
import db from './firebase'
import { useStateValue } from './StateProvider'

function Sidebar({userPhoto}) {
   const [rooms,setRooms] = useState([]);
   const [{user},dispatch] = useStateValue();
   const [input,setInput] = useState("")
   useEffect(()=>{
     db.collection('rooms').onSnapshot(snapshot=>{
        setRooms(snapshot.docs.map(doc=>(
          {
            id:doc.id,
            data:doc.data(),

          }
        )))
     })
   },[])

   const handleChange = (e)=>{
      setInput(e.target.value);

      
      }
      

   


    return (
        <div className="sidebar sidebar-start remove-sidebar" id="sidebar">
            <div className="sidebar__header sidebar__header__change">
              <Avatar src={user?.photoURL} />
              <div className="sidebar__headerRight">
                 <IconButton>

                  <DonutLargeIcon />

                 </IconButton>


                 <IconButton>
                  <ChatIcon />

                 </IconButton>

                <IconButton>
                  <MoreVertIcon />

                </IconButton>
              </div>
            </div>

             




            <div className="sidebar__search">
             <div className="sidebar__searchContainer">
               <SearchOutlined />
               <input placeholder="Search or start new chat"  type="text" onChange={handleChange} />


            </div>
             
            </div>
            <div className="sidebar__chats">
              <SidebarChat addNewChat />
               {
                 rooms.map((room,index)=>{
                   return <SidebarChat room={room} key={room.id} id={room.id} name={room.data.name} seed={room.data.seed} />
                    
                  } )
               }
            </div>
        </div>
    )
}

export default Sidebar
