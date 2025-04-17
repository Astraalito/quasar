// import { useGLTF } from "@react-three/drei";
import React, { useEffect, useRef, useState } from "react";
import { useXRInputSourceState } from "@react-three/xr";
import { degToRad } from "three/src/math/MathUtils.js";
import { useFrame } from '@react-three/fiber'
import planets from "../../data/planets-3d"
import { Text } from "@react-three/drei";
import PlanetHologram from "./PlanetHologram";




export function LeftHand(props) {
    const timerRef = useRef(null);
    const controllerLeft = useXRInputSourceState('controller', 'left');
    const [isActive, setIsActive] = useState(false);
    const [selectedPlanetIndex, setSelectedPlanetIndex] = useState(0);

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
                    color="black" 
                    anchorX="center" 
                    anchorY="middle" 
                    position={[0, 0.25, 0]}
                    scale={[0.07, 0.07, 0.07]}
            >
                    {planets[selectedPlanetIndex].name}
            </Text>
            <group position={[0, 0.1, 0]} rotation={[0, -Math.PI/2, 0]}>
                <PlanetHologram 
                    key={planets[selectedPlanetIndex].name} 
                    // planet={planets[selectedPlanetIndex]} 
                    planet={planets[selectedPlanetIndex]} 
                />  
            </group>
            <group rotation-x={-degToRad(60)} scale={0.03}>
                <group position-y={-2.8}>
                </group>
            </group>
        </group>
    );
}