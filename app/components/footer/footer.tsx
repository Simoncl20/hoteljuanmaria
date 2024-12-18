
import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h2 className={styles.title}>Hotel Juan María</h2>
          <p className={styles.subtitle}>Mejorando Momentos</p>
          <p className={styles.description}>
            Asegurando tu felicidad: la satisfacción de nuestros huéspedes es lo primero, superando siempre las expectativas.
          </p>
          <div className={styles.social}>
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-twitter"></i>
            <i className="fa-brands fa-youtube"></i>
            <i className="fa-solid fa-phone"></i>
          </div>
        </div>

        <div className={styles.linksSection}>
          <div className={styles.column}>
            <h3>Empresa</h3>
            <ul>
              <li>Inicio</li>
              <li>Sobre Nosotros</li>
              <li>Habitaciones</li>
              <li>Servicios</li>
              <li>Paquetes</li>
            </ul>
          </div>

          <div className={styles.column}>
            <h3>Enlaces Útiles</h3>
            <ul>
              <li>Blog</li>
              <li>Personal</li>
              <li>Preguntas Frecuentes</li>
              <li>Testimonios</li>
              <li>Reservas</li>
            </ul>
          </div>

          <div className={styles.column}>
            <h3>Contacto</h3>
            <ul>
              <li>info@hotelresort.com</li>
              <li>+32466699900</li>
              <li>Jl Nuansa Anyelir, Ubud</li>
              <li>Memory, NY 9066</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
