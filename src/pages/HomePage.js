import React, { useState } from 'react';
import { v4 as uuidV5 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const navigate = useNavigate()
  const [roomId, setRoomId] = useState('');
  const [userName, setUserName] = useState('')
  const createNewRoom = (e) => {

    e.preventDefault();
    const id = uuidV5();
    setRoomId(id);
    toast.success("Created new room");
  }

  const join = () => {
    if (!userName && !roomId) {
      toast('ROOM ID & USERNAME REQUIRED');
      return;
    }


    // Redirect
    navigate(`/editor/${roomId}`, {
      state: {
        userName
      }
    })

  }

  const handleInputEnter = (e) =>{
    if(e.code === "Enter"){
      join()
    }
  }
  return (
    <div className="homeWrapper">
      <div className="formWrapper">
        <img className='formLogo' src="/code-conversation.png" alt="code conversation logo" />
        <h4 className="mainLable">Paste invitation ROOM ID</h4>
        <div className="inputGroup">
          <input type="text"
            className='inputBox'
            placeholder='ROOM ID'
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            onKeyUp={handleInputEnter}
          />
          <input type="text"
            className='inputBox'
            placeholder='USERNAME'
            onChange={(e) => setUserName(e.target.value)}
            onKeyUp={handleInputEnter}
          />
          <button className='btn joinBtn' onClick={join} >Join</button>

          <div className="createInfo">
            <span>If you don't have invite then create
              &nbsp; <a href="" className='createNewBtn' onClick={createNewRoom} >new room</a>
            </span>
          </div>
        </div>
      </div>

      <footer>
        Built with 💖 &nbsp; by &nbsp; <a href="https://github.com/Webdevnoor01" target='_blank' rel='noreferrer' >Abdun Noor Faruki Biswas</a>
      </footer>
    </div>
  )
}
