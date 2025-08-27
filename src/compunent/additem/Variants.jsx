import { Trash2, X } from 'lucide-react';

const VariantsContainer = ({ Variants, setVariants, err }) => {
    return (
        <div
            className='space-y-4 w-full overflow-hidden'
        >
            {Variants.map((variant, index) => (
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        const newVariants = [...Variants];
                        newVariants[index].options = [
                            ...newVariants[index].options,
                            newVariants[index].type === "color"
                                ? { name: newVariants[index].curentOption, color: "#fff" }
                                : { name: newVariants[index].curentOption }
                        ];
                        newVariants[index].curentOption = "";
                        setVariants(newVariants);
                    }}
                    key={index}
                    className="p-4 flex flex-col border border-gray-200 w-full rounded-lg bg-white shadow-sm"
                >
                    <div className="flex flex-wrap gap-4 items-center">
                        {/* Option Name */}
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-600">Option Name</span>
                            <input
                                type="text"
                                value={variant.name}
                                onChange={(e) => {
                                    const newVariants = [...Variants];
                                    newVariants[index].name = e.target.value;
                                    setVariants(newVariants);
                                }}
                                placeholder="Size"
                                className={`px-3 w-11/12 mt-1 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none ${err && !variant.name ? "border-red-500 focus:ring-red-500" : ""}`}
                            />
                        </div>

                        {/* Option Type */}
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-600">Option Style</span>
                            <select
                                value={variant.type}
                                onChange={(e) => {
                                    const newVariants = [...Variants];
                                    newVariants[index].type = e.target.value;
                                    setVariants(newVariants);
                                }}
                                className={`px-3 py-2 mt-1 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none ${err && !variant.type ? "border-red-500 focus:ring-red-500" : ""}`}
                            >
                                <option value="" disabled>Select type</option>
                                <option value="size">Size</option>
                                <option value="color">Color</option>
                                <option value="dropdown">Dropdown</option>
                            </select>
                        </div>

                        {/* Delete Button */}
                        <button
                            type="button"
                            onClick={() => {
                                const newOffers = Variants.filter((_, i) => i !== index);
                                setVariants(newOffers);
                            }}
                            className="ml-auto  hover:text-red-500 text-red-400"
                        >
                            <Trash2 size={20} />
                        </button>

                    </div>

                    {/* Option Values (pills) */}
                    <div className="flex flex-wrap gap-2 mt-3">
                        {variant.options.map((opt, i) => (
                            <span
                                key={i}
                                className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-700"
                            >
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newVariants = [...Variants];
                                        newVariants[index].options = newVariants[index].options.filter((_, optionIndex) => optionIndex !== i);
                                        setVariants(newVariants);
                                    }}
                                    className="text-gray-500 hover:text-red-500"
                                >
                                    <X size={14} />
                                </button>
                                {opt.name}
                                {variant.type === "color" && (
                                    <div className="flex items-center gap-3">
                                        <label
                                            htmlFor={`color-${i}`}
                                            className="relative w-5 h-5 rounded-full border border-gray-300 cursor-pointer shadow-sm"
                                            style={{ backgroundColor: opt.color }}
                                        >
                                            {/* Accessibility text (screen readers only) */}
                                            <span className="sr-only">Choose color</span>
                                        </label>

                                        <input
                                            id={`color-${i}`}
                                            type="color"
                                            value={opt.color}
                                            onChange={(e) => {
                                                const newVariants = [...Variants];
                                                newVariants[index].options[i].color = e.target.value;
                                                setVariants(newVariants);
                                            }}
                                            className="hidden"
                                        />
                                    </div>
                                )}

                            </span>
                        ))}

                        {/* Inline Add Input */}

                    </div>
                    <input
                        type="text"
                        placeholder="Type..."
                        value={variant.curentOption}
                        onChange={(e) => {
                            const newVariants = [...Variants];
                            newVariants[index].curentOption = e.target.value;
                            setVariants(newVariants);
                        }}
                        className={`px-3 mt-2 py-1 text-sm border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 outline-none ${err && variant.options.length === 0 && "border-red-500 focus:ring-red-500"}`}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                const newVariants = [...Variants];
                                if (variant.curentOption.trim()) {
                                    newVariants[index].options.push(
                                        variant.type === "color"
                                            ? { name: newVariants[index].curentOption, color: "#fff" }
                                            : { name: newVariants[index].curentOption }
                                    );
                                    newVariants[index].curentOption = "";
                                    setVariants(newVariants);
                                }
                            }
                        }}
                    />
                </form>

            ))}
        </div>
    )
}


export default VariantsContainer