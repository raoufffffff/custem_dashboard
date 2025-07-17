import React, { useState, useEffect } from 'react';
import useItem from '../../hooks/useItem';
import axios from 'axios';
import etat from '../../constanst/etat';
import states from '../../constanst/states';

const EditeOrder = ({ hide, id, editefull }) => {
    const { Items } = useItem();
    const [order, setOrder] = useState({});
    const [CityOption, setCityOption] = useState([]);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await axios.get(`https://true-fit-dz-api.vercel.app/order/${id}`);
                const orderData = res.data.result;

                setOrder(orderData);

                // Pre-fill city options based on order state

                setCityOption(etat.filter(e => e.state_code == orderData.stateNumber));

            } catch (err) {
                setFetchError(err.message || "فشل في تحميل الطلب.");
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, []);

    const handleSelectItem = (e) => {
        const selectedId = e.target.value;
        const selectedItem = Items.find(i => i._id == selectedId);
        if (selectedItem) {
            setOrder({ ...order, item: selectedItem, price: selectedItem.price });
        }
    };

    const handleSelectState = (e) => {
        const selectedId = e.target.value;
        const selectedState = states.find(i => i.id == selectedId);
        const cityList = etat.filter(c => c.state_code == selectedState.id);
        setOrder({
            ...order,
            state: selectedState.name,
            stateNumber: selectedState.code,
        });
        setCityOption(cityList);

    };

    const handleSelectCity = (e) => {
        const selectedId = e.target.value;
        const selectedCity = etat.find(c => c.id == selectedId);
        if (selectedCity) {
            setOrder({ ...order, city: selectedCity.name });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        if (!order.name || !order.phone || !order.item || !order.state || !order.city) {
            setErrors({ submit: "الرجاء تعبئة جميع الحقول المطلوبة" });
            setIsSubmitting(false);
            return;
        }
        editefull(id, order)
        hide()
    };

    if (loading) return <div className="text-center py-10">جاري التحميل...</div>;
    if (fetchError) return <div className="text-center text-red-600 py-10">{fetchError}</div>;

    return (
        <>
            <div onClick={hide} className="fixed inset-0 bg-[#000a] backdrop-blur-sm z-50" />
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto border border-blue-600"
                >
                    <div className="p-6 space-y-4">
                        <h2 className="text-xl font-bold text-blue-600 text-center">تعديل الطلب</h2>

                        {/* المنتج */}
                        <div>
                            <label className="block text-sm font-semibold mb-1">المنتج</label>
                            <select
                                value={order.item?._id || ""}
                                onChange={handleSelectItem}
                                className="w-full border border-blue-600 rounded-lg p-2"
                                required
                            >
                                <option value="" disabled>اختر منتجًا</option>
                                {Items.map((i) => (
                                    <option key={i._id} value={i._id}>{i.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* الاسم */}
                        <input
                            type="text"
                            placeholder="الاسم"
                            className="w-full border border-blue-600 rounded-lg p-2"
                            value={order.name || ""}
                            onChange={(e) => setOrder({ ...order, name: e.target.value })}
                            required
                        />

                        {/* الهاتف */}
                        <input
                            type="tel"
                            placeholder="الهاتف"
                            className="w-full border border-blue-600 rounded-lg p-2"
                            value={order.phone || ""}
                            onChange={(e) => setOrder({ ...order, phone: e.target.value })}
                            required
                        />

                        {/* الولاية + رقمها */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm mb-1">الولاية</label>
                                <select
                                    value={states.find(s => s.name === order.state)?.id || ""}
                                    onChange={handleSelectState}
                                    className="w-full border border-blue-600 rounded-lg p-2"
                                    required
                                >
                                    <option value="" disabled>اختر الولاية</option>
                                    {states.map((s) => (
                                        <option key={s.id} value={s.id}>{s.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm mb-1">رقم الولاية</label>
                                <input
                                    type="number"
                                    readOnly
                                    value={order.stateNumber || ""}
                                    className="w-full border border-blue-600 rounded-lg p-2"
                                />
                            </div>
                        </div>

                        {/* المدينة */}
                        <div>
                            <label className="block text-sm mb-1">المدينة</label>
                            <select
                                value={etat.find(c => c.name === order.city)?.id || ""}
                                onChange={handleSelectCity}
                                className="w-full border border-blue-600 rounded-lg p-2"
                                required
                            >
                                <option value="" disabled>اختر المدينة</option>
                                {CityOption.map((c) => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* التوصيل للمنزل */}
                        <div>
                            <label className="block text-sm mb-1">هل التوصيل للمنزل؟</label>
                            <select
                                value={order.home ? "yes" : "no"}
                                onChange={(e) => setOrder({ ...order, home: e.target.value === "yes" })}
                                className="w-full border border-blue-600 rounded-lg p-2"
                            >
                                <option value="yes">نعم</option>
                                <option value="no">لا</option>
                            </select>
                        </div>

                        {/* الكمية والسعر */}
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="number"
                                min={1}
                                placeholder="الكمية"
                                className="w-full border border-blue-600 rounded-lg p-2"
                                value={order.q || 1}
                                onChange={(e) => setOrder({ ...order, q: parseInt(e.target.value) })}
                            />
                            <input
                                type="number"
                                min={0}
                                placeholder="السعر"
                                className="w-full border border-blue-600 rounded-lg p-2"
                                value={order.price || 0}
                                onChange={(e) => setOrder({ ...order, price: parseFloat(e.target.value) })}
                            />
                        </div>

                        {/* الخطأ */}
                        {errors.submit && (
                            <p className="text-red-600 text-sm text-center">{errors.submit}</p>
                        )}
                    </div>

                    <div className="p-4 border-t flex justify-between items-center rounded-b-2xl">
                        <button
                            type="button"
                            onClick={hide}
                            className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
                        >
                            إلغاء
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
                        >
                            {isSubmitting ? "جاري التحديث..." : "تحديث الطلب"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditeOrder;
