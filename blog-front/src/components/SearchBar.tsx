import React from 'react';

interface SearchBarProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder }) => {
    return (
        <div className="w-full mb-4">
            <input
                type="text"
                placeholder={placeholder || "Buscar..."}
                value={value}
                onChange={onChange}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
};

export default SearchBar;