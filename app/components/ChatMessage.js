import React from 'react'

function ChatMessage({sent,message}) {
  return (
    <div className={`chat px-4 py-1 rounded-lg ${sent?"rounded-br-none":"rounded-bl-none"} w-fit max-w-[70%] break-words ${sent?"float-right":"float-left"} clear-both ${sent?"bg-zinc-400":"bg-slate-200"} my-1 ${!sent&&"text-black"}`}>{message}</div>
  )
}

export default ChatMessage
