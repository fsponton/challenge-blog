import React from 'react';

interface PostCardProps {
    post: {
        id: string;
        title: string;
        content: string;
        createdAt: string;
        updatedAt: string;
        creator: { id: string; email: string };
    };
    currentUserId: string;
    onEdit: (postId: string) => void;
    onDelete: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, currentUserId, onEdit, onDelete }) => {
    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-sm font-semibold text-blue-500">{post.creator.email}</h3>
            <div className="flex justify-between items-center">
                <h3 className="text-3xl font-semibold text-gray-100">{post.title}</h3>
                <h3 className="text-sm font-semibold text-gray-500">id: {post.id}</h3>
            </div>
            <h5 className="text-sm font-semibold text-gray-500">Creación: {post.createdAt}</h5>
            <h5 className="text-sm font-semibold text-gray-500">Última Edición: {post.updatedAt}</h5>
            <p>{post.content}</p>
            <div className="flex justify-between mt-4">
                {post.creator?.id === currentUserId && (
                    <>
                        <button
                            onClick={() => onEdit(post.id)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => onDelete(post.id)}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                            Eliminar
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default PostCard;
