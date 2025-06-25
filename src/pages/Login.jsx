import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-hot-toast";

const Login = () => {

    const [role, setRole] = useState("user");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("يرجى ملء جميع الحقول", {
                style: { border: "1px solid #ef4444" }, // red-500
            });
            return;
        }

        const endpoint =
            role === "user"
                ? "https://true-fit-dz-api.vercel.app/user/auth"
                : "https://true-fit-dz-api.vercel.app/assistant/auth";

        try {
            const res = await axios.post(endpoint, { email, password });

            if (res.data?.result) {
                localStorage.setItem("user", JSON.stringify(res.data.result));
                toast.success("تم تسجيل الدخول بنجاح ✅");
                window.location.replace("/");
            } else {
                toast.error("البريد أو كلمة المرور غير صحيحة", {
                    style: { border: "1px solid #ef4444" },
                });
            }
        } catch (e) {
            console.log(e);

            toast.error("فشل الاتصال بالخادم، حاول لاحقاً. ", {
                style: { border: "1px solid #ef4444" },
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
                    تسجيل الدخول
                </h2>

                <div className="flex justify-center gap-4 mb-6">
                    <button
                        onClick={() => setRole("user")}
                        className={`px-4 py-2 rounded-full border transition ${role === "user"
                            ? "bg-blue-600 text-white"
                            : "border-blue-600 text-blue-600"
                            }`}
                    >
                        مستخدم
                    </button>
                    <button
                        onClick={() => setRole("assistant")}
                        className={`px-4 py-2 rounded-full border transition ${role === "assistant"
                            ? "bg-blue-600 text-white"
                            : "border-blue-600 text-blue-600"
                            }`}
                    >
                        مساعد
                    </button>
                </div>

                <input
                    type="email"
                    placeholder="البريد الإلكتروني"
                    className="w-full mb-4 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="كلمة المرور"
                    className="w-full mb-4 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-300"
                >
                    تسجيل الدخول
                </button>

                <div className="mt-6 text-center text-sm text-gray-600">
                    <a href="/forgot-password" className="text-blue-600 hover:underline">
                        نسيت كلمة المرور؟
                    </a>
                    <br />
                    <span>ليس لديك حساب؟ </span>
                    <a href="/sinin" className="text-blue-600 hover:underline">
                        إنشاء حساب
                    </a>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
