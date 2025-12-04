import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import UseOffer from '../hooks/useOffer';
import LoadingBar from '../CustomUi/LoadingBar';
import PageContainer from '../CustomUi/PageContainer';

const Subscriptions = () => {
    const { Offers, loading } = UseOffer();
    const user = useOutletContext();
    const { isPaid } = user;

    if (loading) {
        return <LoadingBar />;
    }

    return (
        <PageContainer
            titel={"Subscriptions"}
            about={"Manage your subscriptions and view offer details here."}
        >
            <div className="w-full">
                {/* 1. Current Status Section */}
                <div className={`relative my-5 overflow-hidden rounded-2xl border p-8 shadow-sm transition-all ${isPaid
                    ? 'bg-teal-50 border-teal-200'
                    : 'bg-white border-purple-100'
                    }`}>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 mb-2">
                                Current Plan Status
                            </h2>
                            <div className="flex items-center gap-3">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${isPaid
                                    ? 'bg-teal-100 text-teal-800'
                                    : 'bg-purple-100 text-purple-800'
                                    }`}>
                                    {isPaid ? 'Active Premium' : 'Free Plan'}
                                </span>
                                {isPaid && (
                                    <span className="text-sm text-teal-600 flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        You are all set!
                                    </span>
                                )}
                            </div>
                            {!isPaid && (
                                <p className="mt-2 text-gray-500 text-sm max-w-md">
                                    Unlock exclusive features and higher limits by upgrading your account today.
                                </p>
                            )}
                        </div>

                        {/* Call to Action for Unpaid Users */}
                        {!isPaid && (
                            <Link
                                to="/upgrade"
                                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl shadow-lg shadow-purple-200 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                            >
                                <span>Upgrade Now</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                            </Link>
                        )}
                    </div>
                </div>

                {/* 2. Subscription History Table */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                        <h3 className="font-semibold text-gray-800">Billing History</h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Plan Details</th>
                                    <th className="px-6 py-4 font-medium">Duration</th>
                                    <th className="px-6 py-4 font-medium">Date</th>
                                    <th className="px-6 py-4 font-medium">Amount</th>
                                    <th className="px-6 py-4 font-medium text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {Offers && Offers.length > 0 ? (
                                    Offers.map((offer) => (
                                        <tr key={offer._id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-gray-900">{offer.offerTitle}</div>
                                                <div className="text-xs text-gray-400">ID: {offer._id.slice(-6)}</div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {offer.OfferTypeValue}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {new Date(offer.date).toLocaleDateString()}
                                                <span className="block text-xs text-gray-400">
                                                    {new Date(offer.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {offer.price.toLocaleString()} DZD
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <StatusBadge status={offer.status} />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                                            No subscription history found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

// Helper component for styled badges based on status
const StatusBadge = ({ status }) => {
    const styles = {
        approved: "bg-teal-100 text-teal-700 border-teal-200",
        rejected: "bg-red-100 text-red-700 border-red-200",
        pending: "bg-purple-100 text-purple-700 border-purple-200",
    };

    const currentStyle = styles[status?.toLowerCase()] || "bg-gray-100 text-gray-700 border-gray-200";

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${currentStyle} capitalize`}>
            {status}
        </span>
    );
};

export default Subscriptions;