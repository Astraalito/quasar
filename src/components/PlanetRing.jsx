import { useMemo } from "react";
import { useLoader  } from "@react-three/fiber";
import { TextureLoader } from 'three'
import * as THREE from 'three'

const PlanetRing = ({radius, axialTilt, ringRef, customScale, customMaterial }) => {
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

    const defaultMaterial = new THREE.MeshStandardMaterial({
        map:ringMap,
        transparent: true,
        opacity: customMaterial ? 0.5 : 1
    })

    return(
        <mesh
            ref={ringRef}
            geometry={ringGeometry}
            scale={customScale ? customScale : 1}
            // material={customMaterial ? customMaterial: defaultMaterial}
            material={defaultMaterial}
            rotation={[THREE.MathUtils.degToRad(axialTilt) - Math.PI / 2, 0, 0]}
        >
        </mesh>
    )
}

export default PlanetRing