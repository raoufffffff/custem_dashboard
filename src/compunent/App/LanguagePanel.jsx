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
                    className='bg-blue-100 my-1 hover:scale-[1.01] py-2 rounded-xl text-blue-500 hover:bg-gray-100 flex justify-between px-3 hover:text-gray-700'
                >English
                    <Check />
                </button>
                <button
                    className=' flex my-1 hover:scale-[1.01] py-2 rounded-xl justify-between px-3 hover:bg-gray-100 hover:text-gray-700'
                >Arabic
                </button>
            </div>
            <button
                onClick={hide}
                className='ml-auto px-3 py-2 bg-gray-200 rounded-xl'
            >Close
            </button>
        </div>
    )
}

export default LanguagePanel