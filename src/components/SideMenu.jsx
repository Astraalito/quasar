import usePlanetStore from "../stores/usePlanetStore";
import planetData from "./../data/planetData";

const SideMenu = () => {
  const { planetTarget, resetPlanetTarget } = usePlanetStore();

  if (!planetTarget) return null;

  const planet = planetData[planetTarget];

  return (
    <div className={`block top-0 left-0 h-full bg-zinc-900 text-white shadow-lg z-50 w-[30vw] overflow-y-auto transition-all duration-500`}>

      {/* Image + Titre */}
      <div className="relative h-[200px] w-full">
      {/* Bouton retour */}
      <div className="absolute top-4 left-4 z-10">
        <button onClick={resetPlanetTarget} className="p-2">
          <img 
            src="/svg/arrow-left.svg" 
            alt="Retour" 
            className="w-6 h-6 invert"
          />
        </button>
      </div>

      {/* Image de la planète */}
      <img
        src={planet.image}
        alt={planet.name}
        className="w-full h-full object-cover"
      />

      {/* Dégradé du bas vers le haut */}
      <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

      {/* Titre de la planète */}
      <h2 className="absolute bottom-4 left-4 text-3xl font-semibold capitalize px-3 py-1 rounded text-white z-10" style={{fontFamily: "Montserrat, sans-serif"}}>
        {planet.name}
      </h2>
    </div>

      {/* Informations */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="font-semibold text-lg">Taille</h3>
          <p className="text-sm text-zinc-300">{planet.taille}</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg">Durée d'une journée</h3>
          <p className="text-sm text-zinc-300">{planet.jour}</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg">Révolution autour du Soleil</h3>
          <p className="text-sm text-zinc-300">{planet.revolution}</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg">Composition principale</h3>
          <p className="text-sm text-zinc-300">{planet.composition}</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg">Température</h3>
          <p className="text-sm text-zinc-300">{planet.temperature}</p>
        </div>

        {/* Description */}
        <div className="space-y-4 pt-4 text-sm text-zinc-300">
            {planet.description.map( (paragraph) => {
                return <p>
                    {paragraph}
                </p>
            })}
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
