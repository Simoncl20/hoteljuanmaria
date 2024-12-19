import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";
import icon from "./GrayIcon.svg";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      {/* Logo a la izquierda */}
      <div className={styles.logo}>
        <Link href="#">
          <Image src={icon} alt="Home" width={64} height={64} />
        </Link>
      </div>

      {/* Secciones centradas */}
      <ul className={styles.navList}>
        <li><Link href="#">Sobre Nosotros</Link></li>
        <li><Link href="#">Habitaciones</Link></li>
        <li><Link href="#">Página</Link></li>
        <li><Link href="#">Reservas</Link></li>
      </ul>

      {/* Botón Contacto a la derecha */}
      <button className={styles.contactButton}>Contacto</button>
    </nav>
  );
}
