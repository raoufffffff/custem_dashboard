import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-hot-toast";

const Sinin = () => {
    const [role, setRole] = useState("user");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        if (!name || !phone || !email || !password) {
            toast.error("يرجى ملء جميع الحقول");
            return;
        }

        const endpoint =
            role === "user"
                ? "https://true-fit-dz-api.vercel.app/user"
                : "https://true-fit-dz-api.vercel.app/assistant";

        const body = {
            name,
            phone,
            email,
            password
        };

        try {
            const res = await axios.post(endpoint, body);

            if (res.data?.result || res.data?._id) {
                toast.success("تم إنشاء الحساب بنجاح ✅");
                window.location.replace("/login");
            } else {
                toast.error("حدث خطأ، تأكد من صحة المعلومات");
            }
        } catch {
            toast.error("فشل الاتصال بالخادم");
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
                    إنشاء حساب جديد
                </h2>

                <div className="flex justify-center gap-4 mb-6">
                    <button
                        onClick={() => setRole("user")}
                        className={`px-4 py-2 rounded-full border ${role === "user"
                            ? "bg-blue-600 text-white"
                            : "border-blue-600 text-blue-600"
                            }`}
                    >
                        مستخدم
                    </button>
                    <button
                        onClick={() => setRole("assistant")}
                        className={`px-4 py-2 rounded-full border ${role === "assistant"
                            ? "bg-blue-600 text-white"
                            : "border-blue-600 text-blue-600"
                            }`}
                    >
                        مساعد
                    </button>
                </div>

                <input
                    type="text"
                    placeholder="الاسم الكامل"
                    className="w-full mb-3 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="رقم الهاتف"
                    className="w-full mb-3 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="البريد الإلكتروني"
                    className="w-full mb-3 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                    onClick={handleRegister}
                    className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-300"
                >
                    إنشاء حساب
                </button>

                <div className="mt-6 text-center text-sm text-gray-600">
                    <span>لديك حساب بالفعل؟ </span>
                    <a href="/login" className="text-blue-600 hover:underline">
                        تسجيل الدخول
                    </a>
                </div>
            </motion.div>
        </div>
    );
};

export default Sinin;
