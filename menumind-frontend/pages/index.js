
import Link from 'next/link'
export default function Home(){
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='max-w-3xl w-full p-8 bg-white shadow rounded'>
        <h1 className='text-2xl font-bold mb-2'>MenuMind AI</h1>
        <p className='text-gray-600 mb-4'>AI that tells you what to cook today. Demo-ready with OTP login.</p>
        <div className='flex gap-3'>
          <Link href='/auth/otp'><a className='px-4 py-2 bg-orange-500 text-white rounded'>Sign in with Mobile (OTP)</a></Link>
          <Link href='/demo'><a className='px-4 py-2 border rounded'>Try Demo</a></Link>
        </div>
      </div>
    </div>
  )
}
