
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
export default function OTPLogin(){
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [sent, setSent] = useState(false)
  const [msg, setMsg] = useState('')
  const router = useRouter()
  const API = process.env.NEXT_PUBLIC_API_URL || 'https://menumind-backend.onrender.com'
  async function sendOtp(e){
    e.preventDefault()
    setMsg('')
    try{
      const r = await axios.post(API + '/api/auth/send-otp/', { phone })
      if(r.data && r.data.status === 'sent') setSent(true)
      setMsg('OTP sent to ' + phone)
    }catch(err){ setMsg('Failed to send OTP') }
  }
  async function verify(e){
    e.preventDefault()
    try{
      const r = await axios.post(API + '/api/auth/verify-otp/', { phone, code })
      if(r.data && r.data.token){
        localStorage.setItem('mm_token', r.data.token)
        router.push('/dashboard')
      } else setMsg('Invalid OTP')
    }catch(err){ setMsg('Verification failed') }
  }
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 p-6'>
      <div className='max-w-md w-full bg-white p-6 rounded shadow'>
        <h2 className='text-xl font-semibold mb-4'>Sign in with mobile (OTP)</h2>
        <form onSubmit={sent?verify:sendOtp} className='space-y-3'>
          <div>
            <label className='text-sm'>Mobile number (with country code, e.g. +91XXXXXXXXXX)</label>
            <input value={phone} onChange={e=>setPhone(e.target.value)} className='w-full border p-2 rounded' placeholder='+91...' required />
          </div>
          {sent && (
            <div>
              <label className='text-sm'>Enter OTP</label>
              <input value={code} onChange={e=>setCode(e.target.value)} className='w-full border p-2 rounded' placeholder='6-digit code' required />
            </div>
          )}
          <div>
            <button className='w-full bg-orange-500 text-white py-2 rounded'>{sent? 'Verify OTP':'Send OTP'}</button>
          </div>
          <div className='text-sm text-red-600'>{msg}</div>
        </form>
      </div>
    </div>
  )
}
