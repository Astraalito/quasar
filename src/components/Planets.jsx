import { useRef, useMemo } from "react";
import { useFrame, useLoader  } from "@react-three/fiber";
import { TextureLoader } from 'three'
import planets from "../planets"
import * as THREE from 'three'

const PlanetRing = ({radius, distance, axialTilt}) => {
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

    const groupRef = useRef();
    const planetRef = useRef();
  
    useFrame((_state, delta) => {

        groupRef.current.rotation.y += delta * revolutionSpeed;
        const rotationSpeed = 1 / rotationPeriod;
        planetRef.current.rotation.y += delta * rotationSpeed;
    });
  
    return (
      <group ref={groupRef}>
        <mesh 
            ref={planetRef} 
        position={[distance, 0, 0]} 
        rotation={[THREE.MathUtils.degToRad(axialTilt), 0, 0]}
        >
            <sphereGeometry args={[radius, 64, 64]} />
            <meshStandardMaterial 
                map={colorMap} 
            />
        </mesh>
        {name === "saturne" && 
            <PlanetRing radius={radius} distance={distance} axialTilt={axialTilt} />
        }
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