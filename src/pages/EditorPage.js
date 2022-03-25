import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, Navigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';


// Internal imports
import Clint from '../component/Clint';
import Editor from '../component/Editor';
import ACTIONS from '../action';
import { initSocket } from '../socket';

export default function EditorPage() {
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();
  const reactNavigator = useNavigate();
  const { roomId } = useParams();
  const [clints, setClints] = useState([]);



  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleError(err));
      socketRef.current.on("connect_failed", (err) => handleError(err));

      function handleError(err) {
        console.log("socket error", err);
        toast.error("Socket connection failed, try again later");
        reactNavigator('/');

      }
      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        userName: location.state?.userName
      });

      // Listening for joined event
      socketRef.current.on(ACTIONS.JOINED, ({ clints, userName, socketId }) => {
        console.log(clints);
        if (userName !== location.state.userName) {
          toast.success(`${userName} joined the room`);
          console.log(`${userName} joined the room`);
        }
        setClints(clints);
        socketRef.current.emit(ACTIONS.SYNC_CODE,{
          socketId,
          code:codeRef.current
        })
      })


      // Listening for disconnected
      socketRef.current.on(
        ACTIONS.DISCONNECTED,
        ({ socketId, userName }) => {
          toast.success(`${userName} left the room.`);
          console.log(`${userName} left the room.`);
          setClints((prev) => {
            return prev.filter(
              (client) => client.socketId !== socketId
            );
          });
        }
      );
      
    }

    init();

    return () => {
      socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
    };
  }, [ location.state.userName, reactNavigator, roomId])

  async function copyRoomId(){
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room Id has been copied to your clipboard");
    } catch (error) {
      toast.error("Could not copied Room Id");
      console.log(error);
    }
  }

  function leaveRoom(){
    reactNavigator('/');
  }



if (!location.state.userName) {
  return (<Navigate to='/' />)
}

return (
  <div className="minWrap">
    <div className="aside">
      <div className="asideInner">
        <div className="logo">
          <img className='logoImg' src="/code-conversation.png" alt="code conversation" />
        </div>
        <h3>Connected</h3>
        <div className="clintsList">
          {
            clints.map((clint, i) => (<Clint key={i} userName={clint.userName} />))
          }
        </div>
      </div>

      <button className='btn copyBtn' onClick={copyRoomId} >Copy ROOM ID</button>
      <button className='btn leaveBtn' onClick={leaveRoom} >  Leave</button>
    </div>
    <div className="editorWrap">
      <Editor socketRef={socketRef} roomId={roomId} onCodeChange={(code)=>codeRef.current = code} />
    </div>
  </div>
)
}
