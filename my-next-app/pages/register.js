import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loading from './components/Loading';
import './css/register.css'

export default function Login() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [message, setMessage] = useState('');
    const [showProgress, setShowProgress] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setShowProgress(true);
        fetch('/api/register', {
            method: 'post',
            body: JSON.stringify({ username, password, firstName, lastName, name: 'addNewUser' })
        }).then(resp => {
            if (!resp.ok) {
                throw new Error('Network response was not ok');
            }
            return resp.json();
        }).then(response => {
            if (response.success) {
                const { result } = response;
                if (result) {
                    setMessage(response.message);
                    resetAll();
                    localStorage.removeItem("usertemp");
                    setShowProgress(false);
                } else {
                    setMessage("unable to insert.");
                    setShowProgress(false);
                }
            } else {
                setMessage(response.message);
                setShowProgress(false);
            }
        }).catch(err => {
            console.log("Error =>  ", err);
            setMessage(err);
            setShowProgress(false);
        })
    };

    const handleSaveTempData = () => {
        if (!firstName && !lastName && !password && !username) {
            return false;
        }
        const obj = { firstName, lastName, password, username };
        localStorage.setItem("usertemp", JSON.stringify(obj));
    }

    useEffect(() => {
        const userObj = localStorage.getItem("usertemp")
            ? JSON.parse(localStorage.getItem("usertemp")) : null;

        if (userObj) {
            setUsername(userObj.username);
            setPassword(userObj.password);
            setFirstName(userObj.firstName);
            setLastName(userObj.lastName);
        }
    }, []);

    const resetAll = () => {
        setUsername("");
        setPassword("");
        setFirstName("");
        setLastName("");
    }

    return (
        <div style={{ marginLeft: "35%" }}>
            <div className='register-container'>
                <h3 style={{ textAlign: "center", color: "#b07164" }}>Register New User</h3>
                <hr />
                <form onSubmit={handleLogin} style={{ marginTop: "30px", marginBottom: "30px" }}>
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    <input type="test" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    <div>
                        <button onClick={(e) => handleSaveTempData()}>Save Temp Data</button>
                        &nbsp;
                        <button onClick={(e) => {
                            localStorage.removeItem("usertemp");
                            resetAll();
                        }}>Clear Temp Data</button>
                    </div>
                    <div>
                        <button type="submit">Save</button>
                        &nbsp;
                        <button onClick={resetAll}>Reset All</button>
                    </div>
                    <button onClick={(e) => { router.push('/login') }}>Go to Login</button>
                </form>
                {message ? <hr /> : ""}
                <p style={{ color: "#dd0d0d", textAlign: "center", fontWeight: "bold" }}>{message}</p>
            </div>
            {showProgress ? <Loading overlay={showProgress} /> : ""}
        </div>
    );
}
