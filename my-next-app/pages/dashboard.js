// pages/home.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from './components/Header';
import Navbar from './components/Navbar';
import { useAuth } from './Context/AuthContext';
import Loading from './components/Loading';
import LeftTabs from './components/Tabs/LeftTabs';

export default function DashboardPage() {
  const router = useRouter();
  const [userObj, setUserObj] = useState();
  const {user, setLoginData} = useAuth();
  const [showLoading, setShowLoading ] = useState(false);
  const [userTabs, setUserTabs] = useState([]);

  const getRolesList = (userInfo) => {
    setShowLoading(true);
        fetch('/api/getroles', {
            method: 'post',            
            body: JSON.stringify({ name: "getRoles" })
        }).then(resp => {
            if (!resp.ok) {
                throw new Error('Network response was not ok');
            }
            return resp.json();
        }).then(response => {
            if (response.success) {
                const { result } = response;
                if (result && result.length > 0) {
                  const filteredTabs = result.filter(tab =>  tab.roles.some(val => userInfo.result[0].Roles.includes(val)));
                  // debugger;
                  setUserTabs(filteredTabs);
                  setShowLoading(false);
                } else {            
                    setShowLoading(false);
                    alert("Error");
                }
            } else {
                setShowLoading(false);
            }
        }).catch(err => {
            console.log("Error =>  ", err);
            setShowLoading(false);
        })
  }

  useEffect(() => {
    if (user && user.user && user.user.isAuthenticated) {
      setUserObj(user.user);
      getRolesList(user.user);
    } else {
      let loginInfo = JSON.parse(localStorage.getItem("user"));
      if (loginInfo && loginInfo.isAuthenticated) {
        setLoginData(setLoginData);
        getRolesList(loginInfo);
        setUserObj(loginInfo);
      } else {
        router.push('/login');
      }
    }
  }, []);

  return (
    <div>
      <Header />
      {userTabs ? <LeftTabs tabs={userTabs}/> : ""}
      {showLoading ? <Loading overlay={showLoading}/> : ""}
    </div>
  );
}
