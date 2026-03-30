"use client";

import { useEffect, useRef } from "react";

function clampMin(value, min) {
  return value < min ? min : value;
}

/**
 * Canvas-driven moving shape grid with hover highlights.
 * Uses `ResizeObserver` for sizing; uses `window` pointer events to keep hover active even when UI overlays the canvas.
 */
export default function ShapeGrid({
  direction = "right",
  speed = 1,
  borderColor = "#999",
  squareSize = 40,
  hoverFillColor = "#222",
  shape = "square",
  hoverTrailAmount = 0,
  className = "",
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);

  const numXRef = useRef(0);
  const numYRef = useRef(0);
  const gridOffsetRef = useRef({ x: 0, y: 0 });
  const hoveredCellRef = useRef(null);

  const trailCellsRef = useRef([]);
  const cellOpacitiesRef = useRef(new Map());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const isHex = shape === "hexagon";
    const isTri = shape === "triangle";
    const hexHoriz = squareSize * 1.5;
    const hexVert = squareSize * Math.sqrt(3);

    const setCanvasSize = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (w <= 0 || h <= 0) return;
      const dpr = Math.min(globalThis.devicePixelRatio ?? 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      numXRef.current = Math.ceil(w / squareSize) + 1;
      numYRef.current = Math.ceil(h / squareSize) + 1;
    };

    const ro = new ResizeObserver(() => setCanvasSize());
    ro.observe(canvas);
    setCanvasSize();

    const drawHex = (cx, cy, size) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const vx = cx + size * Math.cos(angle);
        const vy = cy + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(vx, vy);
        else ctx.lineTo(vx, vy);
      }
      ctx.closePath();
    };

    const drawCircle = (cx, cy, size) => {
      ctx.beginPath();
      ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
      ctx.closePath();
    };

    const drawTriangle = (cx, cy, size, flip) => {
      ctx.beginPath();
      if (flip) {
        ctx.moveTo(cx, cy + size / 2);
        ctx.lineTo(cx + size / 2, cy - size / 2);
        ctx.lineTo(cx - size / 2, cy - size / 2);
      } else {
        ctx.moveTo(cx, cy - size / 2);
        ctx.lineTo(cx + size / 2, cy + size / 2);
        ctx.lineTo(cx - size / 2, cy + size / 2);
      }
      ctx.closePath();
    };

    const drawGrid = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (w <= 0 || h <= 0) return;

      ctx.clearRect(0, 0, w, h);
      ctx.globalAlpha = 1;

      if (isHex) {
        const colShift = Math.floor(gridOffsetRef.current.x / hexHoriz);
        const offsetX = ((gridOffsetRef.current.x % hexHoriz) + hexHoriz) % hexHoriz;
        const offsetY = ((gridOffsetRef.current.y % hexVert) + hexVert) % hexVert;

        const cols = Math.ceil(w / hexHoriz) + 3;
        const rows = Math.ceil(h / hexVert) + 3;

        for (let col = -2; col < cols; col++) {
          for (let row = -2; row < rows; row++) {
            const cx = col * hexHoriz + offsetX;
            const cy =
              row * hexVert +
              (((col + colShift) % 2 + 2) % 2 !== 0 ? hexVert / 2 : 0) +
              offsetY;

            const cellKey = `${col},${row}`;
            const alpha = cellOpacitiesRef.current.get(cellKey);
            if (alpha) {
              ctx.globalAlpha = alpha;
              drawHex(cx, cy, squareSize);
              ctx.fillStyle = hoverFillColor;
              ctx.fill();
              ctx.globalAlpha = 1;
            }

            drawHex(cx, cy, squareSize);
            ctx.strokeStyle = borderColor;
            ctx.stroke();
          }
        }
      } else if (isTri) {
        const halfW = squareSize / 2;
        const colShift = Math.floor(gridOffsetRef.current.x / halfW);
        const rowShift = Math.floor(gridOffsetRef.current.y / squareSize);
        const offsetX = ((gridOffsetRef.current.x % halfW) + halfW) % halfW;
        const offsetY =
          ((gridOffsetRef.current.y % squareSize) + squareSize) % squareSize;

        const cols = Math.ceil(w / halfW) + 4;
        const rows = Math.ceil(h / squareSize) + 4;

        for (let col = -2; col < cols; col++) {
          for (let row = -2; row < rows; row++) {
            const cx = col * halfW + offsetX;
            const cy = row * squareSize + squareSize / 2 + offsetY;
            const flip =
              (((col + colShift + row + rowShift) % 2) + 2) % 2 !== 0;

            const cellKey = `${col},${row}`;
            const alpha = cellOpacitiesRef.current.get(cellKey);
            if (alpha) {
              ctx.globalAlpha = alpha;
              drawTriangle(cx, cy, squareSize, flip);
              ctx.fillStyle = hoverFillColor;
              ctx.fill();
              ctx.globalAlpha = 1;
            }

            drawTriangle(cx, cy, squareSize, flip);
            ctx.strokeStyle = borderColor;
            ctx.stroke();
          }
        }
      } else if (shape === "circle") {
        const offsetX =
          ((gridOffsetRef.current.x % squareSize) + squareSize) % squareSize;
        const offsetY =
          ((gridOffsetRef.current.y % squareSize) + squareSize) % squareSize;

        const cols = Math.ceil(w / squareSize) + 3;
        const rows = Math.ceil(h / squareSize) + 3;

        for (let col = -2; col < cols; col++) {
          for (let row = -2; row < rows; row++) {
            const cx = col * squareSize + squareSize / 2 + offsetX;
            const cy = row * squareSize + squareSize / 2 + offsetY;

            const cellKey = `${col},${row}`;
            const alpha = cellOpacitiesRef.current.get(cellKey);
            if (alpha) {
              ctx.globalAlpha = alpha;
              drawCircle(cx, cy, squareSize);
              ctx.fillStyle = hoverFillColor;
              ctx.fill();
              ctx.globalAlpha = 1;
            }

            drawCircle(cx, cy, squareSize);
            ctx.strokeStyle = borderColor;
            ctx.stroke();
          }
        }
      } else {
        const offsetX =
          ((gridOffsetRef.current.x % squareSize) + squareSize) % squareSize;
        const offsetY =
          ((gridOffsetRef.current.y % squareSize) + squareSize) % squareSize;

        const cols = Math.ceil(w / squareSize) + 3;
        const rows = Math.ceil(h / squareSize) + 3;

        for (let col = -2; col < cols; col++) {
          for (let row = -2; row < rows; row++) {
            const sx = col * squareSize + offsetX;
            const sy = row * squareSize + offsetY;

            const cellKey = `${col},${row}`;
            const alpha = cellOpacitiesRef.current.get(cellKey);
            if (alpha) {
              ctx.globalAlpha = alpha;
              ctx.fillStyle = hoverFillColor;
              ctx.fillRect(sx, sy, squareSize, squareSize);
              ctx.globalAlpha = 1;
            }

            ctx.strokeStyle = borderColor;
            ctx.strokeRect(sx, sy, squareSize, squareSize);
          }
        }
      }

      const gradient = ctx.createRadialGradient(
        w / 2,
        h / 2,
        0,
        w / 2,
        h / 2,
        Math.sqrt(w * w + h * h) / 2
      );
      gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      gradient.addColorStop(1, "#060010");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
    };

    const updateCellOpacities = () => {
      const targets = new Map();

      if (hoveredCellRef.current) {
        targets.set(`${hoveredCellRef.current.x},${hoveredCellRef.current.y}`, 1);
      }

      if (hoverTrailAmount > 0) {
        const tLen = trailCellsRef.current.length;
        for (let i = 0; i < tLen; i++) {
          const c = trailCellsRef.current[i];
          const key = `${c.x},${c.y}`;
          if (!targets.has(key)) {
            targets.set(key, (tLen - i) / (tLen + 1));
          }
        }
      }

      for (const [key] of targets) {
        if (!cellOpacitiesRef.current.has(key)) {
          cellOpacitiesRef.current.set(key, 0);
        }
      }

      for (const [key, opacity] of cellOpacitiesRef.current) {
        const target = targets.get(key) ?? 0;
        const next = opacity + (target - opacity) * 0.15;
        if (next < 0.005) cellOpacitiesRef.current.delete(key);
        else cellOpacitiesRef.current.set(key, next);
      }
    };

    const updateAnimation = () => {
      const effectiveSpeed = clampMin(speed, 0.1);
      const wrapX = isHex ? hexHoriz * 2 : squareSize;
      const wrapY = isHex ? hexVert : isTri ? squareSize * 2 : squareSize;

      switch (direction) {
        case "right":
          gridOffsetRef.current.x =
            (gridOffsetRef.current.x - effectiveSpeed + wrapX) % wrapX;
          break;
        case "left":
          gridOffsetRef.current.x =
            (gridOffsetRef.current.x + effectiveSpeed + wrapX) % wrapX;
          break;
        case "up":
          gridOffsetRef.current.y =
            (gridOffsetRef.current.y + effectiveSpeed + wrapY) % wrapY;
          break;
        case "down":
          gridOffsetRef.current.y =
            (gridOffsetRef.current.y - effectiveSpeed + wrapY) % wrapY;
          break;
        case "diagonal":
          gridOffsetRef.current.x =
            (gridOffsetRef.current.x - effectiveSpeed + wrapX) % wrapX;
          gridOffsetRef.current.y =
            (gridOffsetRef.current.y - effectiveSpeed + wrapY) % wrapY;
          break;
        default:
          break;
      }

      updateCellOpacities();
      drawGrid();
      rafRef.current = globalThis.requestAnimationFrame(updateAnimation);
    };

    const updateHoverCellFromPoint = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const mouseX = clientX - rect.left;
      const mouseY = clientY - rect.top;

      if (mouseX < 0 || mouseY < 0 || mouseX > rect.width || mouseY > rect.height) {
        if (hoveredCellRef.current && hoverTrailAmount > 0) {
          trailCellsRef.current.unshift({ ...hoveredCellRef.current });
          if (trailCellsRef.current.length > hoverTrailAmount) {
            trailCellsRef.current.length = hoverTrailAmount;
          }
        }
        hoveredCellRef.current = null;
        return;
      }

      if (isHex) {
        const colShift = Math.floor(gridOffsetRef.current.x / hexHoriz);
        const offsetX = ((gridOffsetRef.current.x % hexHoriz) + hexHoriz) % hexHoriz;
        const offsetY = ((gridOffsetRef.current.y % hexVert) + hexVert) % hexVert;
        const adjustedX = mouseX - offsetX;
        const adjustedY = mouseY - offsetY;

        const col = Math.round(adjustedX / hexHoriz);
        const rowOffset = ((col + colShift) % 2 + 2) % 2 !== 0 ? hexVert / 2 : 0;
        const row = Math.round((adjustedY - rowOffset) / hexVert);

        const prev = hoveredCellRef.current;
        if (!prev || prev.x !== col || prev.y !== row) {
          if (prev && hoverTrailAmount > 0) {
            trailCellsRef.current.unshift({ ...prev });
            if (trailCellsRef.current.length > hoverTrailAmount) {
              trailCellsRef.current.length = hoverTrailAmount;
            }
          }
          hoveredCellRef.current = { x: col, y: row };
        }
      } else if (isTri) {
        const halfW = squareSize / 2;
        const offsetX = ((gridOffsetRef.current.x % halfW) + halfW) % halfW;
        const offsetY = ((gridOffsetRef.current.y % squareSize) + squareSize) % squareSize;

        const adjustedX = mouseX - offsetX;
        const adjustedY = mouseY - offsetY;

        const col = Math.round(adjustedX / halfW);
        const row = Math.floor(adjustedY / squareSize);

        const prev = hoveredCellRef.current;
        if (!prev || prev.x !== col || prev.y !== row) {
          if (prev && hoverTrailAmount > 0) {
            trailCellsRef.current.unshift({ ...prev });
            if (trailCellsRef.current.length > hoverTrailAmount) {
              trailCellsRef.current.length = hoverTrailAmount;
            }
          }
          hoveredCellRef.current = { x: col, y: row };
        }
      } else {
        const offsetX = ((gridOffsetRef.current.x % squareSize) + squareSize) % squareSize;
        const offsetY = ((gridOffsetRef.current.y % squareSize) + squareSize) % squareSize;

        const adjustedX = mouseX - offsetX;
        const adjustedY = mouseY - offsetY;

        const col = shape === "circle" ? Math.round(adjustedX / squareSize) : Math.floor(adjustedX / squareSize);
        const row = shape === "circle" ? Math.round(adjustedY / squareSize) : Math.floor(adjustedY / squareSize);

        const prev = hoveredCellRef.current;
        if (!prev || prev.x !== col || prev.y !== row) {
          if (prev && hoverTrailAmount > 0) {
            trailCellsRef.current.unshift({ ...prev });
            if (trailCellsRef.current.length > hoverTrailAmount) {
              trailCellsRef.current.length = hoverTrailAmount;
            }
          }
          hoveredCellRef.current = { x: col, y: row };
        }
      }
    };

    const onPointerMove = (e) => {
      updateHoverCellFromPoint(e.clientX, e.clientY);
    };

    const onPointerLeave = () => {
      if (hoveredCellRef.current && hoverTrailAmount > 0) {
        trailCellsRef.current.unshift({ ...hoveredCellRef.current });
        if (trailCellsRef.current.length > hoverTrailAmount) {
          trailCellsRef.current.length = hoverTrailAmount;
        }
      }
      hoveredCellRef.current = null;
    };

    globalThis.addEventListener("pointermove", onPointerMove, { passive: true });
    globalThis.addEventListener("blur", onPointerLeave);
    globalThis.addEventListener("pointerleave", onPointerLeave);

    rafRef.current = globalThis.requestAnimationFrame(updateAnimation);

    return () => {
      globalThis.cancelAnimationFrame(rafRef.current);
      globalThis.removeEventListener("pointermove", onPointerMove);
      globalThis.removeEventListener("blur", onPointerLeave);
      globalThis.removeEventListener("pointerleave", onPointerLeave);
      ro.disconnect();
      cellOpacitiesRef.current.clear();
      trailCellsRef.current = [];
    };
  }, [
    direction,
    speed,
    borderColor,
    hoverFillColor,
    squareSize,
    shape,
    hoverTrailAmount,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full border-none block ${className}`.trim()}
      aria-hidden
    />
  );
}

