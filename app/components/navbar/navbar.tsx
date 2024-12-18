import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li><a href="#">Inicio</a></li>
        <li><a href="#">Sobre Nosotros</a></li>
        <li><a href="#">Habitaciones</a></li>
        <li><a href="#">Página</a></li>
        <li><a href="#">Reservas</a></li>
      </ul>
      <button className={styles.contactButton}>Contacto</button>
    </nav>
  );
}
