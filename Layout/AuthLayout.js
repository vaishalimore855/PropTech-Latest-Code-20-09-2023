import { Outlet } from 'react-router-dom';
import Login from '../Components/auth/login';


const AuthLayout = () => (
  <div>
  
    <Outlet />
  </div>
);

export default AuthLayout