import React from 'react'
import Avatar from 'react-avatar'

export default function Clint({userName}) {
      return (
    <div className="clint">
        <Avatar name={userName} size={50} round='10px' />
        <div className="userName">{userName}</div>
    </div>
  )
}
