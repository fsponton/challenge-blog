import React from 'react';

interface PostModalProps {
    isOpen: boolean;
    title: string;
    post: { title: string; content: string };
    errors: { title: string; content: string };
    onClose: () => void;
    onSubmit: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    isFormInvalid: boolean;
    submitButtonText: string;
}

const PostModal: React.FC<PostModalProps> = ({
    isOpen,
    title,
    post,
    errors,
    onClose,
    onSubmit,
    onChange,
    isFormInvalid,
    submitButtonText,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <div className="flex flex-col mb-4">
                    <label htmlFor="title" className="text-sm font-medium">Título:</label>
                    <input
                        id="title"
                        name="title"
                        value={post.title}
                        onChange={onChange}
                        className="p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="content" className="text-sm font-medium">Contenido:</label>
                    <textarea
                        id="content"
                        name="content"
                        value={post.content}
                        onChange={onChange}
                        className="p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
                </div>
                <div className="flex justify-between mt-4">
                    <button
                        onClick={onSubmit}
                        disabled={isFormInvalid}
                        className={`px-4 py-2 rounded-md transition duration-300 ${isFormInvalid ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
                            }`}
                    >
                        {submitButtonText}
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostModal;