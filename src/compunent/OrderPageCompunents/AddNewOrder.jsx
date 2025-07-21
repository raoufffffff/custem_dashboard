import axios from "axios";
import { useState } from "react";
import useItem from "../../hooks/useItem";
import etat from '../../constanst/etat';
import states from '../../constanst/states';

const AddNewOrder = ({ hide, fetchOrders }) => {
    const { Items, loading } = useItem();

    const [NewOrder, setNewOrder] = useState({
        name: "",
        phone: "",
        state: "",
        stateNumber: 0,
        city: "",
        ride: 0,
        q: 1,
        price: 0,
        home: true,
    });

    const [item, setitem] = useState({});
    const [CityOption, setCityOption] = useState([]);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await axios.post(`https://true-fit-dz-api.vercel.app/order`, {
                ...NewOrder,
                userId: JSON.parse(localStorage.getItem("user"))._id,
                item: item,
            });
            if (response.data.good) {
                hide()
                fetchOrders()
            } else {
                setErrors({ submit: "حدث خطأ أثناء إرسال الطلب" });
            }
        } catch (err) {
            console.error(err);
            setErrors({ submit: "خطأ في الخادم، حاول لاحقًا" });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSelectItem = (e) => {
        const selectedId = e.target.value;
        const selectedItem = Items.find(i => i._id === selectedId);
        setitem(selectedItem || {});
        setNewOrder({ ...NewOrder, price: selectedItem.price })
    };
    const handleSelectState = (e) => {
        const selectedId = e.target.value;
        console.log(selectedId, "helo");
        const selectedState = states.find(i => i.id == selectedId);
        const citys = etat.filter(e => e.state_code == selectedState.code)
        setNewOrder({ ...NewOrder, state: selectedState.name, stateNumber: selectedState.code });
        setCityOption(citys)
    };
    const handleSelectCity = (e) => {
        const selectedId = e.target.value;
        console.log(selectedId);
        const citys = etat.find(e => e.idd == selectedId)
        setNewOrder({ ...NewOrder, city: citys.name });
    };

    return (
        <>
            <div onClick={hide} className="fixed inset-0 bg-[#000a] backdrop-blur-sm z-50" />
            <div className="fixed inset-0 flex items-center justify-center z-50 a">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto border border-blue-600"
                >
                    <div className="p-6 space-y-4">

                        <h2 className="text-xl font-bold text-blue-600 text-center">إضافة طلب جديد</h2>

                        {/* اختيار المنتج */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">المنتج</label>
                            <select
                                onChange={handleSelectItem}
                                className="w-full border border-blue-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                defaultValue=""
                                required
                            >
                                <option value="" disabled>اختر منتجًا</option>
                                {!loading && Items.map((i) => (
                                    <option key={i._id} value={i._id}>{i.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* الاسم */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">الاسم</label>
                            <input
                                type="text"
                                className="w-full border border-blue-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                value={NewOrder.name}
                                onChange={(e) => setNewOrder({ ...NewOrder, name: e.target.value })}
                                required
                            />
                        </div>

                        {/* الهاتف */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">الهاتف</label>
                            <input
                                type="tel"
                                className="w-full border border-blue-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                value={NewOrder.phone}
                                onChange={(e) => setNewOrder({ ...NewOrder, phone: e.target.value })}
                                required
                            />
                        </div>

                        {/* الولاية */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">الولاية</label>
                                <select
                                    onChange={handleSelectState}
                                    className="w-full border border-blue-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    defaultValue=""
                                    required
                                >
                                    <option value="" disabled>اختر الولاية</option>
                                    {states.map((i) => (
                                        <option key={i.id} value={i.id}>{i.name}</option>
                                    ))}
                                </select>

                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">رقم الولاية</label>
                                <input
                                    type="number"
                                    className="w-full border border-blue-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    value={NewOrder.stateNumber}
                                    onChange={(e) => setNewOrder({ ...NewOrder, stateNumber: parseInt(e.target.value) })}
                                    required
                                />
                            </div>
                        </div>

                        {/* المدينة */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">المدينة</label>
                            <select
                                onChange={handleSelectCity}
                                className="w-full border border-blue-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                defaultValue=""
                                required
                            >
                                <option value="" disabled>اختر المدينة</option>
                                {CityOption.map((i) => (
                                    <option key={i.id} value={i.id}>{i.name}</option>
                                ))}
                            </select>

                        </div>

                        {/* التوصيل للمنزل */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">هل التوصيل للمنزل؟</label>
                            <select
                                className="w-full border border-blue-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                value={NewOrder.home ? "yes" : "no"}
                                onChange={(e) => setNewOrder({ ...NewOrder, home: e.target.value === "yes" })}
                            >
                                <option value="yes">نعم</option>
                                <option value="no">لا</option>
                            </select>
                        </div>

                        {/* الكمية والسعر */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">الكمية</label>
                                <input
                                    type="number"
                                    min={1}
                                    className="w-full border border-blue-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    value={NewOrder.q}
                                    onChange={(e) => setNewOrder({ ...NewOrder, q: parseInt(e.target.value,) })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">السعر</label>
                                <input
                                    type="number"
                                    min={0}
                                    className="w-full border border-blue-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    value={NewOrder.price}
                                    onChange={(e) => setNewOrder({ ...NewOrder, price: parseFloat(e.target.value) })}
                                />
                            </div>
                        </div>

                        {/* رسالة الخطأ */}
                        {errors.submit && (
                            <p className="text-red-600 text-sm text-center mt-2">{errors.submit}</p>
                        )}
                    </div>

                    {/* الأزرار */}
                    <div className="p-4 border-t border-gray-200 bg-white flex justify-between items-center rounded-b-2xl">
                        <button
                            type="button"
                            onClick={hide}
                            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
                        >
                            إلغاء
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
                        >
                            {isSubmitting ? "جاري الإرسال..." : "إرسال الطلب"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddNewOrder;
