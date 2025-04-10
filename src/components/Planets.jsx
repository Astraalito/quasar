import { useRef, useMemo, useState } from "react";
import { useFrame, useLoader  } from "@react-three/fiber";
import { TextureLoader } from 'three'
import gsap from "gsap";
import planets from "../planets"
import * as THREE from 'three'
import { Html } from "@react-three/drei";

const PlanetRing = ({radius, distance, axialTilt, ringRef }) => {
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
            position={[distance, 0, 0]}
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

    const groupRef = useRef();
    const planetRef = useRef();
    const ringRef = useRef();
  
    useFrame((_state, delta) => {
        const deltaTime = animationSpeed * delta
        groupRef.current.rotation.y += deltaTime * revolutionSpeed;

        const rotationSpeed = 1 / rotationPeriod;
        planetRef.current.rotation.y += delta * rotationSpeed;
    });

    const handleOnPointerPlanetEnter = (e) => {
        e.stopPropagation()
        setHovered(true);

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
            x: 1.2, y: 1.2, z: 1.2,
            duration: 0.5,
            ease: "power2.out",
        });
        if (ringRef.current) {
            gsap.to(ringRef.current.scale, {
                x: 1.2, y: 1.2, z: 1.2,
                duration: 0.5,
                ease: "power2.out",
            });
        }
    }

    const handleOnPointerPlanetLeave = (e) => {
        e.stopPropagation()
        setHovered(false);

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
    }
  
    return (
      <group ref={groupRef}>
        <mesh 
            ref={planetRef} 
            position={[distance, 0, 0]} 
            rotation={[THREE.MathUtils.degToRad(axialTilt), 0, 0]}
            onPointerEnter={ e => handleOnPointerPlanetEnter(e)}
            onPointerLeave={ e => handleOnPointerPlanetLeave(e)}
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
                    }}
                >
                    {name.toUpperCase()}
                </Html>
            )}
        </mesh>
        {name === "saturne" && (
            <PlanetRing ringRef={ringRef} radius={radius} distance={distance} axialTilt={axialTilt}/>
        )}
      </group>
    );
};

const OrbitPath = ({ distance }) => {
    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[distance - 0.01, distance + 0.01, 64]} />
        <meshBasicMaterial color="white" side={THREE.DoubleSide} />
      </mesh>
    );
};

const Planets = () => {
    return(
        <>
            {planets.map((planet) => {
                return <group key={planet.name}>
                    <Planet 
                        name={planet.name} 
                        radius={planet.size} 
                        distance={planet.distance}
                        revolutionSpeed={planet.speed}
                        rotationPeriod={planet.rotationPeriod}
                        axialTilt={planet.axialTilt}
                        textureUrl={planet.textureUrl}
                    />
                    <OrbitPath 
                        distance={planet.distance}
                    />
                </group>
                
            })}
        </>
    )
}

export default Planets