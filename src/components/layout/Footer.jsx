import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__quote">"Cada pieza lleva su propia intención"</p>
        <p className="footer__meta">Hecho a mano · México</p>
        <p className="footer__copy">
          © {new Date().getFullYear()} Yatzari Bisutería
        </p>
      </div>
    </footer>
  );
}
