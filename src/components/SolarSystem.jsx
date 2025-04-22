import planets from "../data/planets-3d"
import * as THREE from 'three'
import Planet from "./Planet";
import Sun from "./Sun";
import usePlanetStore from "../stores/usePlanetStore";


const OrbitPath = ({ distance }) => {
    const { 
        planetDistanceMultiplier
      } = usePlanetStore()
    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[(distance * planetDistanceMultiplier) - 0.01, (distance * planetDistanceMultiplier) + 0.01, 64]} />
        <meshBasicMaterial color="white" side={THREE.DoubleSide} />
      </mesh>
    );
};

const SolarSystem = () => {
    return(
        <>
            <Sun />
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

export default SolarSystem