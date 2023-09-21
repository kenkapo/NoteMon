import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { stateloggedInUser } from "../Slices/AuthSlice";

function Protected({ children }) {
  const user = useSelector(stateloggedInUser);
  if (!user) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  return children;
}

export default Protected;