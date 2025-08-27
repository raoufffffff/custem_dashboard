import { Outlet } from "react-router-dom"
import Header from "./compunent/header/Header"
import { useState } from "react"
import Sidebar from "./compunent/header/Sidebar"
import { AnimatePresence } from 'framer-motion';


function App() {
  const [SemalHarder, setSemalHarder] = useState(true)
  const togelHeader = () => setSemalHarder(p => !p)
  const open = () => setSemalHarder(false)
  return (
    <div
      className="min-h-screen w-full  flex justify-end"
    >

      <main
        className={`relative  ${SemalHarder ? "w-full md:w-[91%] lg:w-[95%]" : "w-full md:w-9/12"} transition-all duration-200`}
      >
        <Header togelHeader={togelHeader} />
        <AnimatePresence>
          <Outlet />
        </AnimatePresence>
      </main>
      <Sidebar open={open} togelHeader={togelHeader} SemalHarder={SemalHarder} />
    </div>
  )
}

export default App