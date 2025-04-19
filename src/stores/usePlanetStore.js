import gsap from "gsap";
import { create } from "zustand";

const usePlanetStore = create((set, get) => ({

    hoveredPlanet: null,
    setHoveredPlanet: (name) => set({ hoveredPlanet: name }),
    clearHoveredPlanet: () => set({ hoveredPlanet: null }),

    viewTarget: [0, 0, 0],
    setViewTarget: (position) => set({ viewTarget: position }),
    resetViewTarget: () => set({ viewTarget: [0, 0, 0] }),

    planetTarget: null,
    setPlanetTarget: (planetName) => {
        set({ planetTarget: planetName })
        const proxy = { value: get().planetDistanceMultiplier }
        gsap.to(proxy, { 
            value: 2,
            duration: 0.5,
            ease: "power2.out",
            onUpdate: () => get().setPlanetDistanceMultiplier(proxy.value)
        });
        
    },
    resetPlanetTarget: () => {
        set({ planetTarget: null });
        const proxy = { value: get().planetDistanceMultiplier }
        gsap.to(proxy, { 
            value: 1,
            duration: 0.5,
            ease: "power2.out",
            onUpdate: () => get().setPlanetDistanceMultiplier(proxy.value)
        });
    },

    planetDistanceMultiplier: 1,
    setPlanetDistanceMultiplier: (value) => set({ planetDistanceMultiplier: value }),
    resetPlanetDistanceMultiplier: () => set({ planetDistanceMultiplier: 1 }),
}));

export default usePlanetStore;