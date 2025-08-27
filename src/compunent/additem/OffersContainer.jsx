import React from "react";
import { Trash2 } from "lucide-react";

const OffersContainer = ({ Offers, setOffers, err }) => {
    return (
        <div className="space-y-6 w-full overflow-hidden">
            {Offers.map((offer, index) => (
                <div
                    key={index}
                    className="border-b w-full border-gray-200 pb-6 flex flex-col gap-4"
                >

                    {/* Top Row */}
                    <div className="flex items-center gap-3">
                        {/* Delete button */}


                        {/* Inputs */}
                        <div className="flex w-10/12 flex-col sm:flex-row gap-3 flex-1 pr-2">
                            <input
                                type="text"
                                placeholder="Offer Name"
                                value={offer.name}
                                onChange={(e) => {
                                    const newOffers = [...Offers];
                                    newOffers[index].name = e.target.value;
                                    setOffers(newOffers);
                                }}
                                className={`flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${err && !offer.name ? "border-red-500 focus:ring-red-500" : ""}`}
                            />
                            <input
                                type="text"
                                placeholder="Offer Quantity"
                                value={offer.Quantity}
                                onChange={(e) => {
                                    const newOffers = [...Offers];
                                    newOffers[index].Quantity = e.target.value;
                                    setOffers(newOffers);
                                }}
                                className={`sm:w-40 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${err && !offer.Quantity ? "border-red-500 focus:ring-red-500" : ""}`}
                            />
                            <input
                                type="text"
                                placeholder="Offer Price"
                                value={offer.price}
                                onChange={(e) => {
                                    const newOffers = [...Offers];
                                    newOffers[index].price = e.target.value;
                                    setOffers(newOffers);
                                }}
                                className={`sm:w-40 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${err && !offer.price ? "border-red-500 focus:ring-red-500" : ""}`}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                const newOffers = Offers.filter((_, i) => i !== index);
                                setOffers(newOffers);
                            }}
                            className="text-red-500 hover:text-red-600 self-start my-auto md:self-center"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>

                    {/* Toggles */}
                    <div className="flex flex-col gap-2 md:pl-10">
                        <label className="flex items-center gap-2 text-gray-700">
                            <input
                                type="checkbox"
                                checked={offer.topOffer}
                                onChange={(e) => {
                                    const newOffers = [...Offers];
                                    newOffers[index].topOffer = e.target.checked;
                                    setOffers(newOffers);
                                }}
                                className="toggle-checkbox"
                            />
                            Mark this offer as best offer?
                        </label>

                        <label className="flex items-center gap-2 text-gray-700">
                            <input
                                type="checkbox"
                                checked={offer.freedelevry}
                                onChange={(e) => {
                                    const newOffers = [...Offers];
                                    newOffers[index].freedelevry = e.target.checked;
                                    setOffers(newOffers);
                                }}
                                className="toggle-checkbox"
                            />
                            Free delivery for this offer?
                        </label>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OffersContainer;
