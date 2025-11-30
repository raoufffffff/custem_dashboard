import React, { useEffect } from "react";
import { FaSheetPlastic } from "react-icons/fa6";
import { Sparkles, ArrowRight, Lock } from "lucide-react";
import PageContainer from "../CustomUi/PageContainer"; // Assuming you have this or use a simple div

const Sheet = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = "http://localhost:5173/sheet"; // تأكد من مطابقته في Google Cloud Console
    const scope = [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive.file",
    ].join(" ");

    // 👉 Function: يفتح شاشة جوجل
    const handleConnect = () => {
        const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;
        window.location.href = url;
    };

    // 👉 Function: استقبال الكود
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (code) {
            // يمكنك إضافة حالة تحميل هنا (Loading State)
            fetch("http://localhost:5000/api/google/callback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("✅ Tokens saved:", data);
                    // يمكنك استخدام توست (Toast) بدلاً من التنبيه
                    alert("Google Connected Successfully!");
                    // تنظيف الرابط بعد النجاح
                    window.history.replaceState({}, document.title, window.location.pathname);
                })
                .catch((err) => {
                    console.error("❌ Error:", err);
                    alert("Failed to connect.");
                });
        }
    }, []);

    return (
        <div className="flex items-center justify-center min-h-[80vh] w-full p-4">
            <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 p-8 md:p-12 text-center">

                {/* الخلفية الجمالية */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 to-purple-600"></div>
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-teal-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>

                {/* الأيقونة والشعار */}
                <div className="relative z-10 flex justify-center mb-8">
                    <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-tr from-green-50 to-green-100 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 transition-transform hover:rotate-6">
                            <FaSheetPlastic className="w-12 h-12 text-green-600" />
                        </div>
                        {/* Coming Soon Badge */}
                        <div className="absolute -top-3 -right-3 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1 animate-bounce">
                            <Sparkles className="w-3 h-3" />
                            COMING SOON
                        </div>
                    </div>
                </div>

                {/* النصوص */}
                <h1 className="relative z-10 text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">
                    Google Sheets Integration
                </h1>

                <p className="relative z-10 text-gray-500 text-lg mb-8 leading-relaxed max-w-lg mx-auto">
                    We're building a powerful way to sync your orders and products directly to your spreadsheets.
                    <br className="hidden md:block" />
                    <span className="text-purple-600 font-medium">No manual entry required.</span>
                </p>

                {/* أزرار الإجراءات */}
                <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    {/* زر التوصيل (Early Access) */}
                    <button
                        onClick={handleConnect}
                        className="group flex items-center gap-2 px-8 py-3.5 bg-gray-900 text-white rounded-xl font-bold shadow-xl hover:bg-gray-800 hover:-translate-y-1 transition-all duration-200"
                    >
                        <span>Join Early Access</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    {/* زر وهمي للإعلام */}
                    <button className="flex items-center gap-2 px-6 py-3.5 bg-white border border-gray-200 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-colors">
                        Notify me when ready
                    </button>
                </div>

                {/* تذييل */}
                <div className="relative z-10 mt-10 pt-6 border-t border-gray-50">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">
                        Expected Launch: Q4 2024
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Sheet;