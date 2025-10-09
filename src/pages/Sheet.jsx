import React, { useEffect } from "react";

const Sheet = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
    const redirectUri = "http://localhost:5173/sheet"; // لازم نفسو في Google Cloud
    const scope = [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive.file",
    ].join(" ");

    // 👉 Function: يفتح شاشة جوجل
    const handleConnect = () => {
        const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;
        window.location.href = url;
    };

    // 👉 Function: تستقبل code من الرابط وتبعثو للسيرفر
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (code) {
            fetch("http://localhost:5000/api/google/callback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("✅ Tokens saved:", data);
                    alert("Google Connected Successfully!");
                })
                .catch((err) => {
                    console.error("❌ Error:", err);
                });
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-6">
            <h1 className="text-2xl font-bold">Google Sheets Integration</h1>
            <button
                onClick={handleConnect}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
                Connect Google Sheets
            </button>
        </div>
    );
};

export default Sheet;
