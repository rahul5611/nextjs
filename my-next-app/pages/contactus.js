import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './Context/AuthContext';
import Header from './components/Header';
import Navbar from './components/Navbar';

export default function about() {
    const router = useRouter();
    const [userObj, setUserObj] = useState();
    const { user, setLoginData } = useAuth();

    useEffect(() => {
        if (user && user.user && user.user.isAuthenticated) {
            setUserObj(user.user);
        } else {
            let loginInfo = JSON.parse(localStorage.getItem("user"));
            if (loginInfo && loginInfo.isAuthenticated) {
                setLoginData(setLoginData);
                setUserObj(loginInfo);
            } else {
                router.push('/login');
            }
        }
    }, []);

    return (
        <div>
            <Header />
            <h1 style={{fontWeight:"bolder", color: "#b07164"}}>Welcome to Contact us Page {userObj?.result[0]?.FirstName} {userObj?.result[0]?.LastName}</h1>
        </div>
    );
}
