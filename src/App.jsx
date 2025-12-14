import Clarity from '@microsoft/clarity';
import { Outlet } from "react-router-dom"
import Header from "./compunent/header/Header"
import { useEffect, useState } from "react"
import Sidebar from "./compunent/header/Sidebar"
import { AnimatePresence } from 'framer-motion';
import Model from "./CustomUi/Model";
import LanguagePanel from "./compunent/App/LanguagePanel";
import AccountPanel from "./compunent/App/AccountPanel";
import useUser from "./hooks/useUser";
import { useTranslation } from "react-i18next";
import LoadingBar from "./CustomUi/LoadingBar";

function App() {
  const { i18n } = useTranslation("constanst");
  const currentLang = i18n.language; // detect active language
  const projectId = import.meta.env.VITE_CLARITY_ID

  const { loading, website, name, email, phone, password, link, repoName, Categories, _id, visit, isPaid, orders } = useUser()

  // SemalHarder = true (Mini Sidebar), false (Full Sidebar)
  const [SemalHarder, setSemalHarder] = useState(true)

  const toggleHeader = () => setSemalHarder(p => !p)
  const openSidebar = () => setSemalHarder(false)

  const [showPanels, setShowPanels] = useState({
    LanguagePanel: false,
    AccountPanel: false
  })

  const openLanguagePanel = () => setShowPanels({ ...showPanels, LanguagePanel: true })
  const openAccountPanel = () => setShowPanels({ ...showPanels, AccountPanel: true })
  const hide = () => setShowPanels({
    AccountPanel: false,
    LanguagePanel: false
  })
  useEffect(() => {
    // 1. Check if ID exists to avoid errors
    if (projectId) {
      Clarity.init(projectId);

      // 2. 🔥 PRO TIP: Identify the user if they are logged in
      // This lets you see specific recordings for specific users in the Clarity Dashboard
      if (!loading && _id) {
        console.log('Clarity is doing there job');

        Clarity.identify(_id, { // User ID
          name: name,         // Custom Tag
          email: email,       // Custom Tag
          plan: isPaid ? "Paid" : "Free" // Custom Tag (Very useful for SaaS!)
        });
      }
    }
  }, [projectId, loading, _id, name, email, isPaid]); // Add dependencies so it updates when user loads
  if (loading) return <LoadingBar />

  let user = { name: name, email: email, website: website, phone: phone, password: password, repoName: repoName, Categories: Categories, id: _id, link: link, visit, isPaid, userOrderLemet: orders }

  return (
    <div
      dir={currentLang === "ar" ? "rtl" : "ltr"}
      className="min-h-screen w-full flex bg-gray-50" // Added bg-gray-50 for better contrast
    >
      {showPanels.LanguagePanel && <Model onclose={hide}><LanguagePanel hide={hide} /></Model>}
      {showPanels.AccountPanel && <Model onclose={hide}><AccountPanel user={user} hide={hide} /></Model>}

      {/* 🔥🔥🔥 THE FIX IS HERE 🔥🔥🔥
         بدلاً من تغيير العرض بالنسبة المئوية، نحن نغير الهامش (Margin)
         ليتطابق تماماً مع عرض السايدبار (80px أو 280px).
      */}
      <main
        className={`
            relative 
            w-full 
            min-h-screen 
            pb-10 
            transition-all duration-300 ease-in-out
            ${SemalHarder
            ? (currentLang === "ar" ? "md:mr-[80px]" : "md:ml-[80px]")   // Mini State (80px)
            : (currentLang === "ar" ? "md:mr-[280px]" : "md:ml-[280px]")  // Full State (280px)
          }
        `}
      >
        <Header
          openLanguagePanel={openLanguagePanel}
          openAccountPanel={openAccountPanel}
          toggleHeader={toggleHeader}
          isPaid={isPaid}
          orders={orders}
        />

        <div className="p-2 md:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <Outlet context={user} />
          </AnimatePresence>
        </div>
      </main>

      <Sidebar
        link={link}
        name={name}
        website={website}
        open={openSidebar}
        toggleHeader={toggleHeader}
        SemalHarder={SemalHarder}
        isPaid={isPaid}
        orders={orders}
      />
    </div>
  )
}

export default App