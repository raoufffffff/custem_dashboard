import { useState } from 'react'
import BoxCard from '../../CustomUi/BoxCard'
import Model from '../../CustomUi/Model'
import { Loader2, Plus } from 'lucide-react'
import { BiSolidError } from "react-icons/bi";
import { RxDragHandleDots2 } from "react-icons/rx";
import { AiTwotoneEdit } from "react-icons/ai";
import { FaRegTrashAlt } from 'react-icons/fa';
import {
    DndContext,
    closestCenter,
    useSensor,
    useSensors,
    MouseSensor,
    TouchSensor
} from "@dnd-kit/core";
import { useTranslation } from 'react-i18next';

import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Empty from '../../CustomUi/Empty';
import UseUpdateStore from '../../hooks/UseUpdateStore';
import toast from 'react-hot-toast';
import useUser from '../../hooks/useUser';

const UpdateFaqs = () => {

    const { website, repoName, loading: userLoading } = useUser();
    if (userLoading) {
        return (
            <div className="flex justify-center py-10">
                <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
            </div>
        );
    }
    return (
        <div className='w-full'>
            {/* Add/Edit Modal */}
            <FaqComponent
                website={website}
                repoName={repoName}
            />
        </div>
    )
}

const FaqComponent = ({ website, repoName }) => {
    const { t } = useTranslation("store");

    const { loading, UpdateStore } = UseUpdateStore()
    const [faqs, setfaqs] = useState(website.faqs || [])
    const [faq, setfaq] = useState({ question: "", answer: "", id: null })
    const [err, seterr] = useState(false)
    const [show, setshow] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [change, SetChange] = useState(false)

    // delete modal state
    const [deleteTarget, setDeleteTarget] = useState(null)

    const hide = () => {
        setshow(false)
        setfaq({ question: "", answer: "", id: null })
        setIsEditing(false)
    }

    const handleSave = () => {
        if (faq.question.trim().length < 5 || faq.answer.trim().length < 5) {
            seterr(true)
            return
        }
        seterr(false)
        SetChange(true)
        if (isEditing) {
            setfaqs(faqs.map(f => f.id === faq.id ? faq : f))
        } else {
            setfaqs([...faqs, { ...faq, id: Date.now().toString() }])
        }
        hide()
    }
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 5, // start drag after 5px move
        },
    });

    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 200,
            tolerance: 5,
        },
    });

    const sensors = useSensors(mouseSensor, touchSensor);

    const handleDragEnd = (event) => {
        const { active, over } = event
        if (!over || active.id === over.id) return
        const oldIndex = faqs.findIndex(f => f.id === active.id)
        const newIndex = faqs.findIndex(f => f.id === over.id)
        setfaqs(arrayMove(faqs, oldIndex, newIndex))
    }
    const confirmDelete = () => {
        setfaqs(faqs.filter(f => f.id !== deleteTarget))
        setDeleteTarget(null)
    }

    const handleEdit = (data) => {
        setfaq(data)
        setIsEditing(true)
        setshow(true)
    }



    return (
        <>
            {show && <Model onclose={hide} classname={"p-4 relative"}>
                <p className='font-medium'>{isEditing ? "Edit FAQ" : "Add a question and answer"}</p>
                <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => setfaq({ ...faq, question: e.target.value })}
                    placeholder="question"
                    className={`w-full mt-3 px-3 py-2 border rounded-lg border-gray-300 focus:outline-none ${err && faq.question.length < 5 && "border-red-500"}`}
                />
                {err && faq.question.length < 5 && (
                    <div className="bg-red-100 rounded-lg flex items-center px-2 py-1.5 mt-1.5 text-red-500">
                        <BiSolidError className='mr-2' />
                        {t("faqsErr")}
                    </div>
                )}
                <textarea
                    rows={4}
                    value={faq.answer}
                    onChange={(e) => setfaq({ ...faq, answer: e.target.value })}
                    placeholder="answer ...."
                    className={`w-full mt-3 px-3 py-2 border rounded-lg border-gray-300 focus:outline-none ${err && faq.answer.length < 5 && "border-red-500"}`}
                />
                {err && faq.answer.length < 5 && (
                    <div className="bg-red-100 rounded-lg flex items-center px-2 py-1.5 my-1.5 text-red-500">
                        <BiSolidError className='mr-2' />
                        {t("faqsErr")}
                    </div>
                )}
                <button
                    onClick={handleSave}
                    className='w-full bg-teal-600 text-white px-4 py-2 rounded-xl shadow-teal-700 hover:bg-teal-700 transition'
                >
                    {isEditing ? "Update" : "Save"}
                </button>
            </Model>}

            {/* Delete Confirm Modal */}
            {deleteTarget && (
                <Model onclose={() => setDeleteTarget(null)} classname={"p-5 relative"}>
                    <p className="text-lg font-semibold mb-4">{t("deletefaq")}</p>
                    <div className="flex gap-3 justify-end">
                        <button
                            onClick={() => setDeleteTarget(null)}
                            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={confirmDelete}
                            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </div>
                </Model>
            )}

            <BoxCard about={"Frequently Asked Questions"} small={true} className={`py-1`}>
                <p className='text-sm text-gray-600'>
                    {t("faqtext")}
                </p>
                <button
                    onClick={() => setshow(true)}
                    className='w-fit my-3 bg-teal-600 text-white px-3 py-2 rounded-lg text-sm shadow-teal-700 hover:bg-teal-700 transition flex items-center'
                >
                    {t("Add")}
                    <Plus className='ml-2 ' size={20} />
                </button>

                <div className='w-[95%] mx-auto border-t border-t-gray-300'>
                    {faqs.length === 0 ? <Empty /> : (
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext items={faqs.map(f => f.id)} strategy={verticalListSortingStrategy}>
                                <div className='mt-3'>
                                    {faqs.map((faq) => (
                                        <SortableFaq
                                            key={faq.id}
                                            data={faq}
                                            onEdit={() => handleEdit(faq)}
                                            onDelete={() => setDeleteTarget(faq.id)}
                                        />
                                    ))}
                                </div>
                            </SortableContext>
                        </DndContext>
                    )}
                </div>

                <div className='mt-5 flex justify-end'>
                    <button
                        onClick={() => {
                            if (change) {
                                UpdateStore({
                                    ...website,
                                    repoName: repoName,
                                    faqs: faqs
                                })
                                return
                            }
                            toast.error("upload your logo")

                        }}
                        className='w-full bg-teal-600 text-white px-4 py-2 rounded-xl shadow-teal-700 hover:bg-teal-700 transition'
                    >
                        {loading ? <Loader2 className="animate-spin mx-auto h-8 w-8 " /> :
                            t("Save")}
                    </button>
                </div>
            </BoxCard>
        </>
    )
}

const SortableFaq = ({ data, onEdit, onDelete }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: data.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className='rounded-xl flex my-2 shadow border py-2 px-4 border-gray-300 w-full  items-center bg-white'
        >
            <RxDragHandleDots2 size={26} className='text-gray-600 mr-3 cursor-grab' />

            <div className='flex-1 relative'>
                <div
                    className='h-full w-full absolute top-0 left-0 z-[1000]'
                    {...listeners}>

                </div>
                <strong>{data.question}</strong>
                <p className='text-sm text-gray-600'>{data.answer}</p>
            </div>
            <div className='flex mr-4 justify-center items-center gap-3'>
                <AiTwotoneEdit
                    onClick={onEdit}
                    size={18}
                    className='cursor-pointer text-blue-600'
                />
                <FaRegTrashAlt
                    onClick={onDelete}
                    className='cursor-pointer text-red-600'
                    size={18}
                />
            </div>
        </div>
    )
}

export default UpdateFaqs
