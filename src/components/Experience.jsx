import { Environment, OrbitControls, Stars } from "@react-three/drei";
import Sun from "./Sun";
import SolarSystem from "./SolarSystem";
import usePlanetStore from "../stores/usePlanetStore";

export const Experience = () => {

  const { viewTarget } = usePlanetStore()

  return (
    <>
      <Environment
        background
        files="/hdri/nebula.hdr"
      />
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={8000} castShadow/>

      <OrbitControls maxDistance={250} target={viewTarget}/>

      <SolarSystem />

      <Stars radius={5} depth={20} count={1000} factor={1} saturation={0.1} fade speed={1} />
      <Stars radius={15} depth={40} count={2000} factor={1} saturation={0.1} fade speed={1} />
      <Stars radius={40} depth={60} count={2000} factor={6} saturation={0.1} fade speed={1} />
    </>
  );
};
