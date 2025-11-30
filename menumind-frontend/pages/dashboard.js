
import { useEffect, useState } from 'react'
import axios from 'axios'
export default function Dashboard(){
  const [pred, setPred] = useState(null)
  const API = process.env.NEXT_PUBLIC_API_URL || 'https://menumind-backend.onrender.com'
  useEffect(()=>{
    const token = localStorage.getItem('mm_token')
    if(!token) return
    axios.get(API + '/api/prediction/me/', { headers: { Authorization: 'Token ' + token } }).then(r=> setPred(r.data)).catch(()=>{})
  },[])
  return (
    <div className='min-h-screen p-6 bg-gray-50'>
      <div className='max-w-4xl mx-auto bg-white p-6 rounded shadow'>
        <h1 className='text-xl font-semibold'>Today's Prep Plan</h1>
        {!pred && <div className='text-gray-500 mt-4'>No prediction yet. Upload sales or run prediction.</div>}
        {pred && <pre className='mt-4 bg-gray-100 p-3 rounded'>{JSON.stringify(pred.payload, null, 2)}</pre>}
      </div>
    </div>
  )
}
