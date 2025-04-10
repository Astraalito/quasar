const planetData = {
    mercure: {
      name: "Mercure",
      image: "/img/planets/mercure.jpg",
      taille: "4 879 km de diamètre",
      jour: "58 jours terrestres",
      revolution: "88 jours terrestres",
      composition: "Rocheuse (silicates, fer)",
      temperature: "de -173°C à 427°C",
      atmosphere: "Très mince, principalement composée d'oxygène, de sodium, d'hydrogène, d'hélium et de potassium",
      description: [
        "Mercure est la planète la plus proche du Soleil et aussi la plus petite du système solaire.",
        "Elle possède une surface criblée de cratères, similaire à celle de la Lune, et ne possède quasiment pas d’atmosphère.",
        "Sa proximité avec le Soleil fait qu'elle connaît des écarts de température extrêmes entre le jour et la nuit."
      ]
    },
    venus: {
      name: "Vénus",
      image: "/img/planets/venus.jpg",
      taille: "12 104 km de diamètre",
      jour: "243 jours terrestres (rotation rétrograde)",
      revolution: "225 jours terrestres",
      composition: "Rocheuse (silicates, fer)",
      temperature: "environ 464°C",
      atmosphere: "Épaisse, principalement composée de dioxyde de carbone avec des nuages d'acide sulfurique",
      description: [
        "Vénus est souvent appelée la sœur jumelle de la Terre en raison de sa taille similaire.",
        "Elle possède une atmosphère dense provoquant un effet de serre intense, ce qui en fait la planète la plus chaude du système solaire.",
        "Sa surface est cachée sous des nuages épais, mais révèle des volcans et des plaines vastes."
      ]
    },
    terre: {
      name: "Terre",
      image: "/img/planets/terre.jpg",
      taille: "12 742 km de diamètre",
      jour: "24 heures",
      revolution: "365,25 jours",
      composition: "Rocheuse (silicates, fer, eau)",
      temperature: "-88°C à 58°C",
      atmosphere: "Azote, oxygène, argon, dioxyde de carbone",
      description: [
        "La Terre est la seule planète connue pour abriter la vie.",
        "Elle possède de vastes océans, une atmosphère respirable, et un champ magnétique protecteur.",
        "La Terre est la troisième planète du système solaire, située à une distance idéale du Soleil."
      ]
    },
    mars: {
      name: "Mars",
      image: "/img/planets/mars.jpg",
      taille: "6 779 km de diamètre",
      jour: "24,6 heures",
      revolution: "687 jours terrestres",
      composition: "Rocheuse (oxyde de fer, silicates)",
      temperature: "-125°C à 20°C",
      atmosphere: "Minime, principalement du dioxyde de carbone",
      description: [
        "Mars est surnommée la planète rouge en raison de la présence d’oxyde de fer à sa surface.",
        "Elle possède des calottes polaires, des montagnes et des canyons gigantesques comme le Valles Marineris.",
        "Elle est l'une des planètes les plus étudiées pour une potentielle vie passée ou future colonisation humaine."
      ]
    },
    jupiter: {
      name: "Jupiter",
      image: "/img/planets/jupiter.jpg",
      taille: "139 820 km de diamètre",
      jour: "9,9 heures",
      revolution: "12 années terrestres",
      composition: "Gazeuse (hydrogène, hélium)",
      temperature: "-108°C",
      atmosphere: "Épaisse, hydrogène, hélium, traces de méthane, d’ammoniac, d’eau",
      description: [
        "Jupiter est la plus grande planète du système solaire, célèbre pour sa Grande Tache Rouge, une gigantesque tempête.",
        "Elle possède plus de 90 lunes, dont certaines comme Europe et Ganymède pourraient abriter des océans souterrains.",
        "Son champ magnétique est le plus puissant du système solaire."
      ]
    },
    saturne: {
      name: "Saturne",
      image: "/img/planets/saturne.jpg",
      taille: "116 460 km de diamètre",
      jour: "10,7 heures",
      revolution: "29,5 années terrestres",
      composition: "Gazeuse (hydrogène, hélium)",
      temperature: "-139°C",
      atmosphere: "Hydrogène, hélium, méthane",
      description: [
        "Saturne est célèbre pour son spectaculaire système d’anneaux composés de glace et de roches.",
        "Elle est la deuxième plus grande planète du système solaire.",
        "Saturne possède également de nombreuses lunes fascinantes, notamment Titan, qui a une atmosphère dense."
      ]
    },
    uranus: {
      name: "Uranus",
      image: "/img/planets/uranus.jpg",
      taille: "50 724 km de diamètre",
      jour: "17,2 heures",
      revolution: "84 années terrestres",
      composition: "Gazeuse (hydrogène, hélium, méthane)",
      temperature: "-195°C",
      atmosphere: "Hydrogène, hélium, méthane",
      description: [
        "Uranus est une planète géante glacée, connue pour sa rotation sur le côté.",
        "Elle a une teinte bleu-vert due au méthane dans son atmosphère.",
        "Uranus a un système d’anneaux fins et plus de 20 lunes connues."
      ]
    },
    neptune: {
      name: "Neptune",
      image: "/img/planets/neptune.jpg",
      taille: "49 244 km de diamètre",
      jour: "16,1 heures",
      revolution: "165 années terrestres",
      composition: "Gazeuse (hydrogène, hélium, méthane)",
      temperature: "-200°C",
      atmosphere: "Hydrogène, hélium, méthane",
      description: [
        "Neptune est la planète la plus éloignée du Soleil.",
        "Elle est connue pour ses vents violents et ses tempêtes sombres.",
        "Comme Uranus, elle a une teinte bleue due à sa composition atmosphérique."
      ]
    },
  };
  
  export default planetData;
  