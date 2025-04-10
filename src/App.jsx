import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { Experience } from "./components/Experience";
import PlanetLoader from "./components/PlanetLoader";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";

function App() {

    return (
        <>
                <Header />
                <div className="overflow-hidden">
                    <div className={`flex flex-row h-screen transition-all duration-500 ease-in-out`}>
                        <Canvas 
                            shadows 
                            camera={{ position: [70, 5, 70], fov: 30 }}
                            gl={{ preserveDrawingBuffer: true }}
                        >
                            <color attach="background" args={["#2C2C2C"]} />
                            <Suspense fallback={<PlanetLoader />}>
                                <Experience />
                            </Suspense>
                        </Canvas>
                        <SideMenu />
                    </div>
                </div>
        
        </>
    );
}

export default App;
