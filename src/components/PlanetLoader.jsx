import { Html } from "@react-three/drei";

export default function PlanetLoader() {
    return (
        <Html
            as='div'
            center
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <div className="loader-container">
                <div className="planet"></div>
                <div className="orbit"></div>
                <div className="orbit-transparent">
                    <div className="satellite"></div>
                </div>
            </div>
        </Html>
    );
}