
import React, { useEffect, useState } from 'react'
import ChatMessage from './ChatMessage'
import { CiChat1 } from "react-icons/ci";

function ChatBot() {
  const [chats, setChats] = useState([{ sent: false, message: "Hello there! 😊 I'm here to help you with any questions or needs you might have. What can I do for you today?" }])
  const [input, setInput] = useState("")
  const [send, setSend] = useState("")
  const [response, setResponse] = useState("")
  const [query, setQuery] = useState("")
  const [shows, setShows] = useState([])
  const [dates, setDates] = useState([])
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedShow, setSelectedShow] = useState("")
  const [openChat,setOpenChat] = useState(false)
  // console.log(input)


  const sendMessage = async (e) => {
    e.preventDefault()
    setChats(prev => setChats([...prev, { sent: true, message: input }]))
    let send = String(input);
    
    if(shows?.length===0&&dates?.length===0){
      send = String(query+" "+input)
    }
    console.log(send)
    const res = await fetch("http://localhost:5000/chat", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ input: send })
    })
    setInput("")
    const data = await res.json()
    console.log(data)
    // console.log(data.response)
    setDates(data.date_list)
    setQuery(data.query)
    setShows(data.shows)
    setChats(prev => setChats([...prev, { sent: false, message: data.response }]))

  }

  const showClicked = async (show) => {
    setChats(prev => [...prev, { sent: true, message: show }])
    // setInput(date)
    const res = await fetch("http://localhost:5000/chat", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ input: input + " " + show })
    })
    const data = res.json()
    setQuery(data.query)
    setShows("")
    setChats(prev => setChats([...prev, { sent: false, message: data.response }]))
  }

  const dateClicked = async (date) => {
    setChats(prev => [...prev, { sent: true, message: date }])
    // setInput(date)
    const res = await fetch("http://localhost:5000/chat", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ input: query + " " + date })
    })
    const data = await res.json()

    setDates("")
    console.log(data.query)
    setQuery(data.query)
    setShows(data.shows)
    setChats(prev => setChats([...prev, { sent: false, message: data.response }]))

  }

 


  return (
    <aside>
      {openChat&&<div className={`border absolute h-[65svh] w-[22vw] bottom-[6rem] right-10 bg-slate-200 rounded-lg rounded-br overflow-hidden py-3 px-5`}>
        <div className="chat h-[95%] overflow-auto  border-red-500 text-white ">

          {chats?.map((chat, i) => (
            <ChatMessage key={i} sent={chat.sent} message={chat.message} />
          ))}

          {shows && shows?.map((show, i) => (
            <div key={i} onClick={() => showClicked(show)} className={`chat px-4 rounded-lg rounded-bl-none w-fit max-w-[70%] break-words
            float-left clear-both bg-slate-500 my-2 cursor-pointer border border-white`}>{show}</div>
          ))}

          {dates && dates?.map((date, i) => (
            <div key={i} onClick={() => dateClicked(date)} className='chat px-4 rounded-lg rounded-bl-none w-fit max-w-[70%] break-words
            float-left clear-both bg-slate-500 my-2 cursor-pointer border border-white'>{date}</div>
          ))}
        </div>
        <form className="input border h-[5%] flex items-center border-black rounded-lg overflow-hidden " onSubmit={sendMessage}>
          <input className='h-full w-[80%] border-none outline-none px-2' type="text" value={input} onChange={(e) => setInput(e.target.value)} />
          <div className="button flex justify-center w-[20%] items-center text-center ">
            <button className='text-white w-full bg-purple-500 border-none outline-none'  >Send</button>
          </div>
        </form>
      </div>}
      <div onClick={()=>setOpenChat(prev=>!prev)} className="openchatbot absolute h-16 w-16 bg-purple-500 bottom-5 right-20   z-10 rounded-full grid place-items-center text-4xl text-white cursor-pointer select-none">
        <CiChat1 />
      </div>
    </aside>

  )
}

export default ChatBot
