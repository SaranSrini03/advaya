"use client"
import { useEffect, useRef, useState } from 'react';
import styles from '@/app/globals.css';

export default function Home() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 2000;
    canvas.height = 1600;

    // Game state
    let player = {
      x: 400,
      y: 500,
      width: 40,
      height: 40,
      speed: 7,
      hearts: 3,
      invulnerable: false,
      powerUp: null
    };

    let bullets = [];
    let enemies = [];
    let particles = [];
    let powerUps = [];
    let stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      alpha: Math.random()
    }));

    // Controls
    let keys = { ArrowLeft: false, ArrowRight: false, Space: false };

    // Classes
    class Bullet {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 8;
        this.height = 16;
        this.speed = 9;
        this.color = '#FFEA00';
      }
    }

    class Enemy {
      constructor(type = 'basic') {
        this.type = type;
        this.x = Math.random() * (canvas.width - 40);
        this.y = -40;
        this.width = type === 'fast' ? 25 : 40;
        this.height = type === 'fast' ? 25 : 40;
        this.speed = type === 'fast' ? 5 : 3;
        this.health = type === 'strong' ? 2 : 1;
        this.color = type === 'fast' ? '#FF69B4' : type === 'strong' ? '#00FF00' : '#FF0000';
      }
    }

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 4 + 2;
        this.color = color;
        this.velocity = {
          x: (Math.random() - 0.5) * 5,
          y: (Math.random() - 0.5) * 5
        };
        this.alpha = 1;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }

      update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.015;
        this.draw();
      }
    }

    class PowerUp {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 20;
        this.type = Math.random() < 0.5 ? 'health' : 'shield';
        this.color = this.type === 'health' ? '#FF69B4' : '#00BFFF';
        this.speed = 2;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Game functions
    const createExplosion = (x, y, color) => {
      for (let i = 0; i < 15; i++) {
        particles.push(new Particle(x, y, color));
      }
    };

    const spawnEnemy = () => {
      const types = ['basic', 'fast', 'strong'];
      const type = types[Math.floor(Math.random() * types.length)];
      enemies.push(new Enemy(type));
    };

    const checkCollision = (rect1, rect2) => {
      return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
      );
    };

    const handleDamage = () => {
      if (player.invulnerable) return;
      
      player.hearts--;
      player.invulnerable = true;
      setTimeout(() => (player.invulnerable = false), 2000);
      
      if (player.hearts <= 0) {
        setGameOver(true);
      }
    };

    // Game loop
    const gameLoop = () => {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach(star => {
        star.alpha = (star.alpha + 0.02) % 1;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(Math.sin(star.alpha * Math.PI))})`;
        ctx.fillRect(star.x, star.y, star.size, star.size);
        star.y += 1.5;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });

      // Player movement
      if (keys.ArrowLeft && player.x > 0) player.x -= player.speed;
      if (keys.ArrowRight && player.x < canvas.width - player.width) player.x += player.speed;

      // Shooting
      if (keys.Space) {
        bullets.push(new Bullet(player.x + player.width/2 - 4, player.y));
        keys.Space = false;
      }

      // Draw player
      ctx.fillStyle = player.invulnerable ? 'rgba(255, 255, 255, 0.5)' : '#FFFFFF';
      ctx.beginPath();
      ctx.moveTo(player.x, player.y + player.height);
      ctx.lineTo(player.x + player.width/2, player.y);
      ctx.lineTo(player.x + player.width, player.y + player.height);
      ctx.closePath();
      ctx.fill();

      // Update bullets
      bullets.forEach((bullet, index) => {
        bullet.y -= bullet.speed;
        ctx.fillStyle = bullet.color;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        
        // Bullet trail effect
        ctx.fillStyle = 'rgba(255, 234, 0, 0.3)';
        ctx.fillRect(bullet.x, bullet.y + 10, bullet.width, bullet.height + 5);
        
        if (bullet.y < 0) bullets.splice(index, 1);
      });

      // Update enemies
      enemies.forEach((enemy, eIndex) => {
        enemy.y += enemy.speed;
        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

        // Enemy collision with player
        if (checkCollision(player, enemy)) {
          createExplosion(enemy.x + enemy.width/2, enemy.y + enemy.height/2, enemy.color);
          handleDamage();
          enemies.splice(eIndex, 1);
        }

        // Bullet collision
        bullets.forEach((bullet, bIndex) => {
          if (checkCollision(bullet, enemy)) {
            enemy.health--;
            if (enemy.health <= 0) {
              setScore(s => s + (enemy.type === 'fast' ? 20 : enemy.type === 'strong' ? 30 : 10));
              createExplosion(enemy.x + enemy.width/2, enemy.y + enemy.height/2, enemy.color);
              enemies.splice(eIndex, 1);
              
              // Spawn power-up
              if (Math.random() < 0.3) {
                powerUps.push(new PowerUp(enemy.x + enemy.width/2, enemy.y + enemy.height/2));
              }
            }
            bullets.splice(bIndex, 1);
          }
        });

        if (enemy.y > canvas.height) enemies.splice(eIndex, 1);
      });

      // Update particles
      particles.forEach((particle, index) => {
        particle.update();
        if (particle.alpha <= 0) particles.splice(index, 1);
      });

      // Update power-ups
      powerUps.forEach((powerUp, pIndex) => {
        powerUp.y += powerUp.speed;
        powerUp.draw();
        
        if (checkCollision(player, powerUp)) {
          if (powerUp.type === 'health') {
            player.hearts = Math.min(5, player.hearts + 1);
          } else {
            player.invulnerable = true;
            setTimeout(() => (player.invulnerable = false), 5000);
          }
          powerUps.splice(pIndex, 1);
        }
        
        if (powerUp.y > canvas.height) powerUps.splice(pIndex, 1);
      });

      // UI Drawing
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '20px "Press Start 2P"';
      ctx.fillText(`SCORE: ${score}`, 20, 40);
      
      // Hearts display
      for (let i = 0; i < player.hearts; i++) {
        ctx.beginPath();
        ctx.arc(20 + (i * 40), 70, 15, 0, Math.PI * 2);
        ctx.fillStyle = '#FF1493';
        ctx.fill();
      }

      if (!gameOver) requestAnimationFrame(gameLoop);
    };

    // Event listeners
    const handleKeyDown = (e) => {
      if (e.code in keys) {
        keys[e.code] = true;
        e.preventDefault();
      }
    };

    const handleKeyUp = (e) => {
      if (e.code in keys) {
        keys[e.code] = false;
        e.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    const enemyInterval = setInterval(spawnEnemy, 1500);
    gameLoop();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      clearInterval(enemyInterval);
    };
  }, [gameOver]);

  return (
    <div className={styles.container}>
      {gameOver && (
        <div className={styles.gameOver}>
          <h2>GAME OVER</h2>
          <p>Final Score: {score}</p>
          <button onClick={() => window.location.reload()}>Play Again</button>
        </div>
      )}
      <canvas ref={canvasRef} className={styles.gameCanvas}></canvas>
    </div>
  );
}