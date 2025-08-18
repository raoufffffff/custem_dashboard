import { Outlet } from "react-router-dom"
import Header from "./compunent/header/Header"
import { useState } from "react"
import Sidebar from "./compunent/header/Sidebar"


function App() {
  const [SemalHarder, setSemalHarder] = useState(true)
  const togelHeader = () => setSemalHarder(p => !p)
  const open = () => setSemalHarder(false)
  return (
    <div
      className="min-h-screen w-full pb-11 flex justify-end"
    >

      <main
        className={`relative  ${SemalHarder ? "w-full md:w-11/12" : "w-full md:w-9/12"} transition-all duration-200`}
      >
        <Header togelHeader={togelHeader} />
        <Outlet />
      </main>
      <Sidebar open={open} togelHeader={togelHeader} SemalHarder={SemalHarder} />
    </div>
  )
}

export default App
