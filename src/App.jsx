import { Outlet } from "react-router-dom"
import Header from "./compunent/header/Header"
import { useState } from "react"
import Sidebar from "./compunent/header/Sidebar"


function App() {
  const [SemalHarder, setSemalHarder] = useState(false)
  const togelHeader = () => setSemalHarder(p => !p)
  const open = () => setSemalHarder(false)
  return (
    <div
      className="min-h-screen w-full pb-11 "
    >
      <Sidebar open={open} togelHeader={togelHeader} SemalHarder={SemalHarder} />
      <main
        className={`relative  ${SemalHarder ? "w-full md:w-11/12" : "w-full md:w-9/12"}`}
      >
        <Header togelHeader={togelHeader} />
        <Outlet />
      </main>
    </div>
  )
}

export default App
