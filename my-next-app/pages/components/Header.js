
import { useRouter } from 'next/router';
import { useAuth } from '../Context/AuthContext';
import Navbar from './Navbar';

export default function Header() {
  const router = useRouter();
  const {removeLoginData} = useAuth();
  return (
    <div style={{ backgroundColor: "#45645a", color: "#FFF", height: "40px", display: "flex", padding: "15px 6px 0px 12px" }}>
      <div style={{ width: "70%", fontWeight: "bold", textAlign: "left", justifyContent: "flex-start" }}>
        My Application
        <Navbar />
      </div>
      <div style={{ width: "30%", textAlign: "right", justifyContent: "flex-end" }}>
        <button style={{fontWeight: "bold", backgroundColor: "rgb(69, 100, 90)"}} className="btnClass" href="#" onClick={() => {
          localStorage.removeItem('user');
          removeLoginData();
          router.push('/login');
        }}>Logout</button>
      </div>
    </div>
  );
}
