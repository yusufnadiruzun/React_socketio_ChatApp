import { useEffect, useState } from "react";
import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";

export default function ChatMenu({ socket, username, room }) {

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const message = {
        room: room,
        username: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
     
      await socket.emit("chat", message);
    
      setCurrentMessage("");
     
    }
  };

  return (
    <div>
      <div>
        <h1 className="mt-5 " style={{ textAlign: "center", color: "purple" }}>
          Chat App
        </h1>
      </div>

      <hr></hr>

      <div
        className="border border-info  container"
        style={{ width: "20rem", height: "30rem" }}
      >
        <div id="box" style={{ height: "92%" }}>
          <ScrollToBottom className="message-container">
            {messageList.map((message) => {
              return (
                <div 
                  className="message"
                  id={username === message.username ? "you" : "other"}>
                  <div>
                    <div className="message">
                      <p>{message.message}</p>
                    </div>
                    <div className="message-meta" style={{display:'flex'}}>
                      <h1 id="time"style={{fontSize:'70%', color:'green'}} >{message.time}</h1>
                      <h1 id="author" style={{fontSize:'70%', color:'purple'}}>{message.username}</h1>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>

        <div className="sticky-sm-bottom" style={{}}>
          <input
            id="messageArea"
            className="message"
            placeholder="message"
            style={{ width: "80%" }}
            onChange={ (event) =>setCurrentMessage(event.target.value)}
          ></input>
          <button
            type="button "
            className="btn  btn-primary  "
            style={{ width: "20%" }}
            onClick={sendMessage}
          >Send</button>
        </div>
      </div>
    </div>
  );
}
