"use server"
export const ftch = async()=>{
    const res = await fetch("/api/login",{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({a: 1, b: 2})
  })
  const data = await res.json()
  console.log(data,"hiii")
  return data
  }

