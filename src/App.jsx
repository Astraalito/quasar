import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Experience } from "./components/Experience";
import PlanetLoader from "./components/PlanetLoader";

function App() {
    return (
        <>
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
        </>
    );
}

export default App;
