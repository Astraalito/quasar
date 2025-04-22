import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { createXRStore, DefaultXRHand, XR } from '@react-three/xr'
import { Experience } from "./components/Experience";
import { LeftHand } from "./components/Immersive/LeftHand";

import PlanetLoader from "./components/PlanetLoader";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import MobileMenu from "./components/MobileMenu";
import VRButton from "./components/VRButton";
import usePlanetStore from "./stores/usePlanetStore";
import useAudioStore from "./stores/useAudioStore";
import MusicPlayer from "./components/MusicPlayer";
import RightHand from "./components/Immersive/RightHand";

const store = createXRStore({
    controller: { left: LeftHand, right: RightHand },
    hand: () => {
        return <DefaultXRHand rayPointer={false} />
    }
})

function OnLoaded({ onLoad }) {
    useEffect(() => {
      onLoad();
    }, []);
    return null;
  }

function App() {
    const [isLoaded, setIsLoaded] = useState(false);

    const isMobile = window.innerWidth <= 768;

    const {setPlanetDistanceMultiplier} = usePlanetStore()
    const { initMusic, music, sunAudio, play } = useAudioStore();

    useEffect(() => {
        initMusic();
    }, []);

    const handleVRButtonClick = () => {
        setPlanetDistanceMultiplier(2)
        store.enterVR()
        if ( music && sunAudio ) {
            play();
        }
    }

    return (
        <>
            <div className="overflow-hidden">
                <div className={`flex flex-row h-screen transition-all duration-500 ease-in-out`}>
                    <Header />
                    {isLoaded && <VRButton onClick={handleVRButtonClick} />}
                    <MusicPlayer />
                    <Canvas 
                        shadows 
                        camera={{ position: [70, 5, 70], fov: 30 }}
                        gl={{ preserveDrawingBuffer: true }}
                    >
                        <color attach="background" args={["#2C2C2C"]} />
                        <Suspense fallback={<PlanetLoader />}>
                            <XR store={store}>
                                <Experience />
                                <OnLoaded onLoad={() => setIsLoaded(true)} />
                            </XR>
                        </Suspense>
                    </Canvas>
                    { isMobile ?
                        <MobileMenu/> : <SideMenu />
                    }
                </div>
            </div>
        </>
    );
}

export default App;
