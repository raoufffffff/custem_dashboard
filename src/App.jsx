import { Outlet } from "react-router-dom"
import Header from "./compunent/header/Header"


function App() {

  return (
    <div
      className="min-h-screen w-full pt-[100px] md:px-10"
    >

      <Header />
      <Outlet />
    </div>
  )
}

export default App
