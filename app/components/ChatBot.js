
import React, { useEffect, useRef, useState } from 'react'
import ChatMessage from './ChatMessage'
import { CiChat1 } from "react-icons/ci";
import { getSession, useSession } from 'next-auth/react';

function ChatBot() {
  // const [chats, setChats] = useState([{ sent: false, message: "Hello there! 😊 I'm here to help you with any questions or needs you might have. What can I do for you today?" }])
  const [chats, setChats] = useState([{ sent: false, message: "હેલો, તમે કેમ છો" }])

  const [input, setInput] = useState("")
  const [send, setSend] = useState("")
  const [response, setResponse] = useState("")
  const [query, setQuery] = useState("")
  const [shows, setShows] = useState([])
  const [dates, setDates] = useState([])
  const [openChat,setOpenChat] = useState(false)
  const chatContainerRef = useRef(null)
  const [session,setSession] = useState(null)
  const sess = useSession()

  const fetchSession = async () => {
    const s1 = await getSession();
    console.log(s1, "navbar");
    setSession(s1)
  };
  useEffect(() => {
    fetchSession();
  }, [sess]);


  const scrollToBottom = () => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  const sendMessage = async (e) => {
    e.preventDefault()
    setChats(prev => setChats([...prev, { sent: true, message: input }]))
    let send = String(query+" "+input)

    setInput("")
    console.log(send)
    const res = await fetch("http://localhost:5000/chat", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ input: send ,email: session?.user?.email})
    })
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
    console.log("show",show)
    const res = await fetch("http://localhost:5000/chat", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ input: query + " " + show ,email: session?.user?.email})
    })
    const data = await res.json()
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
      body: JSON.stringify({ input: query + " " + date ,email: session?.user?.email })
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
      {openChat&&<div className={`shadow-lg fixed z-50 h-[35rem] w-[25rem] max-w-[100vw] bottom-[15%] md:right-10 bg-slate-50 rounded-lg rounded-br overflow-hidden py-3 px-5 pt-14`}>
        <div className="chatheader bg-violet-800 absolute w-full left-0 top-0 py-3 text-white text-center">
          Welcome to Museum Chatbot
        </div>
        <div className="chat h-[92%] overflow-auto  text-white " ref={chatContainerRef}>

          {chats?.map((chat, i) => (
            <ChatMessage key={i} sent={chat.sent} message={chat.message} />
          ))}

          {shows && shows?.map((show, i) => (
            <div key={i} onClick={() => showClicked(show)} className={`chat px-4 rounded-lg rounded-bl-none w-fit max-w-[70%] break-words
            float-left clear-both bg-purple-500 my-1 cursor-pointer border border-white hover:bg-purple-700 py-1`}>{show}</div>
          ))}

          {dates && dates?.map((date, i) => (
            <div key={i} onClick={() => dateClicked(date)} className='chat px-4 rounded-lg rounded-bl-none w-fit max-w-[70%] break-words
            float-left clear-both bg-purple-500 my-1 cursor-pointer border border-white hover:bg-purple-700 py-1'>{date}</div>
          ))}
        </div>
        <form className="input border h-[8%] flex items-center border-black rounded-full overflow-hidden " onSubmit={sendMessage}>
          <input className='h-full w-[80%] border-none outline-none px-2' type="text" value={input} onChange={(e) => setInput(e.target.value)} />
          <div className="button flex justify-center h-full w-[20%] items-center text-center ">
            <button className='text-white h-full w-full bg-violet-800 border-none outline-none'  >Send</button>
          </div>
        </form>
      </div>}
      <div onClick={()=>setOpenChat(prev=>!prev)} className="openchatbot fixed p-3 md:p-0 md:h-16 md:w-16 bg-purple-500 bottom-5 right-[10%]  rounded-full grid place-items-center text-3xl md:text-4xl text-white cursor-pointer select-none z-50">
        <CiChat1 />
      </div>
    </aside>

  )
}

export default ChatBot
