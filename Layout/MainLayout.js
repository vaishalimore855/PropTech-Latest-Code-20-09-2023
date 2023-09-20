import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/Sidebar/Sidebar';
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBQ8OY_ywbcak88FtstwOW61O1hUJ8xGCk&libraries=places"></script>

const MainLayout = () => (
  <div>
    <Sidebar />
    <Outlet />
  </div>
);

export default MainLayout