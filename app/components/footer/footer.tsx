const Footer = () => {
  return (
    <footer className="bg-[#1b1816] text-white py-8 px-4 font-sans">
      <div className="flex flex-wrap justify-between">
        {/* Logo y descripción */}
        <div className="flex-1 mr-8">
          <h2 className="text-2xl font-bold mb-2">Hotel Juan María</h2>
          <p className="text-lg mb-4">Mejorando Momentos</p>
          <p className="text-sm leading-relaxed mb-6">
            Asegurando tu felicidad: la satisfacción de nuestros huéspedes es lo primero, superando siempre las expectativas.
          </p>
          <div className="flex space-x-4 text-xl">
            <i className="fa-brands fa-facebook cursor-pointer"></i>
            <i className="fa-brands fa-twitter cursor-pointer"></i>
            <i className="fa-brands fa-youtube cursor-pointer"></i>
            <i className="fa-solid fa-phone cursor-pointer"></i>
          </div>
        </div>

        {/* Enlaces de la empresa */}
        <div className="flex flex-2 justify-between space-x-8">
          <div>
            <h3 className="text-lg mb-4">Empresa</h3>
            <ul className="list-none m-0 p-0">
              <li className="text-sm mb-2 cursor-pointer hover:underline">Inicio</li>
              <li className="text-sm mb-2 cursor-pointer hover:underline">Sobre Nosotros</li>
              <li className="text-sm mb-2 cursor-pointer hover:underline">Habitaciones</li>
              <li className="text-sm mb-2 cursor-pointer hover:underline">Servicios</li>
              <li className="text-sm mb-2 cursor-pointer hover:underline">Paquetes</li>
            </ul>
          </div>

          {/* Enlaces útiles */}
          <div>
            <h3 className="text-lg mb-4">Enlaces Útiles</h3>
            <ul className="list-none m-0 p-0">
              <li className="text-sm mb-2 cursor-pointer hover:underline">Blog</li>
              <li className="text-sm mb-2 cursor-pointer hover:underline">Personal</li>
              <li className="text-sm mb-2 cursor-pointer hover:underline">Preguntas Frecuentes</li>
              <li className="text-sm mb-2 cursor-pointer hover:underline">Testimonios</li>
              <li className="text-sm mb-2 cursor-pointer hover:underline">Reservas</li>
            </ul>
          </div>

          {/* Información de contacto */}
          <div>
            <h3 className="text-lg mb-4">Contacto</h3>
            <ul className="list-none m-0 p-0">
              <li className="text-sm mb-2">info@hotelresort.com</li>
              <li className="text-sm mb-2">+32466699900</li>
              <li className="text-sm mb-2">Jl Nuansa Anyelir, Ubud</li>
              <li className="text-sm mb-2">Memory, NY 9066</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
