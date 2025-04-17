import { useEffect, useState } from "react";

const VRButton = ({ onClick }) => {
    const [isVRSupported, setIsVRSupported] = useState(false);
  
    useEffect(() => {
      if (navigator.xr && navigator.xr.isSessionSupported) {
        navigator.xr.isSessionSupported("immersive-vr").then((supported) => {
          setIsVRSupported(supported);
        });
      }
    }, []);
  
    if (!isVRSupported) return null;
  
    return (
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <button
  onClick={onClick}
  className="flex items-center gap-2 px-6 py-2 rounded-lg shadow-lg border animate-pulse-slow"
  style={{
    backgroundColor: "rgba(38, 38, 38, 0.7)",
    borderColor: "rgba(61, 61, 63, 0.7)",
    color: "#E5E5E2",
    fontFamily: "Montserrat, sans-serif"
  }}
>
  <img
    src="/svg/vr.svg"
    alt="VR Icon"
    className="w-5 h-5"
    style={{
      filter:
        "invert(91%) sepia(4%) saturate(33%) hue-rotate(23deg) brightness(100%) contrast(93%)",
    }}
  />
  Enter VR
</button>
      </div>
    );
  };
  
  export default VRButton;