import React, { useState } from 'react';
import states from '../../constanst/states.json';
import citie from '../../constanst/etat';
import toast from 'react-hot-toast';
import useItem from '../../hooks/useItem';
import LoadingBar from '../../CustomUi/LoadingBar';

const AddOrder = ({ postOrder, editefull, onclose, order }) => {
    // 1. Initialize State
    const { Items, loading } = useItem()
    const [formData, setFormData] = useState({
        name: order.name || "",
        phone: order.phone || "",
        state: order.state || "",
        city: order.city || "",
        home: order.home || true, // true = Home delivery, false = Desk/Stop desk
        quantity: order.quantity || 1,
        item: order.item || null,
        userId: order.userId || "",
        price: order.price || 0,
        ride: order.ride || 0,
        total: order.total || 0,
    });

    const [availableCities, setAvailableCities] = useState([]);
    // Store standard fees for the selected state to allow toggling, 
    // but the actual value used is in formData.ride
    const [rideFees, setRideFees] = useState({ home: 0, office: 0 });

    // --- Helper to update Total ---
    // We use this function to ensure Total is always (Price * Qty) + Ride
    // unless the user edits the total directly.
    const calculateTotal = (price, qty, ride) => {
        return (Number(price) * Number(qty)) + Number(ride);
    };
    if (loading) return <LoadingBar />
    // --- Handlers ---
    console.log(Items);

    // 1. Generic Change Handler
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => {
            const newData = { ...prev, [name]: value };

            // If changing Price, Quantity, or Ride, auto-recalculate Total
            if (name === 'price' || name === 'quantity' || name === 'ride') {
                newData.total = calculateTotal(newData.price, newData.quantity, newData.ride);
            }

            return newData;
        });
    };

    // 2. Special Handler for State (Wilaya)
    const handleStateChange = (e) => {
        const stateCode = e.target.value;
        const stateObj = states.find((s) => String(s.code) === String(stateCode));
        const cities = citie.filter((c) => String(c.state_code) === String(stateCode));

        setAvailableCities(cities);

        // Get the standard fees for this state
        const homePrice = stateObj?.prix_initial || 0;
        const officePrice = stateObj?.stop_back || 0;

        setRideFees({ home: homePrice, office: officePrice });

        // Determine which price to apply right now based on current delivery mode
        const newRidePrice = formData.home ? homePrice : officePrice;

        setFormData((prev) => ({
            ...prev,
            state: stateObj?.name || "",
            city: "",
            ride: newRidePrice, // Set standard shipping
            total: calculateTotal(prev.price, prev.quantity, newRidePrice) // Update total
        }));
    };

    // 3. Special Handler for Product Selection
    const handleItemChange = (e) => {
        const selectedId = e.target.value;
        const selectedProduct = Items.find(item => item._id === selectedId);

        if (selectedProduct) {
            setFormData(prev => ({
                ...prev,
                item: selectedProduct,
                userId: selectedProduct.userId || "",
                price: selectedProduct.price, // Set product price
                total: calculateTotal(selectedProduct.price, prev.quantity, prev.ride) // Update total
            }));
        }
    };

    // 4. Special Handler for Delivery Mode (Home vs Desk)
    const handleDeliveryMode = (isHome) => {
        const newRidePrice = isHome ? rideFees.home : rideFees.office;

        setFormData(prev => ({
            ...prev,
            home: isHome,
            ride: newRidePrice, // Reset to standard fee for this mode
            total: calculateTotal(prev.price, prev.quantity, newRidePrice)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.phone || !formData.state) {
            alert("Please fill in the required fields");
            return;
        }
        if (!formData.item) {
            toast.error("u must have an item")
            return
        }
        if (order) {
            editefull(order._id, formData);
            onclose()

        } else {
            postOrder(formData);
            onclose()
        }
    };

    return (
        <div className="p-5 bg-white rounded-xl shadow-sm border border-gray-100 overflow-y-scroll max-h-[80vh]">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="p-2 bg-purple-100 rounded-lg text-purple-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                </span>
                Add New Order
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">

                {/* --- Customer Info --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Customer Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                            placeholder="Full Name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                            placeholder="05 XX XX XX XX"
                            required
                        />
                    </div>
                </div>

                {/* --- Location --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">State (Wilaya)</label>
                        <select
                            onChange={handleStateChange}
                            className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                            required
                        >
                            <option value="">Select State</option>
                            {states.map((s) => (
                                <option key={s.code} value={s.code}>{s.code} - {s.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">City (Commune)</label>
                        <select
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            disabled={!formData.state}
                            className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none disabled:opacity-50 transition-all"
                            required
                        >
                            <option value="">Select City</option>
                            {availableCities.map((c, index) => (
                                <option key={index} value={c.name}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="h-px bg-gray-100 my-2"></div>

                {/* --- Product & Details --- */}
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Select Product</label>
                    <select
                        onChange={handleItemChange}
                        className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    >
                        <option value="">Choose a product...</option>
                        {Items && Items.map((item) => (
                            <option key={item._id} value={item._id}>{item.name}</option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Item Price (DZD)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange} // Updates Total automatically
                            className="w-full border border-gray-200 bg-white rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none font-medium"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Qty</label>
                        <input
                            type="number"
                            name="quantity"
                            min="1"
                            value={formData.quantity}
                            onChange={handleChange} // Updates Total automatically
                            className="w-full border border-gray-200 bg-white rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none font-medium text-center"
                        />
                    </div>
                </div>

                {/* --- Delivery & Shipping Fees --- */}
                <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-100">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
                        <span className="text-sm font-semibold text-purple-900">Delivery Options</span>
                        <div className="flex bg-white rounded-lg p-1 border border-purple-100 shadow-sm">
                            <button
                                type="button"
                                onClick={() => handleDeliveryMode(true)}
                                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${formData.home ? 'bg-purple-100 text-purple-700' : 'text-gray-500 hover:text-purple-600'}`}
                            >
                                Home
                            </button>
                            <button
                                type="button"
                                onClick={() => handleDeliveryMode(false)}
                                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${!formData.home ? 'bg-purple-100 text-purple-700' : 'text-gray-500 hover:text-purple-600'}`}
                            >
                                Stop Desk
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-purple-700 mb-1.5">Shipping Fee (Editable)</label>
                        <div className="relative">
                            <input
                                type="number"
                                name="ride"
                                value={formData.ride}
                                onChange={handleChange} // Updates Total automatically
                                className="w-full border border-purple-200 bg-white rounded-lg pl-4 pr-12 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none font-bold text-purple-900"
                            />
                            <span className="absolute right-4 top-2.5 text-sm text-purple-400 font-medium">DZD</span>
                        </div>
                        <p className="text-[10px] text-purple-400 mt-1">
                            Standard rate: {formData.home ? rideFees.home : rideFees.office} DZD. You can override this.
                        </p>
                    </div>
                </div>

                {/* --- Final Total --- */}
                <div className="pt-2">
                    <label className="block text-xs font-semibold text-gray-900 uppercase tracking-wider mb-2">Total Amount (Editable)</label>
                    <div className="relative group">
                        <input
                            type="number"
                            name="total"
                            value={formData.total}
                            onChange={handleChange} // Allows manual override of the calculated total
                            className="w-full border-2 border-gray-200 bg-white rounded-xl pl-4 pr-16 py-4 text-2xl font-bold text-gray-900 focus:border-purple-500 focus:ring-0 outline-none transition-all shadow-sm group-hover:border-purple-300"
                        />
                        <span className="absolute right-6 top-5 text-base text-gray-400 font-semibold">DZD</span>
                    </div>
                </div>

                {/* --- Buttons --- */}
                <div className="flex gap-3 pt-4">
                    {onclose && (
                        <button
                            type="button"
                            onClick={onclose}
                            className="flex-1 py-3 border border-gray-200 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        className="flex-1 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 shadow-lg shadow-gray-200 transition-all transform hover:-translate-y-0.5"
                    >
                        Confirm Order
                    </button>
                </div>

            </form>
        </div>
    );
}

export default AddOrder;