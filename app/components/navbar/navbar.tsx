import Image from "next/image";
import styles from "./Navbar.module.css";
import icon from "./GrayIcon.svg";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      {/* Logo a la izquierda */}
      <div className={styles.logo}>
        <a href="#">
          <Image src={icon} alt="Home" width={64} height={64} />
        </a>
      </div>

      {/* Secciones centradas */}
      <ul className={styles.navList}>
        <li><a href="#">Sobre Nosotros</a></li>
        <li><a href="#">Habitaciones</a></li>
        <li><a href="#">Página</a></li>
        <li><a href="#">Reservas</a></li>
      </ul>

      {/* Botón Contacto a la derecha */}
      <button className={styles.contactButton}>Contacto</button>
    </nav>
  );
}
