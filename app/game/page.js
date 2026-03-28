"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/app/components/NavBar";

const HIGH_SCORE_KEY = "advaya_shooter_high_v1";

function readHighScore() {
  if (typeof window === "undefined") return 0;
  const n = Number.parseInt(localStorage.getItem(HIGH_SCORE_KEY) || "0", 10);
  return Number.isFinite(n) ? n : 0;
}

function writeHighScore(score) {
  try {
    localStorage.setItem(HIGH_SCORE_KEY, String(score));
  } catch {
    /* ignore */
  }
}

export default function GamePage() {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const restartRef = useRef(() => {});

  const [highScore, setHighScore] = useState(0);
  const [displayScore, setDisplayScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setHighScore(readHighScore());
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const getCssVar = (name) =>
      getComputedStyle(document.documentElement).getPropertyValue(name).trim() || "#05060a";

    let animationId = 0;
    let spawnTimerId = 0;
    let gameTime = 0;
    let score = 0;
    let bestScore = readHighScore();
    let localGameOver = false;
    let localPaused = false;
    let localStarted = false;
    let lastPlayerShot = 0;
    const PLAYER_FIRE_MS = 220;

    const keys = {
      ArrowLeft: false,
      ArrowRight: false,
      KeyA: false,
      KeyD: false,
      Space: false,
    };

    let player = createPlayer();
    let bullets = [];
    let enemyBullets = [];
    let enemies = [];
    let particles = [];
    let powerUps = [];
    let stars = [];

    function createPlayer() {
      return {
        x: 0,
        y: 0,
        width: 56,
        height: 72,
        speed: 8,
        hearts: 3,
        invulnUntil: 0,
        thrust: false,
      };
    }

    class Bullet {
      constructor(x, y, opts = {}) {
        this.x = x;
        this.y = y;
        this.width = opts.width ?? 6;
        this.height = opts.height ?? 14;
        this.speed = opts.speed ?? 11;
        this.vx = opts.vx ?? 0;
        this.vy = opts.vy ?? -this.speed;
        this.color = opts.color ?? "#34d399";
        this.isEnemy = !!opts.isEnemy;
      }
    }

    class Enemy {
      constructor(type = "basic", canvasW) {
        this.type = type;
        this.x = Math.random() * Math.max(40, canvasW - 48);
        this.y = -44;
        this.width = type === "fast" ? 34 : type === "strong" ? 48 : 40;
        this.height = type === "fast" ? 34 : type === "strong" ? 48 : 40;
        this.speed =
          type === "fast" ? 4.2 + Math.random() * 0.8 : 2.8 + Math.random() * 0.6;
        this.health = type === "strong" ? 3 : 1;
        this.color =
          type === "fast"
            ? "#f472b6"
            : type === "strong"
              ? "#4ade80"
              : type === "shooter"
                ? "#fbbf24"
                : "#f87171";
        this.lastShot = 0;
      }

      tryShoot(px, py, pw, ph) {
        if (this.type !== "shooter") return;
        const now = performance.now();
        if (now - this.lastShot < 1400) return;
        const cx = this.x + this.width / 2;
        const cy = this.y + this.height;
        const tcx = px + pw / 2;
        const tcy = py + ph / 2;
        const dx = tcx - cx;
        const dy = tcy - cy;
        const len = Math.hypot(dx, dy) || 1;
        const sp = 5.5;
        enemyBullets.push(
          new Bullet(cx - 3, cy, {
            vx: (dx / len) * sp,
            vy: (dy / len) * sp,
            width: 8,
            height: 8,
            color: "#fb7185",
            isEnemy: true,
            speed: sp,
          })
        );
        this.lastShot = now;
      }
    }

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 4 + 2;
        this.color = color;
        this.velocity = {
          x: (Math.random() - 0.5) * 6,
          y: (Math.random() - 0.5) * 6,
        };
        this.alpha = 1;
      }
      update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.018;
      }
    }

    class PowerUp {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 18;
        this.type = Math.random() < 0.55 ? "health" : "shield";
        this.color = this.type === "health" ? "#f472b6" : "#38bdf8";
        this.speed = 2.2;
      }
    }

    function initStars(cw, ch) {
      stars = Array.from({ length: Math.min(220, Math.floor((cw * ch) / 12000)) }, () => ({
        x: Math.random() * cw,
        y: Math.random() * ch,
        size: Math.random() * 2.2 + 0.5,
        alpha: Math.random(),
      }));
    }

    function resize() {
      const rect = wrap.getBoundingClientRect();
      const w = Math.max(320, Math.floor(rect.width));
      const h = Math.min(Math.max(420, Math.floor(window.innerHeight * 0.72)), 900);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cw = w;
      const ch = h;
      initStars(cw, ch);
      player.x = Math.min(Math.max(player.x, 0), cw - player.width);
      player.y = ch - player.height - 24;
      return { cw, ch };
    }

    let { cw, ch } = resize();
    player.x = cw / 2 - player.width / 2;
    player.y = ch - player.height - 24;

    const ro = new ResizeObserver(() => {
      const r = resize();
      cw = r.cw;
      ch = r.ch;
    });
    ro.observe(wrap);

    function spawnEnemy() {
      if (localGameOver || !localStarted || localPaused) return;
      const roll = Math.random();
      let type = "basic";
      if (roll > 0.92) type = "strong";
      else if (roll > 0.78) type = "shooter";
      else if (roll > 0.55) type = "fast";
      enemies.push(new Enemy(type, cw));
    }

    function spawnIntervalMs() {
      const t = Math.min(gameTime / 60_000, 1);
      return Math.round(1500 - t * 850);
    }

    function scheduleSpawn() {
      clearTimeout(spawnTimerId);
      spawnTimerId = window.setTimeout(() => {
        spawnEnemy();
        scheduleSpawn();
      }, spawnIntervalMs());
    }

    function pointsForEnemy(type) {
      switch (type) {
        case "fast":
          return 75;
        case "strong":
          return 120;
        case "shooter":
          return 150;
        default:
          return 50;
      }
    }

    function createExplosion(x, y, color) {
      for (let i = 0; i < 14; i++) particles.push(new Particle(x, y, color));
    }

    const checkCollision = (a, b) =>
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y;

    function applyScore(delta) {
      score += delta;
      setDisplayScore(score);
    }

    function handleDamage() {
      const now = performance.now();
      if (now < player.invulnUntil) return;
      player.hearts -= 1;
      player.invulnUntil = now + 2000;
      if (player.hearts <= 0) {
        localGameOver = true;
        setGameOver(true);
        if (score > bestScore) {
          bestScore = score;
          writeHighScore(score);
          setHighScore(score);
        }
      }
    }

    function resetGame() {
      localGameOver = false;
      localPaused = false;
      localStarted = true;
      gameTime = 0;
      score = 0;
      setDisplayScore(0);
      setGameOver(false);
      setIsPaused(false);
      player = createPlayer();
      player.x = cw / 2 - player.width / 2;
      player.y = ch - player.height - 24;
      bullets = [];
      enemyBullets = [];
      enemies = [];
      particles = [];
      powerUps = [];
      lastPlayerShot = 0;
      clearTimeout(spawnTimerId);
      scheduleSpawn();
    }

    function togglePause() {
      if (!localStarted || localGameOver) return;
      localPaused = !localPaused;
      setIsPaused(localPaused);
    }

    restartRef.current = () => {
      resetGame();
    };

    function drawRocket(x, y, w, h, thrust) {
      const uiFg = getCssVar("--foreground") || "#e9eefc";
      ctx.save();
      ctx.fillStyle = uiFg;
      ctx.beginPath();
      ctx.moveTo(x + w * 0.3, y + h);
      ctx.lineTo(x + w * 0.7, y + h);
      ctx.lineTo(x + w, y + h * 0.7);
      ctx.lineTo(x + w, y + h * 0.3);
      ctx.lineTo(x + w * 0.7, y);
      ctx.lineTo(x + w * 0.3, y);
      ctx.lineTo(x, y + h * 0.3);
      ctx.lineTo(x, y + h * 0.7);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#34d399";
      ctx.beginPath();
      ctx.arc(x + w / 2, y + h * 0.2, w * 0.14, 0, Math.PI * 2);
      ctx.fill();
      if (thrust) {
        ctx.fillStyle = "#f97316";
        ctx.beginPath();
        ctx.ellipse(x + w / 2, y + h * 1.08, w * 0.14, h * 0.18, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    function drawEnemy(enemy) {
      ctx.save();
      ctx.fillStyle = enemy.color;
      if (enemy.type === "shooter") {
        ctx.beginPath();
        ctx.moveTo(enemy.x, enemy.y);
        ctx.lineTo(enemy.x + enemy.width, enemy.y);
        ctx.lineTo(enemy.x + enemy.width / 2, enemy.y + enemy.height);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
        return;
      }
      switch (enemy.type) {
        case "basic":
          ctx.beginPath();
          ctx.ellipse(
            enemy.x + enemy.width / 2,
            enemy.y + enemy.height / 2,
            enemy.width / 2,
            enemy.height / 4,
            0,
            0,
            Math.PI * 2
          );
          ctx.fill();
          ctx.fillStyle = "#fbbf24";
          ctx.beginPath();
          ctx.arc(
            enemy.x + enemy.width / 2,
            enemy.y + enemy.height / 2,
            enemy.width / 3,
            0,
            Math.PI
          );
          ctx.fill();
          break;
        case "fast":
          ctx.beginPath();
          ctx.moveTo(enemy.x, enemy.y + enemy.height / 2);
          ctx.lineTo(enemy.x + enemy.width / 2, enemy.y);
          ctx.lineTo(enemy.x + enemy.width, enemy.y + enemy.height / 2);
          ctx.lineTo(enemy.x + enemy.width / 2, enemy.y + enemy.height);
          ctx.closePath();
          ctx.fill();
          break;
        case "strong":
          ctx.beginPath();
          ctx.roundRect(enemy.x, enemy.y, enemy.width, enemy.height, 8);
          ctx.fill();
          ctx.fillStyle = "rgba(0,0,0,0.35)";
          ctx.beginPath();
          ctx.arc(
            enemy.x + enemy.width / 2,
            enemy.y + enemy.height / 2,
            enemy.width / 4,
            0,
            Math.PI * 2
          );
          ctx.fill();
          break;
        default:
          break;
      }
      ctx.restore();
    }

    function drawParticles() {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.restore();
        if (p.alpha <= 0) particles.splice(i, 1);
      }
    }

    const gameBg = () => getCssVar("--background");

    function gameLoop() {
      const bg = gameBg();
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, cw, ch);

      const now = performance.now();
      if (localStarted && !localGameOver && !localPaused) {
        gameTime += 16;
      }

      stars.forEach((star) => {
        star.alpha = (star.alpha + 0.015) % 1;
        const a = Math.abs(Math.sin(star.alpha * Math.PI));
        ctx.fillStyle = `rgba(255,255,255,${0.15 + a * 0.55}`;
        ctx.fillRect(star.x, star.y, star.size, star.size);
        star.y += 1.2;
        if (star.y > ch) {
          star.y = 0;
          star.x = Math.random() * cw;
        }
      });

      if (!localStarted) {
        drawHud(bg);
        animationId = requestAnimationFrame(gameLoop);
        return;
      }

      if (localPaused && !localGameOver) {
        drawHud(bg);
        ctx.fillStyle = "rgba(0,0,0,0.45)";
        ctx.fillRect(0, 0, cw, ch);
        ctx.fillStyle = getCssVar("--foreground");
        ctx.font = "600 22px ui-monospace, monospace";
        ctx.textAlign = "center";
        ctx.fillText("Paused", cw / 2, ch / 2 - 8);
        ctx.font = "14px ui-monospace, monospace";
        ctx.fillText("Press P to resume", cw / 2, ch / 2 + 22);
        ctx.textAlign = "left";
        animationId = requestAnimationFrame(gameLoop);
        return;
      }

      if (localGameOver) {
        drawHud(bg);
        animationId = requestAnimationFrame(gameLoop);
        return;
      }

      for (let i = enemyBullets.length - 1; i >= 0; i--) {
        const b = enemyBullets[i];
        b.x += b.vx;
        b.y += b.vy;
        ctx.fillStyle = b.color;
        ctx.fillRect(b.x, b.y, b.width, b.height);
        if (checkCollision(b, player)) {
          handleDamage();
          enemyBullets.splice(i, 1);
          continue;
        }
        if (b.y > ch + 40 || b.y < -40 || b.x < -40 || b.x > cw + 40) {
          enemyBullets.splice(i, 1);
        }
      }

      player.thrust =
        keys.ArrowLeft || keys.ArrowRight || keys.KeyA || keys.KeyD;
      if ((keys.ArrowLeft || keys.KeyA) && player.x > 0) player.x -= player.speed;
      if ((keys.ArrowRight || keys.KeyD) && player.x < cw - player.width) {
        player.x += player.speed;
      }

      if (keys.Space && now - lastPlayerShot > PLAYER_FIRE_MS) {
        bullets.push(
          new Bullet(player.x + player.width / 2 - 3, player.y, {
            color: "#6ee7b7",
            vy: -12,
          })
        );
        lastPlayerShot = now;
      }

      for (let e = enemies.length - 1; e >= 0; e--) {
        const enemy = enemies[e];
        enemy.y += enemy.speed;
        enemy.tryShoot(player.x, player.y, player.width, player.height);
        drawEnemy(enemy);

        if (checkCollision(player, enemy)) {
          createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, enemy.color);
          handleDamage();
          enemies.splice(e, 1);
          continue;
        }

        for (let b = bullets.length - 1; b >= 0; b--) {
          const bullet = bullets[b];
          if (!checkCollision(bullet, enemy)) continue;
          enemy.health -= 1;
          bullets.splice(b, 1);
          if (enemy.health <= 0) {
            applyScore(pointsForEnemy(enemy.type));
            createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, enemy.color);
            enemies.splice(e, 1);
            if (Math.random() < 0.28) {
              powerUps.push(new PowerUp(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2));
            }
          }
          break;
        }

        if (enemy.y > ch + 60) {
          enemies.splice(e, 1);
        }
      }

      for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i];
        bullet.x += bullet.vx;
        bullet.y += bullet.vy;
        ctx.fillStyle = bullet.color;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        ctx.fillStyle = "rgba(52, 211, 153, 0.25)";
        ctx.fillRect(bullet.x, bullet.y + 8, bullet.width, bullet.height + 6);
        if (bullet.y < -20) bullets.splice(i, 1);
      }

      drawParticles();

      for (let p = powerUps.length - 1; p >= 0; p--) {
        const pu = powerUps[p];
        pu.y += pu.speed;
        ctx.beginPath();
        ctx.arc(pu.x, pu.y, pu.size, 0, Math.PI * 2);
        ctx.fillStyle = pu.color;
        ctx.fill();
        if (checkCollision({ x: pu.x - pu.size, y: pu.y - pu.size, width: pu.size * 2, height: pu.size * 2 }, player)) {
          const t = performance.now();
          if (pu.type === "health") {
            applyScore(180);
          } else {
            player.invulnUntil = Math.max(player.invulnUntil, t + 5000);
          }
          powerUps.splice(p, 1);
        }
        if (pu.y > ch + 30) powerUps.splice(p, 1);
      }

      ctx.save();
      const inv = now < player.invulnUntil;
      const blink = inv && Math.floor(now / 100) % 2 === 0;
      ctx.globalAlpha = blink ? 0.4 : 1;
      drawRocket(player.x, player.y, player.width, player.height, player.thrust);
      ctx.restore();

      drawHud(bg);

      animationId = requestAnimationFrame(gameLoop);
    }

    function drawHud(bg) {
      const uiFg = getCssVar("--foreground");
      const accent = getCssVar("--accent") || "#10b981";
      ctx.fillStyle = uiFg;
      ctx.font = "600 16px ui-monospace, monospace";
      ctx.textAlign = "left";
      ctx.fillText(`Score ${score}`, 16, 28);
      ctx.fillStyle = accent;
      ctx.font = "13px ui-monospace, monospace";
      ctx.fillText(`Best ${Math.max(bestScore, score)}`, 16, 48);

      for (let i = 0; i < player.hearts; i++) {
        ctx.beginPath();
        ctx.fillStyle = "#fb7185";
        ctx.arc(22 + i * 28, 72, 11, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = uiFg;
      ctx.font = "12px ui-monospace, monospace";
      ctx.globalAlpha = 0.85;
      ctx.fillText("Arrows / A D move   Space fire   P pause", 16, ch - 14);
      ctx.globalAlpha = 1;

      if (!localStarted) {
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(0, 0, cw, ch);
        ctx.fillStyle = uiFg;
        ctx.font = "700 26px ui-monospace, monospace";
        ctx.textAlign = "center";
        ctx.fillText("Advaya Shooter", cw / 2, ch / 2 - 36);
        ctx.font = "15px ui-monospace, monospace";
        ctx.fillText("Press Enter or Space to start", cw / 2, ch / 2 + 4);
        ctx.font = "13px ui-monospace, monospace";
        ctx.fillText(`High score ${bestScore}`, cw / 2, ch / 2 + 36);
        ctx.textAlign = "left";
      }

      if (localGameOver) {
        ctx.fillStyle = "rgba(0,0,0,0.55)";
        ctx.fillRect(0, 0, cw, ch);
        ctx.fillStyle = uiFg;
        ctx.font = "700 28px ui-monospace, monospace";
        ctx.textAlign = "center";
        ctx.fillText("Game over", cw / 2, ch / 2 - 28);
        ctx.font = "17px ui-monospace, monospace";
        ctx.fillText(`Score ${score}`, cw / 2, ch / 2 + 8);
        ctx.font = "14px ui-monospace, monospace";
        ctx.fillText("Click Play again or press R", cw / 2, ch / 2 + 44);
        ctx.textAlign = "left";
      }
    }

    function onKeyDown(e) {
      if (e.code === "ArrowLeft" || e.code === "ArrowRight" || e.code === "Space") {
        e.preventDefault();
      }
      if (e.code === "KeyA" || e.code === "KeyD") e.preventDefault();

      if (e.code in keys) keys[e.code] = true;

      if (e.code === "Space" || e.code === "Enter") {
        if (!localStarted) {
          resetGame();
        }
      }

      if (e.code === "KeyP") {
        togglePause();
      }

      if (e.code === "KeyR" && localGameOver) {
        resetGame();
      }
    }

    function onKeyUp(e) {
      if (e.code in keys) keys[e.code] = false;
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    scheduleSpawn();
    animationId = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(spawnTimerId);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="page-shell relative min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-4 px-4 pb-10 pt-24 md:pt-28">
        <div className="text-center">
          <h1 className="title-min font-mono text-2xl text-[color:var(--foreground)] md:text-3xl">
            Mini shooter
          </h1>
          <p className="mt-2 text-sm text-[color:var(--muted-text)]">
            Score {displayScore} · Best {Math.max(highScore, displayScore)}
            {isPaused ? " · Paused" : ""}
          </p>
        </div>

        <div
          ref={wrapRef}
          className="section-card relative mx-auto w-full max-w-4xl overflow-hidden rounded-xl border border-[color:var(--surface-border)] p-2 md:p-3"
        >
          <canvas
            ref={canvasRef}
            className="block w-full rounded-lg bg-[color:var(--background)]"
            style={{ touchAction: "none" }}
          />
          {gameOver ? (
            <div className="pointer-events-auto absolute inset-0 flex items-end justify-center pb-6">
              <button
                type="button"
                onClick={() => restartRef.current()}
                className="rounded-full bg-[color:var(--accent)] px-6 py-2.5 font-mono text-sm font-semibold text-[color:var(--button-fg)]"
              >
                Play again
              </button>
            </div>
          ) : null}
        </div>

        <p className="text-center text-xs text-[color:var(--muted-text)]">
          Move with arrow keys or A / D. Fire with Space. P to pause. Survive the waves.
        </p>
      </div>
    </div>
  );
}
