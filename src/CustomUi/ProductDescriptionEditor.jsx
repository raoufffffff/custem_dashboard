import { useEffect, useRef, useState } from "react";

export default function ProductDescriptionEditor({
    placeholder = "Type your product description…",
    value,
    onChange,
}) {
    const editorRef = useRef(null);
    const [html, setHtml] = useState(value || "");

    useEffect(() => {
        if (value !== undefined) setHtml(value);
    }, [value]);

    const update = () => {
        const newHtml = editorRef.current?.innerHTML || "";
        setHtml(newHtml);
        if (onChange) onChange(newHtml);
    };

    const exec = (cmd, val) => {
        editorRef.current?.focus();
        document.execCommand(cmd, false, val || "");
        update();
    };

    const setBlock = (tag) => {
        const map = {
            p: "<p>",
            h1: "<h1>",
            h2: "<h2>",
            h3: "<h3>",
            blockquote: "<blockquote>",
            pre: "<pre>",
        };
        exec("formatBlock", map[tag]);
    };

    const createLink = () => {
        const url = prompt("Enter the URL:");
        if (!url) return;
        const safe = url.startsWith("http") ? url : `https://${url}`;
        exec("createLink", safe);
    };

    // Handle all input events including deletion
    const handleInput = () => {
        update();
    };

    // Handle all key events including deletion
    const handleKeyDown = (e) => {
        // Allow default behavior for all keys (including delete/backspace)
        // We'll update the content in handleInput which fires after
    };

    return (
        <div className="w-full">


            <div className="rounded-xl border border-gray-300 overflow-hidden bg-white">
                {/* Toolbar */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 flex-wrap gap-1">
                    <div className="flex items-center gap-2 flex-wrap">
                        {/* Bold */}
                        <button
                            type="button"
                            onClick={() => exec("bold")}
                            className="px-2 py-1 rounded hover:bg-gray-100 font-bold"
                        >
                            B
                        </button>

                        {/* Italic */}
                        <button
                            type="button"
                            onClick={() => exec("italic")}
                            className="px-2 py-1 rounded hover:bg-gray-100 italic"
                        >
                            I
                        </button>

                        {/* Underline */}
                        <button
                            type="button"
                            onClick={() => exec("underline")}
                            className="px-2 py-1 rounded hover:bg-gray-100 underline"
                        >
                            U
                        </button>

                        {/* Strikethrough */}
                        <button
                            type="button"
                            onClick={() => exec("strikeThrough")}
                            className="px-2 py-1 rounded hover:bg-gray-100 line-through"
                        >
                            S
                        </button>

                        {/* Link */}
                        <button
                            type="button"
                            onClick={createLink}
                            className="px-2 py-1 rounded hover:bg-gray-100"
                        >
                            🔗
                        </button>

                        {/* Lists */}
                        <button
                            type="button"
                            onClick={() => exec("insertUnorderedList")}
                            className="px-2 py-1 rounded hover:bg-gray-100"
                        >
                            ••
                        </button>
                        <button
                            type="button"
                            onClick={() => exec("insertOrderedList")}
                            className="px-2 py-1 rounded hover:bg-gray-100"
                        >
                            1.
                        </button>

                        {/* Alignment */}
                        <button
                            type="button"
                            onClick={() => exec("justifyLeft")}
                            className="px-2 py-1 rounded hover:bg-gray-100"
                        >
                            ⬅
                        </button>
                        <button
                            type="button"
                            onClick={() => exec("justifyCenter")}
                            className="px-2 py-1 rounded hover:bg-gray-100"
                        >
                            ⬌
                        </button>
                        <button
                            type="button"
                            onClick={() => exec("justifyRight")}
                            className="px-2 py-1 rounded hover:bg-gray-100"
                        >
                            ➡
                        </button>

                        {/* Quote / Code */}
                        <button
                            type="button"
                            onClick={() => setBlock("blockquote")}
                            className="px-2 py-1 rounded hover:bg-gray-100"
                        >
                            “”
                        </button>
                        <button
                            type="button"
                            onClick={() => setBlock("pre")}
                            className="px-2 py-1 rounded hover:bg-gray-100"
                        >
                            {"</>"}
                        </button>

                        {/* Colors */}
                        <label className="px-2 py-1 rounded hover:bg-gray-100">
                            <input
                                type="color"
                                className="w-5 h-5 cursor-pointer"
                                onChange={(e) => exec("foreColor", e.target.value)}
                            />
                        </label>
                        <label className="px-2 py-1 rounded hover:bg-gray-100">
                            <input
                                type="color"
                                className="w-5 h-5 cursor-pointer"
                                onChange={(e) => exec("hiliteColor", e.target.value)}
                            />
                        </label>

                        {/* Clear */}
                        <button
                            type="button"
                            onClick={() => exec("removeFormat")}
                            className="px-2 py-1 rounded hover:bg-gray-100"
                        >
                            ⌫
                        </button>
                    </div>

                    {/* Heading dropdown */}
                    <select
                        onChange={(e) => setBlock(e.target.value)}
                        defaultValue="p"
                        className="text-sm text-gray-600 bg-transparent outline-none"
                    >
                        <option value="p">Normal</option>
                        <option value="h1">H1</option>
                        <option value="h2">H2</option>
                        <option value="h3">H3</option>
                    </select>
                </div>

                {/* Editable area */}
                <div className="relative">
                    <div
                        ref={editorRef}
                        className="min-h-[180px] px-4 py-3 outline-none"
                        contentEditable
                        suppressContentEditableWarning
                        onInput={handleInput}
                        onKeyDown={handleKeyDown}
                        onBlur={update}
                        dangerouslySetInnerHTML={{ __html: html }}
                        data-placeholder={placeholder}
                    />
                    {/* Placeholder style */}
                    <style>{`
            [contenteditable][data-placeholder]:empty:before {
              content: attr(data-placeholder);
              color: #9CA3AF; /* gray-400 */
              pointer-events: none;
              position: absolute;
              left: 1rem;
            }
          `}</style>
                </div>
            </div>
        </div>
    );
}