import usePlanetStore from "../stores/usePlanetStore";

const Overlay = () => {

  const { viewTarget } = usePlanetStore()

    return (
      <header className="absolute top-0 left-0 w-full flex justify-between items-center px-6 py-4 z-50 bg-transparent">
        {/* Logo */}
        <div className="text-white text-2xl font-bold tracking-wide flex items-center ">
            <img src="/img/logo.png" alt="Logo" className="h-8 w-auto object-contain select-none" />
        </div>
  
        {/* Hamburger */}
        {/* <button className="flex flex-col justify-center items-center space-y-1 group">
          <span className="w-6 h-0.5 bg-white transition-all duration-300 group-hover:w-7"></span>
          <span className="w-6 h-0.5 bg-white transition-all duration-300 group-hover:w-7"></span>
          <span className="w-6 h-0.5 bg-white transition-all duration-300 group-hover:w-7"></span>
        </button> */}
      </header>
    );
  }

export default Overlay