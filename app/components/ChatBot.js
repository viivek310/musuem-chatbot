import React, { useEffect, useState } from 'react'
import ChatMessage from './ChatMessage'

function ChatBot() {
  const [chats, setChats] = useState([])
  const [input, setInput] = useState("")
  const [send, setSend] = useState("")
  const [response, setResponse] = useState("")
  const [query, setQuery] = useState("")
  const [shows, setShows] = useState([])
  const [selectedShow, setSelectedShow] = useState("")
  // console.log(input)


  const sendMessage = async (e) => {
    e.preventDefault()
    setChats(prev => setChats([...prev, { sent: true, message: input }]))
    
    const res = await fetch("http://localhost:5000/chat", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ input: input+" "+send})
    })
    const data = await res.json()
    console.log(data)
    setInput("")
    // console.log(data.response)
    setQuery(data.query)
    setShows(data.shows)
    setChats(prev => setChats([...prev, { sent: false, message: data.response }]))
    if(shows){
      setQuery(prev=>prev+shows)
    }
    if(data.query){
      setSend(prev=>prev+query)
    }
    

  }

  const showClicked = (show)=>{
    setChats(prev=>[...prev,{sent:false,message:show}])
    setSelectedShow(show)
  }
  return (
    <aside className='border absolute h-[65svh] w-[22vw] bottom-13 right-10 bg-slate-200 rounded-lg rounded-br overflow-hidden py-3 px-5'>
      <div className="chat h-[95%] overflow-auto  border-red-500 text-white ">
        {/* <div className="chat self-end px-4 rounded-full float-right clear-both bg-slate-900">hiii  </div> */}
        {/* <ChatMessage sent={true} message={"hiii"}/>
            <ChatMessage sent={false} message={"hello"}/> */}
        {chats?.map((chat, i) => (
          <ChatMessage key={i} sent={chat.sent} message={chat.message} />
        ))}

        {shows&&shows?.map((show,i)=>(
          <div key={i} onClick={()=>showClicked(show)} className="rounded-md rounded-bl-none bg-slate-600 border border-white">{show}</div>
        ))}
      </div>
      <form className="input border h-[5%] flex items-center border-black rounded-lg overflow-hidden " onSubmit={sendMessage}>
        <input className='h-full w-[80%] border-none outline-none px-2' type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        <div className="button flex justify-center w-[20%] items-center text-center ">
          <button className='text-white w-full bg-purple-500 border-none outline-none'  >Send</button>
        </div>
      </form>
    </aside>
  )
}

export default ChatBot
