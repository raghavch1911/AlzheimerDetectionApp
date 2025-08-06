// src/components/MainLayout.js
import React, { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";

const layoutStyles = {
  wrapper: {
    position: "relative",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    margin: 0,
    padding: 0,
    fontFamily: "Segoe UI, sans-serif",
    background: "#000",
  },
  vanta: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 0,
  },
  content: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    height: "100%",
  },
};

const dullRGB = [17, 51, 68];
const brightRGB = [0, 255, 255];

function MainLayout() {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);
  const fadeTimeout = useRef(null);
  const transitionFrame = useRef(null);

  const rgbToHex = (r, g, b) => (r << 16) + (g << 8) + b;

  const interpolateColor = (from, to, factor) =>
    from.map((v, i) => Math.round(v + (to[i] - v) * factor));

  const setupVanta = (color = rgbToHex(...dullRGB)) => {
    if (vantaEffect.current) return;

    if (window.VANTA?.NET && vantaRef.current) {
      vantaEffect.current = window.VANTA.NET({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: color,
        backgroundColor: 0x000000,
        points: 15.0,
        maxDistance: 25.0,
        spacing: 18.0,
      });
    }
  };

  useEffect(() => {
    setupVanta();

    const smoothFadeToDull = (duration = 3000) => {
      const start = performance.now();
      cancelAnimationFrame(transitionFrame.current);

      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const currentRGB = interpolateColor(brightRGB, dullRGB, progress);

        try {
          vantaEffect.current?.setOptions({ color: rgbToHex(...currentRGB) });
        } catch (err) {
          console.warn("Vanta fade error:", err);
        }

        if (progress < 1) {
          transitionFrame.current = requestAnimationFrame(step);
        }
      };

      transitionFrame.current = requestAnimationFrame(step);
    };

    const handleMouseMove = () => {
      try {
        vantaEffect.current?.setOptions({ color: rgbToHex(...brightRGB) });
      } catch (err) {
        console.warn("Vanta color update error:", err);
      }

      clearTimeout(fadeTimeout.current);
      cancelAnimationFrame(transitionFrame.current);
      fadeTimeout.current = setTimeout(() => smoothFadeToDull(3000), 2000);
    };

    document.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
        setupVanta();
      }
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  return (
    <div style={layoutStyles.wrapper}>
      <div ref={vantaRef} style={layoutStyles.vanta}></div>
      <div style={layoutStyles.content}>
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
