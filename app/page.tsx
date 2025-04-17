export default function Home() {
  return (
    <>
      {/* Contenedor principal */}
      <div
        className="bg-cover bg-center min-h-screen flex flex-col justify-center items-center text-white mt-20"
        style={{
          backgroundImage:
            'url("https://cf.bstatic.com/xdata/images/hotel/max1024x768/238142048.jpg?k=415c99445e850ef04794b0ab0668bde4c8b021c0ac9f828cf1f0263cbc2df67d&o=&hp=1")',
        }}
      >
        {/* Hero */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2 font-serif">
            Bienvenido al Hotel Juan María
          </h1>
          <p className="text-lg mt-4">
            Descubre el confort y el lujo en el mejor hotel de Tuluá
          </p>
        </div>

        {/* Prerreservas */}
        <div className="flex justify-center items-center bg-[#1b1816] w-4/5 p-6 border border-white gap-8 text-white">
          <div className="flex flex-col">
            <label className="text-base mb-2">Fecha de llegada</label>
            <input
              type="date"
              className="bg-transparent text-white border-b border-white focus:border-gray-400 text-base h-16 w-44 p-2 outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-base mb-2">Fecha de salida</label>
            <input
              type="date"
              className="bg-transparent text-white border-b border-white focus:border-gray-400 text-base h-16 w-44 p-2 outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-base mb-2">Habitaciones</label>
            <select className="bg-transparent text-white border-b border-white focus:border-gray-400 text-base h-16 w-44 p-2 outline-none">
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-base mb-2">Huéspedes</label>
            <select className="bg-transparent text-white border-b border-white focus:border-gray-400 text-base h-16 w-44 p-2 outline-none">
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
          <button className="bg-transparent border border-white text-white text-base font-medium px-5 py-3 w-44 h-14 transition-all duration-300 hover:bg-white hover:text-black">
            Ver Disponibilidad
          </button>
        </div>
      </div>
    </>
  );
}
