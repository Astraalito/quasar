import useAudioStore from "../stores/useAudioStore";

const MusicPlayer = () => {
    const { music, sunAudio, isAudioPlaying, play, pause } = useAudioStore();

    const toggleAudio = () => {
        if (!music || !sunAudio) return;
        isAudioPlaying ? pause() : play();
    };

    return (
        <div className="fixed bottom-3 left-4 z-50">
            <div className="relative group w-fit h-fit">
                <button
                    onClick={toggleAudio}
                    className="bg-[#262626]/90 hover:bg-[#3f3f3f] text-black p-1 rounded-full shadow-lg transition"
                    title={isAudioPlaying ? "Pause la musique" : "Joue la musique"}
                >
                    <img 
                        src={isAudioPlaying ? "/svg/speaker.svg" : "/svg/nospeaker.svg"} 
                        className="w-6 h-6" 
                        style={{
                            filter:
                            "invert(91%) sepia(4%) saturate(33%) hue-rotate(23deg) brightness(100%) contrast(93%)",
                        }} 
                    />
                </button>
            </div>
        </div>
    );
};

export default MusicPlayer;