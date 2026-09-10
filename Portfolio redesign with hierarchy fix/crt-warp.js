// Plain-WebGL port of components/ui/crt-wrap.tsx (same shaders, same uniforms).
const VERT = `
attribute vec3 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const FRAG = `
precision highp float;

varying vec2 vUv;
uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uColor;
uniform vec3 uBackgroundColor;
uniform float uCurvature;
uniform float uScanlineStrength;
uniform float uScanlineFrequency;
uniform float uWaveAmplitude;
uniform float uWaveFrequency;
uniform float uBloom;
uniform float uBloomRadius;
uniform float uNoise;
uniform float uVignette;
uniform float uBrightness;
uniform float uPixelation;
uniform float uRgbShift;
uniform vec2 uPointer;
uniform float uMouseStrength;
uniform float uMouseReact;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

vec2 crtCurve(vec2 uv, float radius) {
  vec2 p = (uv - 0.5) * 2.0;
  float safeRadius = max(radius, 1.415);
  float cornerScale = safeRadius / sqrt(max(safeRadius * safeRadius - 2.0, 0.001));
  p = safeRadius * p / sqrt(max(safeRadius * safeRadius - dot(p, p), 0.001));
  p /= cornerScale;
  return p * 0.5 + 0.5;
}

float referencePlasma(vec2 uv, float t) {
  float frequencyScale = max(uWaveFrequency / 2.2, 0.001);
  uv = (uv - 0.5) * frequencyScale + 0.5;

  float scanline = 0.5 - 0.5 * cos(uv.y * 3.14159265 * uScanlineFrequency);
  scanline = mix(1.0, scanline, uScanlineStrength);

  uv *= vec2(80.0, 24.0);
  uv = ceil(uv);
  uv /= vec2(80.0, 24.0);

  float amplitude = uWaveAmplitude / 0.28;
  float field = 0.0;
  field += 0.7 * sin(0.5 * uv.x + t / 5.0);
  field += 3.0 * sin(1.6 * uv.y + t / 5.0);
  field += sin(10.0 * (uv.y * sin(t / 2.0) + uv.x * cos(t / 5.0)) + t / 2.0);

  float cx = uv.x + 0.5 * sin(t / 2.0);
  float cy = uv.y + 0.5 * cos(t / 4.0);
  field += 0.4 * sin(sqrt(100.0 * cx * cx + 100.0 * cy * cy + 1.0) + t);
  field += 0.9 * sin(sqrt(75.0 * cx * cx + 25.0 * cy * cy + 1.0) + t);
  field -= 1.4 * sin(sqrt(256.0 * cx * cx + 25.0 * cy * cy + 1.0) + t);
  field += 0.3 * sin(0.5 * uv.y + uv.x + sin(t));

  return scanline * floor(3.0 * (0.5 + 0.499 * sin(field * amplitude))) / 3.0;
}

void main() {
  vec2 uv = vUv;
  if (uPixelation > 1.001) {
    vec2 cells = max(uResolution / uPixelation, vec2(1.0));
    uv = (floor(uv * cells) + 0.5) / cells;
  }

  float curveRadius = 1.1 + 0.42 / max(uCurvature, 0.001);
  if (uMouseReact > 0.5) {
    curveRadius *= exp(-uPointer.y * uMouseStrength * 0.4);
  }
  vec2 curvedUv = crtCurve(uv, curveRadius);
  if (uMouseReact > 0.5) {
    curvedUv.x -= uPointer.x * uMouseStrength * 0.035;
  }

  float signal = referencePlasma(curvedUv, uTime);
  float radius = 0.01 * uBloomRadius;
  float glow = signal * 0.2;
  glow += referencePlasma(curvedUv + vec2(radius, 0.0), uTime) * 0.12;
  glow += referencePlasma(curvedUv - vec2(radius, 0.0), uTime) * 0.12;
  glow += referencePlasma(curvedUv + vec2(0.0, radius), uTime) * 0.12;
  glow += referencePlasma(curvedUv - vec2(0.0, radius), uTime) * 0.12;
  glow += referencePlasma(curvedUv + vec2(radius), uTime) * 0.08;
  glow += referencePlasma(curvedUv - vec2(radius), uTime) * 0.08;
  glow += referencePlasma(curvedUv + vec2(radius, -radius), uTime) * 0.08;
  glow += referencePlasma(curvedUv + vec2(-radius, radius), uTime) * 0.08;

  float redSignal = referencePlasma(curvedUv + vec2(uRgbShift, 0.0), uTime);
  float blueSignal = referencePlasma(curvedUv - vec2(uRgbShift, 0.0), uTime);
  vec3 channelSignal = vec3(redSignal, signal, blueSignal);
  vec3 waveColor = uColor * (0.3 + signal * 0.7 + glow * uBloom * 0.65);
  waveColor += (channelSignal - signal) * 0.42;

  float edge = clamp(1.0 - dot(vUv - 0.5, vUv - 0.5) * 2.0, 0.0, 1.0);
  float edgeFade = mix(1.0, smoothstep(0.0, 1.0, edge), uVignette);
  float waveMask = clamp(signal * 0.82 + glow * 0.52, 0.0, 1.0) * edgeFade;

  float grain = hash21(gl_FragCoord.xy + vec2(fract(uTime) * 173.0));
  waveColor = max(waveColor * uBrightness, vec3(0.0));
  vec3 color = mix(uBackgroundColor, waveColor, waveMask);
  color += (grain - 0.5) * uNoise;
  gl_FragColor = vec4(max(color, vec3(0.0)), 1.0);
}
`;

const DEFAULTS = {
  color: '#7eb4ff',
  backgroundColor: '#0c0d0b',
  speed: 0.35,
  curvature: 0.22,
  scanlineStrength: 0.18,
  scanlineFrequency: 160,
  waveAmplitude: 0.22,
  waveFrequency: 2,
  bloom: 1.05,
  bloomRadius: 1,
  noise: 0.07,
  vignette: 0.4,
  brightness: 1.05,
  pixelation: 1,
  rgbShift: 0.01,
  mouseStrength: 0.4,
  mouseReact: 1,
  fps: 30,
  dpr: 1,
};

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  const srgb = [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255];
  // three.js Color.set() converts sRGB -> linear
  return srgb.map((c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
}

class CrtWarp extends HTMLElement {
  connectedCallback() {
    if (this._canvas) return;
    this.style.display = 'block';
    this.style.position = 'relative';
    this.style.overflow = 'hidden';

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'width:100%;height:100%;display:block';
    this._canvas = canvas;
    this.appendChild(canvas);

    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
    if (!gl) {
      this.style.background = DEFAULTS.backgroundColor;
      return;
    }
    this._gl = gl;

    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s));
      return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    this._prog = prog;

    const quad = new Float32Array([-1, -1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0]);
    const uvs = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]);
    const bind = (name, data, size) => {
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, name);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
    };
    bind('position', quad, 3);
    bind('uv', uvs, 2);

    this._u = {};
    for (const k of ['uResolution', 'uTime', 'uColor', 'uBackgroundColor', 'uCurvature',
      'uScanlineStrength', 'uScanlineFrequency', 'uWaveAmplitude', 'uWaveFrequency', 'uBloom',
      'uBloomRadius', 'uNoise', 'uVignette', 'uBrightness', 'uPixelation', 'uRgbShift',
      'uPointer', 'uMouseStrength', 'uMouseReact']) {
      this._u[k] = gl.getUniformLocation(prog, k);
    }

    this._time = 0;
    this._pointer = [0, 0];
    this._pointerTarget = [0, 0];
    this._visible = true;
    this._last = 0;
    this._paused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this._ro = new ResizeObserver(() => this._resize());
    this._ro.observe(this);
    this._resize();

    this._io = new IntersectionObserver(([e]) => { this._visible = e ? e.isIntersecting : false; });
    this._io.observe(this);

    this._onMove = (e) => {
      const r = this.getBoundingClientRect();
      this._pointerTarget = [
        ((e.clientX - r.left) / Math.max(r.width, 1)) * 2 - 1,
        -(((e.clientY - r.top) / Math.max(r.height, 1)) * 2 - 1),
      ];
    };
    this._onLeave = () => { this._pointerTarget = [0, 0]; };
    this.addEventListener('pointermove', this._onMove, { passive: true });
    this.addEventListener('pointerleave', this._onLeave);

    this._loop = (now) => {
      this._raf = requestAnimationFrame(this._loop);
      if (!this._visible || document.hidden) return;
      const interval = 1000 / DEFAULTS.fps;
      if (now - this._last < interval) return;
      const delta = Math.min((now - this._last) / 1000 || 1 / DEFAULTS.fps, 0.1);
      this._last = now - ((now - this._last) % interval);
      if (!this._paused) this._time += delta * DEFAULTS.speed;
      this._pointer = [
        this._pointer[0] + (this._pointerTarget[0] - this._pointer[0]) * 0.08,
        this._pointer[1] + (this._pointerTarget[1] - this._pointer[1]) * 0.08,
      ];
      this._draw();
    };
    this._raf = requestAnimationFrame(this._loop);
  }

  disconnectedCallback() {
    cancelAnimationFrame(this._raf);
    if (this._ro) this._ro.disconnect();
    if (this._io) this._io.disconnect();
    this.removeEventListener('pointermove', this._onMove);
    this.removeEventListener('pointerleave', this._onLeave);
  }

  _resize() {
    if (!this._gl) return;
    const w = Math.max(this.clientWidth, 1);
    const h = Math.max(this.clientHeight, 1);
    this._canvas.width = w;
    this._canvas.height = h;
    this._gl.viewport(0, 0, w, h);
  }

  _draw() {
    const gl = this._gl;
    const u = this._u;
    const d = DEFAULTS;
    gl.useProgram(this._prog);
    gl.uniform2f(u.uResolution, this._canvas.width, this._canvas.height);
    gl.uniform1f(u.uTime, this._time);
    gl.uniform3fv(u.uColor, hexToRgb(this.getAttribute('color') || d.color));
    gl.uniform3fv(u.uBackgroundColor, hexToRgb(this.getAttribute('background-color') || d.backgroundColor));
    gl.uniform1f(u.uCurvature, d.curvature);
    gl.uniform1f(u.uScanlineStrength, d.scanlineStrength);
    gl.uniform1f(u.uScanlineFrequency, d.scanlineFrequency);
    gl.uniform1f(u.uWaveAmplitude, d.waveAmplitude);
    gl.uniform1f(u.uWaveFrequency, d.waveFrequency);
    gl.uniform1f(u.uBloom, d.bloom);
    gl.uniform1f(u.uBloomRadius, d.bloomRadius);
    gl.uniform1f(u.uNoise, d.noise);
    gl.uniform1f(u.uVignette, d.vignette);
    gl.uniform1f(u.uBrightness, d.brightness);
    gl.uniform1f(u.uPixelation, d.pixelation);
    gl.uniform1f(u.uRgbShift, d.rgbShift);
    gl.uniform2fv(u.uPointer, this._pointer);
    gl.uniform1f(u.uMouseStrength, d.mouseStrength);
    gl.uniform1f(u.uMouseReact, d.mouseReact);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

if (!customElements.get('crt-warp')) customElements.define('crt-warp', CrtWarp);
