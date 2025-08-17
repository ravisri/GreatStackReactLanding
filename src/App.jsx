import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Services from './components/Services'
import Navbar from './components/Navbar'

function App() {
  const [theme, setTheme] =useState('light')
  const [count, setCount] = useState(0)

  const outlineRef = useRef(null)
  const dotRef = useRef(null)

  // Ref custom curpor position tracking
const mouse = useRef({x:0, y:0})
const position = useRef({x:0, y:0})

useEffect(() => {
 const handleMouseMove = (e) => {
  mouse.current.x = e.clientX;
  mouse.current.y = e.clientY;
 }

 document.addEventListener('mousemove', handleMouseMove)

 const animate = () => {
  position.current.x += (mouse.current.x - position.current.x) * .1
  position.current.y += (mouse.current.y - position.current.y) * .1

  if(dotRef.current && outlineRef.current){
    dotRef.current.style.transform = `translate3d(${mouse.current.x - 6}px, ${mouse.current.y - 6}px, 0)`
    outlineRef.current.style.transform = `translate3d(${position.current.x - 20}px, ${position.current.y - 20}px, 0)`
  }

  requestAnimationFrame(animate)
 }

 animate()

 return () => {
  document.removeEventListener('mousemove', handleMouseMove)
 }
}, [])
  return (
    <div className='dark:bg-black relative'>
  <Navbar theme={theme} setTheme={setTheme} />

  <Services/>

  {/* Custom Cursor Ring */}

  <div ref={outlineRef} className='fixed top-0 left-0 h-10 w-10 rounded-full border border-blue-800 pointer-events-none z-[9999]' style={{transition:'transform 0.1s ease-out'}}></div>

  {/* Custom Cursor Dot */}
  <div  ref={dotRef} className='fixed top-0 left-0 w-3 h-3 rounded-full bg-blue-800 pointer-events-none z-[9999]'  style={{transition:'transform 0.1s ease-out'}}></div>
    <div/>
    </div>
  )
}

export default App
