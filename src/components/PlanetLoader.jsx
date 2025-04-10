import { Html } from "@react-three/drei";

export default function PlanetLoader() {
    return (
      <Html as="div" center>
        <div className="absolute inset-0 flex items-center justify-center bg-white z-[9999]">
          <div className="relative flex items-center justify-center w-[80px] h-[80px]">
            {/* Planète */}
            <div className="w-10 h-10 min-w-[40px] bg-[radial-gradient(circle,_rgba(255,255,255,0.2)_40%,_white)] rounded-full z-[2]" />
  
            {/* Orbite */}
            <div className="absolute w-[80px] h-[80px] border border-dashed border-white rounded-full" />
  
            {/* Orbite animée avec satellite */}
            <div className="absolute w-[80px] h-[80px] rounded-full animate-spin">
              <div className="absolute top-[-5px] left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 bg-white rounded-full" />
            </div>
          </div>
        </div>
      </Html>
    );
  }