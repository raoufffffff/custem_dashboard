import React from 'react';
import { Trash2 } from 'lucide-react';

const ShowdeleteC = ({ deleteOrder, hide, myorder }) => {
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm" />
            <div className="fixed inset-0 flex items-center justify-center z-[51]">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm mx-4">
                    <div className="p-5 border-b border-gray-200 flex items-center space-x-3">
                        <Trash2 className="text-red-600 w-6 h-6" />
                        <h3 className="text-lg font-semibold text-gray-900">Confirm Deletion</h3>
                    </div>

                    <div className="p-5 text-sm text-gray-700">
                        Are you sure you want to delete the order for:
                        <div className="mt-2 px-3 py-2 bg-gray-100 rounded-md text-base font-medium text-gray-800">
                            {myorder.item.name}
                        </div>
                    </div>
                    <div className="px-5 py-4 border-t border-gray-200 flex justify-end space-x-2">
                        <button
                            onClick={hide}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                deleteOrder(myorder._id);
                                hide();
                            }}
                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                        >
                            Delete Order
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShowdeleteC;
