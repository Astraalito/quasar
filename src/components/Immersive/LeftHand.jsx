import { useGLTF } from "@react-three/drei";
import React, { useEffect, useRef, useState } from "react";
import { useXRInputSourceState } from "@react-three/xr";
import { degToRad } from "three/src/math/MathUtils.js";
import { useFrame } from '@react-three/fiber'
import planets from "../../data/planets-3d"
import { Text } from "@react-three/drei";
import PlanetHologram from "./PlanetHologram";
import usePlanetStore from "../../stores/usePlanetStore";
import useExperienceStore from "../../stores/useExperienceStore";

export function LeftHand(props) {
    const { nodes, materials } = useGLTF("/models/leftController/leftController.gltf");

    const timerRef = useRef(null);
    const controllerLeft = useXRInputSourceState('controller', 'left');
    const [isActive, setIsActive] = useState(false);
    const [selectedPlanetIndex, setSelectedPlanetIndex] = useState(0);

    const { 
        planetTarget, setPlanetTarget, resetPlanetTarget
    } = usePlanetStore()

    const {
        resetPositionXROrigin,
        setRequireNewOriginPos
    } = useExperienceStore()

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    useFrame(() => {

        if (controllerLeft?.gamepad?.['xr-standard-thumbstick']?.state === "touched") {
            const xAxis = controllerLeft.gamepad['xr-standard-thumbstick'].xAxis;

            if (xAxis < -0.2 && !isActive) {
                changeLeft();
                setIsActive(true);

                timerRef.current = setTimeout(() => {
                    setIsActive(false);
                }, 500);
            } else if (xAxis > 0.2 && !isActive) {
                changeRight();
                setIsActive(true);

                timerRef.current = setTimeout(() => {
                    setIsActive(false);
                }, 500);
            } else if (xAxis > -0.2 && xAxis < 0.2 && isActive) {
                setIsActive(false);
                if (timerRef.current) {
                    clearTimeout(timerRef.current);
                }
            }
        }

        if (controllerLeft?.gamepad?.['x-button']?.state === 'pressed') {
            setPlanetTarget(planets[selectedPlanetIndex].name)
            setRequireNewOriginPos(true)
        } else if(controllerLeft?.gamepad?.['y-button']?.state === 'pressed') {
            resetPlanetTarget()
            resetPositionXROrigin()
        }
    });

    const changeLeft = () => {
        setSelectedPlanetIndex((prevIndex) => (prevIndex + 1) % planets.length);
    };

    const changeRight = () => {
        setSelectedPlanetIndex((prevIndex) => (prevIndex - 1 + planets.length) % planets.length);
    };

    return (
        <group {...props} dispose={null}>
            <Text 
                    color="white" 
                    anchorX="center" 
                    anchorY="middle" 
                    position={[0, 0.13, -0.1]}
                    scale={0.03}
                    rotation={[-Math.PI/8 , Math.PI/12, 0]}
            >
                    {planets[selectedPlanetIndex].name.toUpperCase()}
            </Text>
            <group position={[0, 0.07, -0.05]} rotation={[-Math.PI/8, -Math.PI/2, 0]}>
                <PlanetHologram 
                    key={planets[selectedPlanetIndex].name} 
                    planet={planets[selectedPlanetIndex]} 
                />  
            </group>
            <group scale={0.03}>

                <group rotation={[0,Math.PI,0]} position={[-0.1, -0.3, 0.5]} scale={3.5}>
                    <mesh
                        geometry={nodes.Object_20.geometry}
                        material={materials.shellquest2ControllerMAT}
                    />
                </group>
            </group>
        </group>
    );
}