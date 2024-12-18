import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Hero */}
      <div className={styles.heroSection}>
        <h1 className={styles.title}>Bienvenido al Hotel Juan María</h1>
        <p className={styles.subtitle}>
          Descubre el confort y el lujo en el mejor hotel de Tuluá
        </p>
      </div>

      {/* Prerreservas */}
      <div className={styles.bookingForm}>
        <div className={styles.inputContainer}>
          <label>Fecha de llegada</label>
          <input type="date" className={styles.input} />
        </div>
        <div className={styles.inputContainer}>
          <label>Fecha de salida</label>
          <input type="date" className={styles.input} />
        </div>
        <div className={styles.inputContainer}>
          <label>Habitaciones</label>
          <select className={styles.input}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
        <div className={styles.inputContainer}>
          <label>Huéspedes</label>
          <select className={styles.input}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
        <button className={styles.checkButton}>Ver Disponibilidad</button>
      </div>
    </div>
  );
}
