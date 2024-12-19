import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";
import icon from "./GrayIcon.svg";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 z-100 w-full h-20 bg-gray-100 border-b border-gray-300 flex justify-between items-center px-8">
      {/* Logo a la izquierda */}
      <div className="flex items-center">
        <Link href="#">
          <Image src={icon} alt="Home" width={64} height={64} />
        </Link>
      </div>

      {/* Secciones centradas */}
      <ul className="flex flex-1 justify-center items-center gap-8 list-none m-0 p-0">
        <li><Link href="#"className="text-gray-800 text-base font-medium transition-colors hover:text-gray-600"> Sobre Nosotros</Link></li>
        <li><Link href="#" className="text-gray-800 text-base font-medium transition-colors hover:text-gray-600">Habitaciones</Link></li>
        <li><Link href="#" className="text-gray-800 text-base font-medium transition-colors hover:text-gray-600">Página</Link></li>
        <li><Link href="#" className="text-gray-800 text-base font-medium transition-colors hover:text-gray-600">Reservas</Link></li>
      </ul>

      {/* Botón Contacto a la derecha */}
      <button className="bg-transparent text-gray-800 border border-gray-800 px-6 py-2 text-base font-medium cursor-pointer transition-all hover:bg-gray-800 hover:text-white">Contacto</button>
    </nav>
  );
}
