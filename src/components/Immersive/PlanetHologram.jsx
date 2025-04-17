import { useRef, useMemo } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import * as THREE from 'three'

import hologramVertexShader from './../../shaders/hologram/vertex.glsl'
import hologramFragmentShader from './../../shaders/hologram/fragment.glsl'
import PlanetRing from '../PlanetRing'

const PlanetHologram = ({ planet }) => {
  const meshRef = useRef()
  const ringRef = useRef();

  // Chargement sécurisé de la texture
  const texture = useLoader(TextureLoader, planet.textureUrl)

  // Préparation de la texture une fois chargée
  useMemo(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace
      texture.minFilter = THREE.LinearFilter
      texture.magFilter = THREE.LinearFilter
      texture.generateMipmaps = false
      texture.needsUpdate = true
    }
  }, [texture])

  // Création du ShaderMaterial une seule fois
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: hologramVertexShader,
      fragmentShader: hologramFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: texture }
      },
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
  }, [texture])

  // Animation du temps
  useFrame(({ clock }) => {
    if (material) {
      material.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  return (
    <group>
        <mesh 
        ref={meshRef}
        position={[0, 0, 0]} 
        rotation={[THREE.MathUtils.degToRad(planet.axialTilt), 0, 0]}
        material={material}>
            <sphereGeometry args={[0.05, 64, 64]} />
        </mesh>
        {planet.name === "saturne" && (
            
                <PlanetRing ringRef={ringRef} radius={planet.size} axialTilt={planet.axialTilt} customScale={0.01} customMaterial={material}/>
        )}
    </group>
  )
}

export default PlanetHologram