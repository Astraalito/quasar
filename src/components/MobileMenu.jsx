import { useState } from "react";
import usePlanetStore from "../stores/usePlanetStore";
import planetData from "./../data/planetData";

const MobileMenu = () => {
  const { planetTarget, resetPlanetTarget } = usePlanetStore();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!planetTarget) return null;

  const planet = planetData[planetTarget];

  return (
    <div
      className={`fixed bottom-0 left-0 w-full z-50 bg-zinc-900 text-white transition-all duration-500 ease-in-out shadow-lg rounded-t-2xl overflow-hidden 
        ${isExpanded ? "h-full" : "h-[100px]"}`}
    >
      {/* Shrinked Header */}
        {!isExpanded && (
        <div className="relative h-full w-full">
            {/* Image de fond */}
            <img
            src={planet.image}
            alt={planet.name}
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            />

            {/* Dégradé sombre pour lisibilité */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />

            {/* Contenu */}
            <div className="relative z-20 flex items-center justify-between px-4 h-full">
            <h2 className="text-xl font-semibold capitalize">{planet.name}</h2>
            <button onClick={() => setIsExpanded(true)} className="p-2">
                <img
                src="/svg/chevron.svg"
                alt="Ouvrir"
                className="w-6 h-6 invert rotate-180"
                />
            </button>
            </div>
        </div>
        )}

      {/* Expanded View */}
      {isExpanded && (
        <div className="flex flex-col h-full">
          {/* Image + Titre + Boutons */}
          <div className="relative h-[200px] w-full">
            {/* Bouton retour */}
            <div className="absolute top-4 left-4 z-10">
              <button onClick={ () => {
                    resetPlanetTarget
                    setIsExpanded(false)
                } } className="p-2">
                <img
                  src="/svg/arrow-left.svg"
                  alt="Retour"
                  className="w-6 h-6 invert"
                />
              </button>
            </div>

            {/* Bouton réduire */}
            <div className="absolute top-4 right-4 z-10">
              <button onClick={() => setIsExpanded(false)} className="p-2">
              <img
                src="/svg/chevron.svg"
                alt="Ouvrir"
                className="w-6 h-6 invert"
                />
              </button>
            </div>

            {/* Image planete */}
            <img
              src={planet.image}
              alt={planet.name}
              className="w-full h-full object-cover"
            />

            {/* Dégradé */}
            <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

            {/* Titre */}
            <h2
              className="absolute bottom-4 left-4 text-3xl font-semibold capitalize z-10"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {planet.name}
            </h2>
          </div>

          {/* Infos */}
          <div className="p-6 overflow-y-auto space-y-4">
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
              {planet.description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;