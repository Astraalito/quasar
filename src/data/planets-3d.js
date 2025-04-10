const planets = [
  { 
    name: "mercure",
    size: 1.59,
    distance: 14,
    speed: 0.5,  // Limité à 0.5
    color: "#B4B4B4",
    rotationPeriod: 58.6,
    axialTilt: 0.03,
    retrograde: false,
    textureUrl: "/textures/mercury.jpg"
  },
  { 
    name: "venus",
    size: 1.24,
    distance: 19,
    speed: 0.37,  // Ajusté proportionnellement
    color: "#E1BB7B",
    rotationPeriod: 243.0,
    axialTilt: 177.4,
    retrograde: true,
    textureUrl: "/textures/venus_surface.jpg"
  },
  { 
    name: "terre",
    size: 1.28,
    distance: 22,
    speed: 0.31,  // Ajusté proportionnellement
    color: "#4E9F8D",
    rotationPeriod: 0.997,
    axialTilt: 23.4,
    retrograde: false,
    textureUrl: "/textures/earth.jpg"
  },
  { 
    name: "mars",
    size: 0.88,
    distance: 26,
    speed: 0.19,  // Ajusté proportionnellement
    color: "#FF5733",
    rotationPeriod: 1.03,
    axialTilt: 25.2,
    retrograde: false,
    textureUrl: "/textures/mars.jpg"
  },
  { 
    name: "jupiter",
    size: 6.0,
    distance: 39.92,
    speed: 0.09,  // Ajusté proportionnellement
    color: "#D99C5D",
    rotationPeriod: 1.0,
    axialTilt: 3.1,
    retrograde: false,
    textureUrl: "/textures/jupiter.jpg"
  },
  { 
    name: "saturne",
    size: 4.5,
    distance: 59.87,
    speed: 0.06,  // Ajusté proportionnellement
    color: "#F1C27D",
    rotationPeriod: 1.0,
    axialTilt: 26.7,
    retrograde: false,
    textureUrl: "/textures/saturn.jpg"
  },
  { 
    name: "uranus",
    size: 3.85,
    distance: 87.93,
    speed: 0.03,  // Ajusté proportionnellement
    color: "#4A9EAE",
    rotationPeriod: 0.72,
    axialTilt: 97.8,
    retrograde: true,
    textureUrl: "/textures/uranus.jpg"
  },
  { 
    name: "neptune",
    size: 3.74,
    distance: 100.00,
    speed: 0.01,  // Ajusté proportionnellement
    color: "#3F72A4",
    rotationPeriod: 0.67,
    axialTilt: 28.3,
    retrograde: false,
    textureUrl: "/textures/neptune.jpg"
  }
];

export default planets;
