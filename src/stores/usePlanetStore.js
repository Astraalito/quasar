import { create } from "zustand";

const usePlanetStore = create((set, get) => ({

    hoveredPlanet: null,
    setHoveredPlanet: (name) => set({ hoveredPlanet: name }),
    clearHoveredPlanet: () => set({ hoveredPlanet: null }),

    viewTarget: [0, 0, 0],
    setViewTarget: (position) => set({ viewTarget: position }),
    resetViewTarget: () => set({ viewTarget: [0, 0, 0] }),

    planetTarget: null,
    setPlanetTarget: (planetName) => set({ planetTarget: planetName }),
    resetPlanetTarget: () => {
        set({ planetTarget: null });
        setTimeout(set({ viewTarget: [0, 0, 0] }), 2000);
    },

}));

export default usePlanetStore;