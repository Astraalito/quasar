import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { PositionalAudio } from "@react-three/drei";
import * as THREE from "three";

import sunVertexShader from './../shaders/sun/vertex.glsl'
import sunFragmentShader from './../shaders/sun/fragment.glsl'
import useAudioStore from "../stores/useAudioStore";

export const Sun = ({ radius = 10 }) => {
  const sunAudioRef = useRef();

  const { setSunAudio } = useAudioStore()

  useEffect(() => {
    if(sunAudioRef.current){
      setSunAudio(sunAudioRef.current)
    }
  }, [sunAudioRef.current])

  const sunMaterial = useMemo(() => {
      return new THREE.ShaderMaterial({
        vertexShader: sunVertexShader,
        fragmentShader: sunFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: [1.0, 0.7, 0.3] },
        }
      })
  }, [])

  useFrame((_, delta) => {
    if (sunMaterial) {
      sunMaterial.uniforms.uTime.value += delta
    }
  });

  return (
    <>
      <PositionalAudio
          ref={sunAudioRef}
          url="/audio/sun-noise.mp3"
          distance={10}
          loop={true}
      />
      <mesh material={sunMaterial}>
        <sphereGeometry args={[radius, 64, 64]} />
      </mesh>
    </>
  );
};

export default Sun;