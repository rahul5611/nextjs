import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './Context/AuthContext';
import './css/login.css';
import Loading from './components/Loading';

export default function Login() {
    const router = useRouter();
    const {setLoginData} = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showProgress, setShowProgress] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setShowProgress(true);
        fetch('/api/login', {
            method: 'post',
            body: JSON.stringify({ username, password, name: "login" })
        }).then(resp => {
            if (!resp.ok) {
                throw new Error('Network response was not ok');
            }
            return resp.json();
        }).then(response => {
            if (response.success) {
                const { result } = response;
                if (result && result.length > 0) {
                    let obj = { result, isAuthenticated: true }
                    localStorage.setItem('user', JSON.stringify(obj));
                    setLoginData(obj);
                    router.push('/dashboard');
                    setShowProgress(false);
                    resetAll();
                } else {
                    setMessage("Login Fail.");                    
                    setShowProgress(false);
                    resetAll();
                }
            } else {
                setMessage(response.message);
                setShowProgress(false);
                resetAll();
            }
        }).catch(err => {
            console.log("Error =>  ", err);
            setShowProgress(false);
            resetAll();
            setMessage(err);
        })
    };

    const resetAll = () => {
        setUsername();
        setPassword();
    }

    return (
        <div style={{ marginLeft: "35%" }}>
            <div className='login-container'>
                <h3 style={{textAlign: "center", color: "#b07164"}}>Login</h3>
                <hr/>
                <form onSubmit={handleLogin} style={{ marginTop: "30px", marginBottom: "30px" }}>
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit">Login</button>
                </form>
                <hr />
                <div style={{textAlign: "center", fontWeight: "bold"}}><a style={{ color: "#b07164" }} href='#' onClick={() => { router.push("/register") }}>Register New</a></div>
                {message ? <hr /> : ""}
                <p style={{color: "#dd0d0d", textAlign: "center", fontWeight: "bold"}}>{message}</p>
            </div>
            {showProgress ? <Loading overlay={showProgress}/> : ""}
        </div>
    );
}
