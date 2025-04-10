import { create } from "zustand";

const usePlanetStore = create((set) => ({

    hoveredPlanet: null,
    setHoveredPlanet: (name) => set({ hoveredPlanet: name }),
    clearHoveredPlanet: () => set({ hoveredPlanet: null }),

    viewTarget: [0, 0, 0],
    setViewTarget: (position) => set({ viewTarget: position }),
    resetViewTarget: () => set({ viewTarget: [0, 0, 0] }),

    planetTarget: null,
    setPlanetTarget: (planetName) => set({ planetTarget: planetName }),
    resetPlanetTarget: () => set({ planetTarget: null }),

}));

export default usePlanetStore;