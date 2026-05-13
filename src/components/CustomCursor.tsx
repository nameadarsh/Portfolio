import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useVelocity, useAnimationFrame } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Motion values for smooth tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for position
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Velocity to calculate stretching
  const velocityX = useVelocity(smoothX);
  const velocityY = useVelocity(smoothY);

  const scaleX = useMotionValue(1);
  const scaleY = useMotionValue(1);
  const rotate = useMotionValue(0);

  useAnimationFrame(() => {
    const vx = velocityX.get();
    const vy = velocityY.get();
    const speed = Math.sqrt(vx * vx + vy * vy);
    
    // Liquid stretch deformation based on velocity
    if (!isHovering) {
      scaleX.set(Math.min(Math.max(1 + speed / 2000, 1), 1.4));
      scaleY.set(Math.max(1 - speed / 2000, 0.8));
    } else {
      scaleX.set(1);
      scaleY.set(1);
    }
    
    // Direction of movement
    if (speed > 10) {
      const angle = Math.atan2(vy, vx);
      rotate.set((angle * 180) / Math.PI);
    }
  });

  useEffect(() => {
    // Detect touch device to disable custom cursor
    if (window.matchMedia("(pointer: coarse)").matches || 'ontouchstart' in window) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('hover-target')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  if (isTouchDevice) return null;

  // Sizes for normal and hover states
  const baseSize = 24;
  const hoverSize = 64;
  const currentSize = isHovering ? hoverSize : baseSize;

  return (
    <>
      {/* Hide default cursor only on desktop */}
      <style>
        {`
          body, a, button, .hover-target {
            cursor: none !important;
          }
        `}
      </style>
      
      {/* Container holding the transform logic */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: smoothX,
          y: smoothY,
          width: currentSize,
          height: currentSize,
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          scaleX,
          scaleY,
          rotate,
        }}
      >
        {/* Pure inverted droplet */}
        <motion.div
          animate={{
            scale: isClicking ? 0.8 : 1,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            mixBlendMode: 'difference',
          }}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;
