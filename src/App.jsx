import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";

function App() {
  return (
    <Canvas shadows camera={{ position: [70, 5, 70], fov: 30 }}>
      <color attach="background" args={["black"]} />
      <Experience />
    </Canvas>
  );
}

export default App;
