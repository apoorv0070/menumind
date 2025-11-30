
import { useState } from 'react'
export default function Demo(){
  const [csv, setCsv] = useState('date,dish,qty\n2025-11-13,Paneer Masala,12\n2025-11-14,Paneer Masala,9')
  const [out, setOut] = useState(null)
  async function runDemo(){
    // local simple parser replicate backend predict logic for demo
    const lines = csv.trim().split('\n').slice(1)
    const agg = {}
    lines.forEach(l=>{ const [date,dish,qty]=l.split(','); agg[dish]=agg[dish]||[]; agg[dish].push(parseInt(qty)) })
    const payload = {}
    Object.keys(agg).forEach(d=>{ const arr=agg[d]; const last7 = arr.slice(-7); const avg7 = Math.round(last7.reduce((a,b)=>a+b,0)/Math.max(1,last7.length)); payload[d]={pred_qty: Math.max(1,avg7)} })
    setOut(payload)
  }
  return (
    <div className='min-h-screen p-6 bg-gray-50 flex items-start justify-center'>
      <div className='max-w-3xl w-full bg-white p-6 rounded shadow'>
        <h2 className='text-lg font-semibold mb-3'>Quick Demo</h2>
        <textarea value={csv} onChange={e=>setCsv(e.target.value)} className='w-full h-40 border rounded p-2' />
        <div className='mt-3 flex gap-3'>
          <button onClick={runDemo} className='px-4 py-2 bg-orange-500 text-white rounded'>Run Demo</button>
        </div>
        {out && <pre className='mt-4 bg-gray-100 p-3 rounded'>{JSON.stringify(out,null,2)}</pre>}
      </div>
    </div>
  )
}
