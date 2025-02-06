import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import { useAuth } from '../context/authContext';
import { FiltersAndCreate, PostCard, PostModal, SearchBar } from "@/components";


const Posts = () => {
    const [data, setData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState({ create: false, edit: false });
    const [editPost, setEditPost] = useState({ id: '', title: '', content: '' });
    const [newPost, setNewPost] = useState({ title: '', content: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [errors, setErrors] = useState({ title: '', content: '' });

    const { dataSession, logout } = useAuth();
    const navigate = useNavigate();

    const isFormInvalid = () => {
        return Object.values(errors).some(error => error !== '') ||
            (isModalOpen.create && (!newPost.title || !newPost.content)) ||
            (isModalOpen.edit && (!editPost.title || !editPost.content));
    };

    const fetchPosts = async () => {
        try {
            const response = await apiService('/posts', {}, 'post', dataSession.token);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        if (!dataSession) {
            navigate('/login');
        }
        fetchPosts();
    }, [dataSession, navigate]);

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredData(data);
        } else {
            const filtered = data.filter(post => {
                const lowerCaseSearchTerm = searchTerm.toLowerCase();
                return (
                    post.title.toLowerCase().includes(lowerCaseSearchTerm) ||
                    post.content.toLowerCase().includes(lowerCaseSearchTerm) ||
                    post.id.toString().includes(lowerCaseSearchTerm)
                );
            });
            setFilteredData(filtered);
        }
    }, [searchTerm, data]);

    const handleEdit = async (postId: string) => {
        const post = data.find(p => p.id === postId);
        if (post) {
            setEditPost(post);
            setIsModalOpen({ ...isModalOpen, edit: true });
        }
    };

    const handleSave = async () => {
        try {
            const postData = {
                title: editPost.title,
                content: editPost.content
            }
            await apiService(`/posts/edit/${editPost.id}`, { postData }, 'POST', dataSession.token);
            await fetchPosts();
        } catch (error) {
            console.error('Error updating post:', error);
        } finally {
            setIsModalOpen({ ...isModalOpen, edit: false });
        }
    };

    const handleCancel = () => {
        setIsModalOpen({ edit: false, create: false });
        setEditPost({ id: '', title: '', content: '' })
        setNewPost({ title: '', content: '' })
        setErrors({ title: '', content: '' })
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (isModalOpen.edit) {
            setEditPost(prevState => ({ ...prevState, [name]: value }));
        } else {
            setNewPost(prevState => ({ ...prevState, [name]: value }));
        }

        validateField(name, value);
    };

    const handleDelete = async (postId: string) => {
        try {
            const response = await apiService(`/posts/delete/${postId}`, {}, 'POST', dataSession.token);
            if (response) {
                await fetchPosts();
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleCreatePost = async () => {
        try {
            const postData = {
                title: newPost.title,
                content: newPost.content
            };

            const response = await apiService('/posts/create', postData, 'POST', dataSession.token);
            setData([...data, response.data]);

        } catch (error) {
            console.error('Error creating post:', error);
        } finally {
            setIsModalOpen({ ...isModalOpen, create: false })
        }
    };

    const validateField = (name: string, value: string) => {
        let errorMessage = '';
        if (name === 'title') {
            errorMessage = validateTitle(value);
        } else if (name === 'content') {
            errorMessage = validateContent(value);
        }

        setErrors(prevState => ({
            ...prevState,
            [name]: errorMessage,
        }));
    };

    const handleSortByDate = (isNewest: boolean) => {
        const sortedData = [...data].sort((a, b) => {
            const dateA = new Date(a.updatedAt);
            const dateB = new Date(b.updatedAt);

            return isNewest ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
        });
        setData(sortedData);
    };

    const handleSortById = () => {
        const sortedData = [...data].sort((a, b) => b.id - a.id);
        setData(sortedData);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };


    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white">
            <h2 className="text-3xl mt-4 font-bold text-center mb-6"> Todos los Posts</h2>

            <SearchBar
                value={searchTerm}
                onChange={(e: any) => setSearchTerm(e.target.value)}
                placeholder="Buscar por título, contenido o ID"
            />

            <FiltersAndCreate
                onSortByDate={handleSortByDate}
                onSortById={handleSortById}
                onCreatePost={() => setIsModalOpen({ create: true, edit: false })}
            />


            {data.length === 0 ? (
                <p>No hay Posts</p>
            ) : (
                <div className="w-full space-y-4">
                    {filteredData.map((post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                            currentUserId={dataSession.user.id}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )
            }

            <button
                onClick={handleLogout}
                className="px-4 py-2 mt-5 bg-red-500 text-white rounded-md mb-4 hover:bg-red-600"
            >
                Logout
            </button>


            <PostModal
                isOpen={isModalOpen.create}
                title="Crear Post"
                post={newPost}
                errors={errors}
                onClose={handleCancel}
                onSubmit={handleCreatePost}
                onChange={handleChange}
                isFormInvalid={isFormInvalid()}
                submitButtonText="Crear"
            />

            <PostModal
                isOpen={isModalOpen.edit}
                title="Editar Post"
                post={editPost}
                errors={errors}
                onClose={handleCancel}
                onSubmit={handleSave}
                onChange={handleChange}
                isFormInvalid={isFormInvalid()}
                submitButtonText="Guardar"
            />

        </div >
    );
};

export default Posts;

const validateTitle = (title: string) => {
    return title.length >= 3 ? '' : 'El título debe tener al menos 3 caracteres';
};

const validateContent = (content: string) => {
    return content.length >= 10 ? '' : 'El contenido debe tener al menos 10 caracteres';
};