import React from 'react'

const ShowNoteC = ({ edite, note, changenote, hide, showNote, myorder }) => {
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm" />
            <div className="fixed inset-0 flex items-center justify-center z-[51]">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-4">
                    <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900">Add note for {showNote.status}</h3>
                    </div>
                    <div className="p-4">
                        <textarea
                            value={note}
                            onChange={(e) => changenote(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={4}
                            placeholder="Enter your note here..."
                        />
                    </div>
                    <div className="p-4 border-t border-gray-200 flex justify-end space-x-2">
                        <button
                            onClick={hide}
                            // onClick={() => setShowNote({ show: false, status: "" })}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                edite(myorder._id, (showNote.status || myorder.status), note);
                                hide()
                            }}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        >
                            Save Note
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShowNoteC