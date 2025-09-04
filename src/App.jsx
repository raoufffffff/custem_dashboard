import { Outlet } from "react-router-dom"
import Header from "./compunent/header/Header"
import { useState } from "react"
import Sidebar from "./compunent/header/Sidebar"
import { AnimatePresence } from 'framer-motion';
import Model from "./CustomUi/Model";
import LanguagePanel from "./compunent/App/LanguagePanel";


function App() {
  const [SemalHarder, setSemalHarder] = useState(true)
  const togelHeader = () => setSemalHarder(p => !p)
  const openSidebar = () => setSemalHarder(false)
  const [showPanels, setShowPanels] = useState({
    LanguagePanel: false,
    AccountPanel: false
  })
  const openLanguagePanel = () => setShowPanels({ ...setShowPanels, LanguagePanel: true })
  const openAccountPanel = () => setShowPanels({ ...setShowPanels, AccountPanel: true })
  const hide = () => setShowPanels({
    AccountPanel: false,
    LanguagePanel: false
  })
  return (
    <div
      className="min-h-screen w-full  flex justify-end"
    >
      {showPanels.LanguagePanel && <Model
        onclose={hide}
      >
        <LanguagePanel hide={hide} />
      </Model>}
      <main
        className={`relative  ${SemalHarder ? "w-full md:w-[91%] lg:w-[93%]" : "w-full md:w-9/12"} transition-all pb-10 duration-200`}
      >
        <Header
          openLanguagePanel={openLanguagePanel}
          openAccountPanel={openAccountPanel}
          togelHeader={togelHeader} />
        <AnimatePresence>
          <Outlet />
        </AnimatePresence>
      </main>
      <Sidebar open={openSidebar} togelHeader={togelHeader} SemalHarder={SemalHarder} />
    </div>
  )
}

export default App