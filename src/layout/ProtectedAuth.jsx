import { Navigate } from 'react-router-dom';

const ProtectedAuth = ({ children }) => {
    const user = localStorage.getItem("user");

    if (user) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedAuth