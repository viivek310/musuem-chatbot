import React from 'react'

function ChatMessage({sent,message}) {
  return (
    <div className={`chat px-4 rounded-lg ${sent?"rounded-br-none":"rounded-bl-none"} w-fit max-w-[70%] break-words ${sent?"float-right":"float-left"} clear-both ${sent?"bg-slate-700":"bg-slate-500"} my-2`}>{message}</div>
  )
}

export default ChatMessage
