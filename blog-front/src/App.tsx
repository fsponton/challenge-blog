import { useAuth } from './context/authContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'


import Login from "./pages/Login";
import Register from "./pages/Register";
import Posts from "./pages/Posts";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const { dataSession, isReady } = useAuth();

  if (!isReady) {
    return <div>Loading...</div>;
  }


  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName="dark-toast"
        className="dark-toast-body"
        closeButton={CustomCloseButton}
        progressClassName="dark-progress"
      />

      <Routes>
        <Route path="/" element={dataSession ? <Navigate to="/Posts" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </>
  )
}

export default App


const CustomCloseButton = ({ closeToast }: { closeToast?: () => void }) => (
  <button
    onClick={closeToast}
    className="custom-close-button"
    style={{
      margin: 0,
      padding: 0,
      width: '20px',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      backgroundColor: 'white',
      color: 'red',
      border: 'none',
      cursor: 'pointer',
    }}
  >
    x
  </button>
);
