uniform float uTime;
uniform sampler2D uTexture;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

void main()
{
    // Normal
    vec3 normal = normalize(vNormal);
    if(!gl_FrontFacing)
        normal *= - 1.0;

    //Stripes
    float stripeHeight = 0.1;
    float stripeSpeed = 0.01;
    float stripes = mod((vPosition.y - uTime * stripeSpeed) * 20.0, stripeHeight) * 5.0;
    stripes = clamp(stripes, 0.1, 1.0) + 0.5;

    // Fresnel
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    float fresnel = dot(viewDirection, normal) + 1.3;
    fresnel = pow(fresnel, 2.0);

    //holographic
    float holographic = stripes * fresnel;
    // holographic += fresnel;

    //Texture
    vec4 texColor = texture2D(uTexture, vUv);
    // vec3 colorLight = vec3(4.3, 7.5, 10.0);
    vec3 colorLight = vec3(1.0, 1.0, 1.0);
    // vec3 colorLight = vec3(0.43, 0.75, 1.0);
    colorLight = colorLight * fresnel * texColor.rgb;

    gl_FragColor = vec4(colorLight, holographic);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}