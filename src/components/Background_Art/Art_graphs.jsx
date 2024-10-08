import "./Art_graphs.css";
import React, { useEffect, useRef } from "react";

const Art_graphs = () => {
  const canvasRef = useRef(null);
  const stars = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const FPS = 60;
  const starCount = 100;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = 742;

    for (let i = 0; i < starCount; i++) {
      stars.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1 + 1,
        vx: Math.floor(Math.random() * 50) - 25,
        vy: Math.floor(Math.random() * 50) - 25,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < stars.current.length; i++) {
        const s = stars.current[i];
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.stroke();
      }

      ctx.beginPath();
      for (let i = 0; i < stars.current.length; i++) {
        const starI = stars.current[i];
        ctx.moveTo(starI.x, starI.y);
        if (distance(mouse.current, starI) < 150)
          ctx.lineTo(mouse.current.x, mouse.current.y);

        for (let j = 0; j < stars.current.length; j++) {
          const starII = stars.current[j];
          if (distance(starI, starII) < 150) {
            ctx.lineTo(starII.x, starII.y);
          }
        }
      }

      ctx.lineWidth = 0.05;
      ctx.strokeStyle = "white";
      ctx.stroke();

    };

    const update = () => {
      for (let i = 0; i < stars.current.length; i++) {
        const s = stars.current[i];
        s.x += s.vx / FPS;
        s.y += s.vy / FPS;

      
        if (s.x < 0 || s.x > canvas.width) s.vx = -s.vx;
        if (s.y < 0 || s.y > canvas.height) s.vy = -s.vy;

      }
    };

    const distance = (point1, point2) => {
      const xs = point2.x - point1.x;
      const ys = point2.y - point1.y;
      return Math.sqrt(xs * xs + ys * ys);

    };

    const tick = () => { //Atualiza os pontos e suas arestas
      draw();
      update();
      requestAnimationFrame(tick);
    };

    
    const handleMouseMove = (e) => { //as arestas se movem em direção ao cursor do mouse
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

   
    canvas.addEventListener("mousemove", handleMouseMove);

    tick();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [FPS, starCount]);

  return <canvas ref={canvasRef} style={{ display: "block" }} />;
};

export default Art_graphs;
