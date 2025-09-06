import { Check } from "lucide-react"
const LanguagePanel = ({ hide }) => {
    return (
        <div
            className='px-5 py-3 w-full flex flex-col'
        >
            <h2
                className='font-bold'
            >Choose a language</h2>
            <div
                className='w-full mx-auto flex mt-3 flex-col'
            >
                <button
                    className='bg-purple-100 my-1 hover:scale-[1.01] py-2 rounded-xl text-purple-500 hover:bg-purple-200 flex justify-between px-3 hover:text-purple-600'
                >English
                    <Check />
                </button>
                <button
                    className='  my-1 hover:scale-[1.01] py-2 rounded-xl hover:bg-purple-200  px-3hover:bg-purple-100 flex justify-between px-3 hover:text-purple-600'
                >Arabic
                </button>
            </div>
            <button
                onClick={hide}
                className="ml-auto mt-4 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-xl transition-all shadow-md"
            >
                Close
            </button>
        </div>
    )
}

export default LanguagePanel