import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const UseLivOrder = (companyLiv) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // استخدام useCallback لضمان عدم إنشاء الدالة مع كل render
    const fetchOrders = useCallback(async () => {
        // إذا لم تتوفر بيانات الشركة، لا تقم بالطلب
        if (!companyLiv?.token || !companyLiv?.key) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(`https://next-delvry.vercel.app/listen`, {
                company: {
                    name: companyLiv?.name,
                    Token: companyLiv?.token,
                    Key: companyLiv?.key
                }
            });

            // التحقق من صحة البيانات بناءً على رد الباك إند الخاص بك
            if (response.data && response.data.result?.Colis) {
                // عكس المصفوفة لعرض الأحدث أولاً
                setOrders(response.data.result.Colis.reverse());
            } else {
                setOrders([]); // مصفوفة فارغة في حالة عدم وجود طلبات
            }

        } catch (err) {
            console.error("Fetch Error:", err);
            setError(err.response?.data?.message || "فشل في جلب بيانات الشحن");
        } finally {
            setLoading(false);
        }
    }, [companyLiv]); // إعادة الإنشاء فقط عند تغير بيانات الشركة

    // جلب البيانات عند تحميل الصفحة أو تغير الشركة
    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    // دالة إرسال الطلب
    const sendToliv = async (orderrrrrr) => {
        const order = orderrrrrr
        console.log(order);

        try {
            const response = await axios.post(`https://next-delvry.vercel.app/send-order`, {
                company: {
                    name: companyLiv?.name,
                    Token: companyLiv?.token,
                    Key: companyLiv?.key
                },
                order: orderrrrrr
            });

            console.log("Send Response:", response.data);

            if (response.data) {
                // تحديث القائمة فوراً بعد الإرسال الناجح
                fetchOrders();
                return { success: true, data: response.data };
            } else {
                return { success: false, message: "لم يتم استلام رد صحيح" };
            }

        } catch (err) {
            console.error("Send Error:", err);
            return {
                success: false,
                message: err.response?.data?.message || err.message
            };
        }
    }

    return { orders, error, loading, sendToliv, refetch: fetchOrders };
};

export default UseLivOrder;