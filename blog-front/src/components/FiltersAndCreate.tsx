import React from 'react';

interface FiltersAndCreateProps {
    onSortByDate: (isNewest: boolean) => void;
    onSortById: () => void;
    onCreatePost: () => void;
}

const FiltersAndCreate: React.FC<FiltersAndCreateProps> = ({
    onSortByDate,
    onSortById,
    onCreatePost,
}) => {
    return (
        <div className="w-full">
            <div className="flex space-x-4 mb-4">
                <button
                    onClick={() => onSortByDate(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Última actualización
                </button>
                <button
                    onClick={() => onSortByDate(false)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Actualización antigua
                </button>
                <button
                    onClick={onSortById}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Mayor ID
                </button>
            </div>
            <button
                onClick={onCreatePost}
                className="px-4 py-2 bg-green-500 text-white rounded-md mb-4 hover:bg-green-600"
            >
                Crear Post
            </button>
        </div>
    );
};

export default FiltersAndCreate;
