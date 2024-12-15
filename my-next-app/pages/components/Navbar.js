import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{ padding: '1rem', color: 'white', textAlign: 'center', marginTop: "-32px", marginLeft: "16rem" }}>
      <Link href="/dashboard" style={{ marginRight: '15px',  fontWeight:"bolder", color: "#FFF", textDecoration: 'none' }}>Dashboard</Link>
      <Link href="/about" style={{ marginRight: '15px',  fontWeight:"bolder", color: "#FFF", textDecoration: 'none' }}>About</Link>
      <Link href="/contactus" style={{  color: "#FFF", fontWeight:"bolder", textDecoration: 'none' }}>Contact US</Link>
    </nav>
  );
}
