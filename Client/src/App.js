import './App.css';
import ChatMenu from './ChatMenu';
import { useState } from "react";
import io from "socket.io-client";

let server = "52.91.52.133:3001";
const socket = io.connect(server);

function App() {
  const [username, setUserName] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () =>{
    if(username !== ""  && room !== ""){
      socket.emit("join_room", room);
      setShowChat(true);
    }
  }

  return (

   <div className='container mt-5'>
     {!showChat ?(
       <div style={{marginLeft:'20%'}}>
         <h1 style={{color:'purple'}}> Please enter your information to join chat</h1>
         <input
            type="text"
            placeholder="Yusuf Nadir ..."
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room id..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
         
        </div>
    
        
     ) : (

      <ChatMenu socket= {socket}  username={ username} room = {room}></ChatMenu>
     )
       
     }
      
    </div>
  );
}

export default App;
