import { useState, useContext, useEffect } from 'react';
import Sidebar from './Sidebar';
import '../../Assests/css/dashboard.css';
import { UserContext } from '../../../../UserContext';
import { useNavigate } from 'react-router-dom';
import Playground from '../Playground/Playground';
import Arena from '../Arena/Arena';
import ProblemsPage from '../Arena/ProblemsPage';
import Header from './Header';
import CookieCardPage from '../Battleground/CookieCardPage';
import SubmissionForm from './SubmissiomForm';
import ContestForm from './ConsestForm';

function Combine() {
  const { auth, setIsProfUpdated, user, setDepartment, setYear} = useContext(UserContext);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
  const [activeItem, setActiveItem] = useState('Dashboard');
  const navigate= useNavigate();
  
  const [jwtToken, setJwtToken] = useState(localStorage.getItem('jwtToken'));
  const [tokenExpiration, setTokenExpiration] = useState(localStorage.getItem('tokenExpiration'));
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail'));

  useEffect(() => {
    const checkAuth = () => {
      if (userRole !== 'user' || !jwtToken || Date.now() > tokenExpiration) {
        navigate('/login');
      }
    };
    checkAuth();
    const intervalId = setInterval(checkAuth, 20000);
    return () => clearInterval(intervalId);
  }, [userRole, jwtToken, tokenExpiration, navigate]);


  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  useEffect(() => {
    if (activeItem === 'Dashboard') {
      setOpenSidebarToggle(true); 
    } else {
      setOpenSidebarToggle(false); 
    }
  }, [activeItem]);

  return (
    <div className={`combinelay ${openSidebarToggle ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className='grid-container'>
        <Sidebar 
          openSidebarToggle={openSidebarToggle} 
          setActiveItem={setActiveItem} 
          activeItem={activeItem} 
        />
        <div className='main-content'>
          <Header OpenSidebar={OpenSidebar} openSidebarToggle={openSidebarToggle} />
          {activeItem === 'Dashboard' && <></>}
          {activeItem === 'Playground' && <Playground  />}
          {activeItem === 'Arena' && <ProblemsPage OpenSidebar={OpenSidebar}/>}
          {activeItem === 'Battleground' && <CookieCardPage/>}
          {activeItem === 'Contribute Question' && <SubmissionForm/>}
          {activeItem === 'Create Contest' && <ContestForm/>}
          {activeItem !== 'Dashboard' && <div></div>}

        </div>
      </div>
    </div>
  );
}

export default Combine;
