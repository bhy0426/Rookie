import { useEffect, useRef } from "react";
import "../styles/components/HangulBackground.css";

type LetterParticle = {
  char: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  rotation: number;
  rotationSpeed: number;
};

const LETTERS = [
  "ㄱ",
  "ㄴ",
  "ㄷ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅅ",
  "ㅇ",
  "ㅈ",
  "ㅎ",
  "ㅏ",
  "ㅓ",
  "ㅗ",
  "ㅜ",
  "ㅡ",
  "ㅣ",
  "숨",
];

const COLORS = ["#1f2937", "#334155", "#475569", "#1e3a8a", "#0f766e", "#4c1d95"];

const PARTICLE_COUNT = 40;
const MOUSE_RADIUS = 96;
const MOUSE_FORCE = 1.55;

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function createParticle(width: number, height: number): LetterParticle {
  return {
    char: LETTERS[Math.floor(Math.random() * LETTERS.length)],
    x: Math.random() * width,
    y: Math.random() * height,
    vx: randomBetween(-0.22, 0.22),
    vy: randomBetween(-0.18, 0.18),
    size: randomBetween(18, 38),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    alpha: randomBetween(0.13, 0.26),
    rotation: randomBetween(-0.35, 0.35),
    rotationSpeed: randomBetween(-0.002, 0.002),
  };
}

function HangulBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // 메인 섹션 진입 감지용 refs
  const gatherModeRef = useRef(false);
  const gatherStartedAtRef = useRef(0);
  const lastGatherEventRef = useRef(-Infinity);
  useEffect(() => {
    const triggerGather = () => {
    const now = performance.now();

    if (now - lastGatherEventRef.current < 1200) {
      return;
    }

    lastGatherEventRef.current = now;
    gatherModeRef.current = true;
    gatherStartedAtRef.current = now;
  };

    window.addEventListener("mainSectionEvent", triggerGather);

    return () => {
      window.removeEventListener("mainSectionEvent", triggerGather);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: -9999, y: -9999 };
    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationId = 0;
    let particles: LetterParticle[] = [];

    const resizeCanvas = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      particles = Array.from({ length: PARTICLE_COUNT }, () => createParticle(width, height));
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const drawParticle = (particle: LetterParticle) => {
      context.save();
      context.translate(particle.x, particle.y);
      context.rotate(particle.rotation);
      context.globalAlpha = particle.alpha;
      context.fillStyle = particle.color;
      context.font = `800 ${particle.size}px Pretendard, Noto Sans KR, sans-serif`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(particle.char, 0, 0);
      context.restore();
    };

    const moveParticle = (particle: LetterParticle) => {
      const now = performance.now(); // 메인 섹션 진입 시 중앙으로 모이기

      if (gatherModeRef.current) {
        const elapsed = now - gatherStartedAtRef.current;
        const centerX = width / 2;
        const centerY = height / 2;

        if (elapsed < 1000) {
          particle.vx += (centerX - particle.x) * 0.004;
          particle.vy += (centerY - particle.y) * 0.004;
        } else {
          const dx = particle.x - centerX;
          const dy = particle.y - centerY;
          const distance = Math.hypot(dx, dy) || 1;

          particle.vx += (dx / distance) * 3;
          particle.vy += (dy / distance) * 3;

          gatherModeRef.current = false;
        }
      }

      const dx = particle.x - mouse.x;
      const dy = particle.y - mouse.y;
      const distance = Math.hypot(dx, dy);

      if (distance > 0 && distance < MOUSE_RADIUS) {
        const pressure = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
        particle.vx += (dx / distance) * pressure * MOUSE_FORCE;
        particle.vy += (dy / distance) * pressure * MOUSE_FORCE;
      }

      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.rotation += particle.rotationSpeed;

      particle.vx *= 0.988;
      particle.vy *= 0.988;

      if (particle.x < -40) particle.x = width + 40;
      if (particle.x > width + 40) particle.x = -40;
      if (particle.y < -40) particle.y = height + 40;
      if (particle.y > height + 40) particle.y = -40;
    };

    const render = () => {
      context.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        if (!reduceMotion) moveParticle(particle);
        drawParticle(particle);
      });

      if (!reduceMotion) {
        animationId = window.requestAnimationFrame(render);
      }
    };

    resizeCanvas();
    render();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="hangulBackground" aria-hidden="true" />;
}

export default HangulBackground;
