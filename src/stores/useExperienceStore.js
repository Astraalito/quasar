import { create } from "zustand";

const useExperienceStore = create((set, get) => ({

    positionXROrigin : [50, 10, 0],
    setPositionXROrigin: (newPos) => set({ positionXROrigin: newPos }),
    resetPositionXROrigin: () => set({ positionXROrigin: [50, 10, 0] }),

    rotationXROrigin: [0, Math.PI /2, 0],
    setRotationXROrigin: (newRotation) => set({ rotationXROrigin: newRotation }),
    resetRotationXROrigin: () => set({ rotationXROrigin: [0, Math.PI /2, 0] }),

    requireNewOriginPos: false,
    setRequireNewOriginPos: (value) => set({ requireNewOriginPos: value })

}));

export default useExperienceStore;