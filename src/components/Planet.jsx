import { useRef, useState, useMemo } from "react";
import { useFrame, useLoader  } from "@react-three/fiber";
import { TextureLoader } from 'three'
import { Html } from "@react-three/drei";

import gsap from "gsap";
import * as THREE from 'three'
import usePlanetStore from "../stores/usePlanetStore";

const PlanetRing = ({radius, axialTilt, ringRef }) => {
    const ringMap = useLoader(TextureLoader, "/textures/saturn_ring.png")

    const ringGeometry = useMemo(() => {
        const tube = 3
        const radialSegments = 2
        const tubularSegments = 1024
        const geometry = new THREE.TorusGeometry(radius + 2, tube, radialSegments, tubularSegments);
        const pos = geometry.attributes.position;
        const uv = geometry.attributes.uv;
        const v3 = new THREE.Vector3();

        for (let i = 0; i < pos.count; i++) {
            v3.fromBufferAttribute(pos, i);
            const dist = Math.sqrt(v3.x * v3.x + v3.y * v3.y);
            const midRadius = radius;
            const u = dist < midRadius ? 0.0 : 1.0;
            const v = 1.0;

            uv.setXY(i, u, v);
        }

        return geometry;
    }, [radius]);

    return(
        <mesh
            ref={ringRef}
            geometry={ringGeometry}
            rotation={[THREE.MathUtils.degToRad(axialTilt) - Math.PI / 2, 0, 0]}
        >
            <meshStandardMaterial
                map={ringMap}
                transparent
            />
        </mesh>
    )
}

const Planet = ({ name, radius, distance, revolutionSpeed, rotationPeriod, axialTilt, textureUrl }) => {
    const colorMap = useLoader(TextureLoader, textureUrl)

    const [animationSpeed, setAnimationSpeed] = useState(1);
    const [hovered, setHovered] = useState(false);

    const { 
            setHoveredPlanet, clearHoveredPlanet,
            setViewTarget,
            planetTarget, setPlanetTarget,
            planetDistanceMultiplier
          } = usePlanetStore()

    const groupRef = useRef();
    const planetRef = useRef();
    const ringRef = useRef();
  
    useFrame((_state, delta) => {
        //move Planet around sun
        const deltaTime = animationSpeed * delta
        groupRef.current.rotation.y += deltaTime * revolutionSpeed;

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
        console.log("Vous avez cliqué sur " + name)
        setPlanetTarget(name)
    }
  
    return (
      <group ref={groupRef}>
        <group 
            position={[distance * planetDistanceMultiplier, 0, 0]}
            onPointerEnter={ e => handleOnPointerPlanetEnter(e)}
            onPointerLeave={ e => handleOnPointerPlanetLeave(e)}
        >
            {/* <mesh position={[radius * 10, 0, 0]}>
                <boxGeometry />
                <meshStandardMaterial color={"yellow"} />
            </mesh> */}
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
                            fontFamily: "Arial",
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
            )}npm
        </group>
      </group>
    );
};

export default Planet