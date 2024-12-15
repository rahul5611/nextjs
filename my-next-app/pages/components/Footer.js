const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <p>&copy; {new Date().getFullYear()} My Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: 'rgb(69, 100, 90)',
  color: '#fff',
  padding: '0.5px 0',
  textAlign: 'center',
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 20px',
};


export default Footer;
