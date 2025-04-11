import { Canvas } from "@react-three/fiber";
import { createXRStore } from '@react-three/xr'
import { XR } from '@react-three/xr'
import { Suspense, useEffect, useState } from "react";
import { Experience } from "./components/Experience";
import PlanetLoader from "./components/PlanetLoader";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import VRButton from "./components/VRButton";

const store = createXRStore()

function App() {

    return (
        <>
                
                <div className="overflow-hidden">
                    <div className={`flex flex-row h-screen transition-all duration-500 ease-in-out`}>
                        <Header />
                        <VRButton onClick={() => store.enterVR()} />
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
                        <SideMenu />
                    </div>
                </div>
        
        </>
    );
}

export default App;
