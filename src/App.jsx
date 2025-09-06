import { Outlet } from "react-router-dom"
import Header from "./compunent/header/Header"
import { useState } from "react"
import Sidebar from "./compunent/header/Sidebar"
import { AnimatePresence } from 'framer-motion';
import Model from "./CustomUi/Model";
import LanguagePanel from "./compunent/App/LanguagePanel";
import AccountPanel from "./compunent/App/AccountPanel";
import useUser from "./hooks/useUser";
import { Loader2 } from "lucide-react";


function App() {
  const { loading, website, name, email, phone } = useUser()
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

  if (loading) return (
    <div className="flex justify-center items-center min-h-[200px]">
      <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
    </div>
  );
  let user = { name: name, email: email, website: website, phone: phone }
  return (
    <div
      className="min-h-screen w-full  flex justify-end"
    >
      {showPanels.LanguagePanel && <Model
        onclose={hide}
      >
        <LanguagePanel hide={hide} />
      </Model>}
      {showPanels.AccountPanel && <Model
        onclose={hide}
      >
        <AccountPanel user={user} hide={hide} />
      </Model>}
      <main
        className={`relative  ${SemalHarder ? "w-full md:w-[91%] lg:w-[93%]" : "w-full md:w-9/12"} transition-all pb-10 duration-200`}
      >
        <Header
          openLanguagePanel={openLanguagePanel}
          openAccountPanel={openAccountPanel}
          togelHeader={togelHeader} />
        <AnimatePresence>
          <Outlet context={user} />
        </AnimatePresence>
      </main>
      <Sidebar name={name} website={website} open={openSidebar} togelHeader={togelHeader} SemalHarder={SemalHarder} />
    </div>
  )
}

export default App