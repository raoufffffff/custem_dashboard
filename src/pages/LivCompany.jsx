import { Loader2, Plus } from "lucide-react"; // Added Plus icon for the button
import useUser from "../hooks/useUser";
import DelevryComapnesContainer from "../compunent/LivCompanyCompunents/DelevryComapnesContainer";
// import AlgeriaMap from '../compunent/LivCompanyCompunents/AlgeriaMap '
import PageContainer from "../CustomUi/PageContainer";
import { useState } from "react";

const companies = [
    { name: "ZR Express", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpdTp4dC0C9skkf3Ptw9L9CK3pxiFzvrLhvQ&s" },
    { name: "ecom_delivery", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2HqE3EoSJb6xl1sRm29x6BRI6iwWp2Pf8ag&s" },
    { name: "swift_express", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ227JyGZlzJ_YUhHCQxEAPOP5yUAEuDrlFQw&s" },
];

const LivCompany = () => {
    const { repoName, loading, companyLiv, updateUser } = useUser();
    const [changeMode, setChangeMode] = useState(false);
    // 1. Find the company object that matches the user's company name
    const currentCompany = companies.find(c => c.name === companyLiv?.name);
    const start = () => setChangeMode(false)
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
            </div>
        );
    }

    return (
        <PageContainer
            about={"Manage your delivery company settings here. Connect with popular delivery services to streamline your shipping process."}
            titel={"Delivery Company"}
        >

            {companyLiv.name && !changeMode ? (
                // 2. If company exists, show details and 'Add More' button
                <div className="flex flex-col gap-6">
                    {/* Header with Company Info and Button */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">

                        <div className="flex items-center gap-4">
                            {/* Show Logo if found, otherwise show a placeholder */}
                            {currentCompany ? (
                                <img
                                    src={currentCompany.logo}
                                    alt={currentCompany.name}
                                    className="w-16 h-16 object-contain rounded-full border border-gray-200 p-1"
                                />
                            ) : (
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-xl font-bold text-gray-400">
                                    {companyLiv.name.charAt(0)}
                                </div>
                            )}

                            <div>
                                <h2 className="text-xl font-bold text-gray-800 capitalize">
                                    {companyLiv.name}
                                </h2>
                                <p className="text-sm text-gray-500">Delivery Partner</p>
                            </div>
                        </div>

                        <button
                            onClick={() => setChangeMode(true)}
                            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg transition-all shadow-md active:scale-95"
                        >
                            <Plus size={18} />
                            <span>change</span>
                        </button>
                    </div>

                </div>
            ) : (
                // 4. Fallback if no company is selected
                <DelevryComapnesContainer
                    start={start}
                    repoName={repoName} updateUser={updateUser} />
            )}
        </PageContainer>
    );
};

export default LivCompany;