import { OrbitControls, Stars } from "@react-three/drei";
import { XROrigin } from "@react-three/xr";
import { useLoader } from '@react-three/fiber';
import SolarSystem from "./SolarSystem";
import usePlanetStore from "../stores/usePlanetStore";
import useExperienceStore from "../stores/useExperienceStore";
import { useXR } from "@react-three/xr";
import UIPlanetInfo from "./Immersive/UIPlanetInfo";
import * as THREE from 'three';

export const Experience = () => {
    const texture = useLoader(THREE.TextureLoader, "/hdri/nebula.jpg")

    const xr = useXR()
    const { viewTarget } = usePlanetStore()
    const { positionXROrigin, rotationXROrigin } = useExperienceStore()


    return (
        <>
        <mesh scale={[-1, 1, 1]}>
            <sphereGeometry args={[500, 60, 40]} />
            <meshBasicMaterial map={texture} side={THREE.BackSide}/>
        </mesh>

        <ambientLight intensity={0.3} />
        <pointLight position={[0, 0, 0]} intensity={4} castShadow decay={0}/>

        <OrbitControls maxDistance={250} minDistance={20} target={viewTarget}/>
        <SolarSystem />


        <group position={positionXROrigin} rotation={rotationXROrigin}>
            {/* <group rotation={[0, Math.PI / 3, 0]} >
                <group position={[0, 1, -4]} >
                    <UIPlanetInfo />
                </group>
            </group> */}
            <XROrigin />
        </group>

        { !xr.session &&
            <group>
                <Stars radius={5} depth={20} count={1000} factor={1} saturation={0.1} fade speed={1} />
                <Stars radius={15} depth={40} count={2000} factor={1} saturation={0.1} fade speed={1} />
                <Stars radius={10} depth={200} count={2000} factor={6} saturation={0.1} fade speed={1} />
            </group>
        }
        </>
    );
};
