uniform float uTime;
    uniform vec3 uColor;
    varying vec3 vNormal;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vViewPosition;

    // Bruit Simplex 3D
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v) { 
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

      vec3 i = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);

      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);

      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;

      i = mod289(i);
      vec4 p = permute(permute(permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));

      float n_ = 0.142857142857; // 1.0/7.0
      vec3 ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);

      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);

      vec4 s0 = floor(b0) * 2.0 + 1.0;
      vec4 s1 = floor(b1) * 2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);

      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;

      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }

    float fbm(vec3 p) {
      float v = 0.0;
      float a = 1.0; // Amplitude initiale plus forte
      vec3 shift = vec3(100.0);
      // Moins d'octaves pour un effet plus brut
      for (int i = 0; i < 3; ++i) { // Réduit de 6 à 3 octaves
        v += a * snoise(p);
        p = p * 2.5 + shift; // Échelle plus grande pour des granules plus nets
        a *= 0.6; // Atténuation légèrement plus forte
      }
      return v;
    }

    void main() {
      vec3 pos = normalize(vPosition);
      float t = uTime * 0.2;

      // Bruit 3D pour le plasma, échelle augmentée
      float n1 = fbm(pos * 5.0 + vec3(t, t, t));
      float n2 = fbm(pos * 5.0 + vec3(-t * 0.5, t * 0.7, t * 0.3));
      float n3 = fbm(pos * 5.0 + vec3(t * 0.3, -t * 0.4, t * 0.6));
      
      // Normalisation et contraste accru
      float plasma = (n1 + n2 + n3 + 3.0) / 6.0;
      plasma = clamp(plasma, 0.0, 1.0);
      plasma = pow(plasma, 3.0); // Augmente le contraste
      plasma = smoothstep(0.1, 0.4, plasma); // Crée des bords nets (granularité)

      // Couleurs
      vec3 baseColor = uColor;
      vec3 flameColor = vec3(1.0, 0.9, 0.2);
      vec3 darkColor = vec3(0.95, 0.1, 0.1);
      vec3 haloColor = vec3(0.95, 0.85, 0.35);

      // Mélange des couleurs avec moins de dégradé
      vec3 color = mix(darkColor, baseColor, plasma);
      color = mix(color, flameColor, plasma);

      // Calcul du halo
      vec3 viewDir = normalize(vViewPosition);
      float rim = 1.0 - max(dot(vNormal, viewDir), 0.0);
      float halo = pow(rim, 2.0);
      vec3 haloEffect = haloColor * halo * 2.0;

      // Ajout du halo
      color += haloEffect;

      // Lueur de bord
      float glow = pow(abs(dot(vNormal, viewDir)), 2.0);
      color += flameColor * glow * 0.3;

      gl_FragColor = vec4(color, 1.0);
    }