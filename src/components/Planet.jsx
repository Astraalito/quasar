import { useRef, useState } from "react";
import { useFrame, useLoader  } from "@react-three/fiber";
import { TextureLoader } from 'three'
import { Html } from "@react-three/drei";

import gsap from "gsap";
import * as THREE from 'three'
import usePlanetStore from "../stores/usePlanetStore";
import PlanetRing from "./PlanetRing";
import useExperienceStore from "../stores/useExperienceStore";

const computeOriginPosition = (ref) => {
    const originWorldPosition = new THREE.Vector3()
    ref.current.getWorldPosition(originWorldPosition)
    return originWorldPosition
}

const computeOriginRotation = (ref) => {
    const originWorldQuaternion = new THREE.Quaternion()
    ref.current.getWorldQuaternion(originWorldQuaternion)

    const originWorldEuler = new THREE.Euler()
    originWorldEuler.setFromQuaternion(originWorldQuaternion)
    
    originWorldEuler.x == 0 ? 
        originWorldEuler.y -= Math.PI /2 :
        originWorldEuler.y += Math.PI /2
    
    return originWorldEuler
}

const Planet = ({ name, radius, distance, revolutionSpeed, rotationPeriod, axialTilt, textureUrl }) => {
    const colorMap = useLoader(TextureLoader, textureUrl)

    const [animationSpeed, setAnimationSpeed] = useState(1);
    const [hovered, setHovered] = useState(false);

    const { 
            setHoveredPlanet, clearHoveredPlanet,
            setViewTarget,
            planetTarget, setPlanetTarget,
            planetDistanceMultiplier,
          } = usePlanetStore()

    const {
        setPositionXROrigin,
        setRotationXROrigin,
        requireNewOriginPos, setRequireNewOriginPos
    } = useExperienceStore()

    const groupRef = useRef();
    const planetRef = useRef();
    const ringRef = useRef();
    const xrOriginRef = useRef();
  
    useFrame((_state, delta) => {
        //move Planet around sun
        if(planetTarget != name) {
            const deltaTime = animationSpeed * delta
            groupRef.current.rotation.y += deltaTime * revolutionSpeed;
        }

        //Rotate Planet on it's own axis
        const rotationSpeed = 1 / rotationPeriod;
        planetRef.current.rotation.y += delta * rotationSpeed;

        //Follow Planet if targeted
        if(planetTarget === name) {
            const planetWorldPosition = new THREE.Vector3();
            planetRef.current.getWorldPosition(planetWorldPosition);
            setViewTarget(planetWorldPosition)
        } else if(planetTarget === null) {
            setViewTarget([0,0,0])
        }  
        
        if(planetTarget === name && requireNewOriginPos) {
            if(xrOriginRef.current){
                //position
                const originWorldPosition = computeOriginPosition(xrOriginRef)
                setPositionXROrigin(originWorldPosition)
                //rotation
                const originWorldRotation = computeOriginRotation(xrOriginRef)
                setRotationXROrigin(originWorldRotation)
            }
            setRequireNewOriginPos(false)
        }
    });

    const handleOnPointerPlanetEnter = (e) => {
        e.stopPropagation()
        setHovered(true);
        setHoveredPlanet(name);

        //SPEED
        const proxySpeed = { value: animationSpeed };
        gsap.to(proxySpeed, { 
            value: 0,
            duration: 0.5,
            ease: "power2.out",
            onUpdate: () => setAnimationSpeed(proxySpeed.value)
        });

        //SCALE
        gsap.to(planetRef.current.scale, { 
            x: 1.5, y: 1.5, z: 1.5,
            duration: 0.5,
            ease: "power2.out",
        });
        if (ringRef.current) {
            gsap.to(ringRef.current.scale, {
                x: 1.5, y: 1.5, z: 1.5,
                duration: 0.5,
                ease: "power2.out",
            });
        }
    }

    const handleOnPointerPlanetLeave = (e) => {
        e.stopPropagation()
        setHovered(false)
        clearHoveredPlanet()

        const proxySpeed = { value: animationSpeed };
        gsap.to(proxySpeed, { 
            value: 1,
            duration: 0.5,
            ease: "power2.out",
            onUpdate: () => setAnimationSpeed(proxySpeed.value)
        });

        //SCALE
        gsap.to(planetRef.current.scale, {
            x: 1, y: 1, z: 1,
            duration: 0.5,
            ease: "power2.out",
        });
        if (ringRef.current) {
            gsap.to(ringRef.current.scale, {
              x: 1, y: 1, z: 1,
              duration: 0.5,
              ease: "power2.inOut",
            });
          }
    }

    const handleClickPlanet = (e) => {
        e.stopPropagation()
        setPlanetTarget(name)
    }
  
    return (
      <group ref={groupRef}>
        <group 
            position={[distance * planetDistanceMultiplier, 0, 0]}
            onPointerEnter={ e => handleOnPointerPlanetEnter(e)}
            onPointerLeave={ e => handleOnPointerPlanetLeave(e)}
        >
            <group ref={xrOriginRef} position={[-radius * 3, 0, 0]}>
                {/* <mesh>
                    <boxGeometry />
                    <meshStandardMaterial color={"yellow"} />
                </mesh> */}
            </group>

            <mesh 
                ref={planetRef} 
                rotation={[THREE.MathUtils.degToRad(axialTilt), 0, 0]}
                onClick={ e => handleClickPlanet(e)}
            >
                <sphereGeometry args={[radius, 64, 64]} />
                <meshStandardMaterial 
                    map={colorMap} 
                />
                {hovered && (
                    <Html
                        position={[0, radius + 1, 0]} // position au-dessus de la planète
                        center
                        style={{
                            color: "white",
                            fontSize: "1rem",
                            pointerEvents: "none",
                            fontFamily: "Montserrat, sans-serif"
                        }}
                    >
                        {name.toUpperCase()}
                    </Html>
                )}
            </mesh>
            {name === "saturne" && (
                <PlanetRing ringRef={ringRef} radius={radius} axialTilt={axialTilt}/>
            )}
        </group>
      </group>
    );
};

export default Planet