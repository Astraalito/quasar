import { Canvas } from "@react-three/fiber";
import { createXRStore } from '@react-three/xr'
import { XR } from '@react-three/xr'
import { Suspense } from "react";
import { Experience } from "./components/Experience";
import { LeftHand } from "./components/Immersive/LeftHand";
import PlanetLoader from "./components/PlanetLoader";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import MobileMenu from "./components/MobileMenu";
import VRButton from "./components/VRButton";
import usePlanetStore from "./stores/usePlanetStore";

const store = createXRStore({
    controller: { left: LeftHand }
})

function App() {

    const isMobile = window.innerWidth <= 768;

    const {setPlanetDistanceMultiplier} = usePlanetStore()

    const handleVRButtonClick = () => {
        setPlanetDistanceMultiplier(2)
        store.enterVR()
    }

    return (
        <>
            <div className="overflow-hidden">
                <div className={`flex flex-row h-screen transition-all duration-500 ease-in-out`}>
                    <Header />
                    <VRButton onClick={handleVRButtonClick} />
                    <Canvas 
                        shadows 
                        camera={{ position: [70, 5, 70], fov: 30 }}
                        gl={{ preserveDrawingBuffer: true }}
                    >
                        <color attach="background" args={["#2C2C2C"]} />
                        <Suspense fallback={<PlanetLoader />}>
                            <XR store={store}>
                                <Experience />
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
