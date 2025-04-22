import { create } from "zustand";

const useAudioStore = create((set, get) => ({
    sunAudio: null,
    music: null,
    isAudioPlaying: false,

    setSunAudio: (value) => set({ sunAudio: value }),

    initMusic: () => {
        const music = new Audio("/audio/music.mp3");
        music.loop = true;
        music.volume = 0.05;

        set({ music });
    },

    play: () => {
        const sunAudio = get().sunAudio
        const music = get().music
        if (sunAudio && music) {
            sunAudio.play()
            music.play()
            set({ isAudioPlaying: true });
        }
    },

    pause: () => {
        const sunAudio = get().sunAudio
        const music = get().music
        if (sunAudio && music) {
            sunAudio.pause();
            music.pause();
            set({ isAudioPlaying: false });
        }
    },

}));

export default useAudioStore;
