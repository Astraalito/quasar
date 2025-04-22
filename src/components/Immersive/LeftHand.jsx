import React, { useEffect, useRef, useState } from "react";
import { DefaultXRController, useXRInputSourceState } from "@react-three/xr";
import { useFrame } from '@react-three/fiber'
import planets from "../../data/planets-3d"
import { Text } from "@react-three/drei";
import PlanetHologram from "./PlanetHologram";
import usePlanetStore from "../../stores/usePlanetStore";
import useExperienceStore from "../../stores/useExperienceStore";

export function LeftHand() {

    const timerRef = useRef(null);
    const controllerRef = useRef(null);
    const controllerLeft = useXRInputSourceState('controller', 'left');
    const [isActive, setIsActive] = useState(false);
    const [selectedPlanetIndex, setSelectedPlanetIndex] = useState(0);

    const selectAudio = new Audio('/audio/controller/select.mp3');
    selectAudio.volume = 0.5;
    const cancelAudio = new Audio('/audio/controller/cancel.mp3');
    cancelAudio.volume = 0.5;
    const changeAudio = new Audio('/audio/controller/change.mp3');
    changeAudio .volume = 0.5;

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
            if(planetTarget != planets[selectedPlanetIndex].name){
                selectAudio.currentTime = 0;
                selectAudio.play();
                setPlanetTarget(planets[selectedPlanetIndex].name)
                setRequireNewOriginPos(true)
            }
        } else if(controllerLeft?.gamepad?.['y-button']?.state === 'pressed') {
            if(planetTarget) {
                cancelAudio.currentTime = 0;
                cancelAudio.play();
                resetPlanetTarget()
                resetPositionXROrigin()
            }
        }
    });

    const changeLeft = () => {
        setSelectedPlanetIndex((prevIndex) => (prevIndex + 1) % planets.length);
        changeAudio.currentTime = 0;
        changeAudio.play();
    };

    const changeRight = () => {
        setSelectedPlanetIndex((prevIndex) => (prevIndex - 1 + planets.length) % planets.length);
        changeAudio.currentTime = 0;
        changeAudio.play();
    };

    return (
        <group>
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
            <group>
                <DefaultXRController ref={controllerRef} rayPointer={false}/>
            </group>
        </group>
    );
}