import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PointMaterial } from '@react-three/drei';
// @ts-ignore
import * as random from 'maath/random/dist/maath-random.esm';
import * as THREE from 'three';

function StarMesh(props: any) {
  const ref = useRef<THREE.Points>(null);
  
  // Use a fixed random sphere distribution
  const originalPositions = useMemo(() => {
    return random.inSphere(new Float32Array(5000), { radius: 2 }) as Float32Array;
  }, []);
  
  const positions = useMemo(() => new Float32Array(originalPositions), [originalPositions]);

  useFrame((state, delta) => {
    if (ref.current) {
      // Slow ambient rotation
      ref.current.rotation.x -= delta / 20;
      ref.current.rotation.y -= delta / 30;

      // Subtle interaction logic:
      // Get the mouse coordinates normalized (-1 to 1)
      const { x, y } = state.pointer;
      // Convert normalized screen coords to roughly the same scale as the particles (z ~ 0)
      // The camera is at z=1, looking at z=0. 
      // The particles radius is 2, so let's scale the pointer to [-2, 2] roughly
      const pointerVec = new THREE.Vector3(x * 2, y * 2, 0);
      
      // We apply the inverse of the group's rotation so we can compare pointerVec with un-rotated particle positions
      const invRotation = new THREE.Euler(-ref.current.rotation.x, -ref.current.rotation.y, -ref.current.rotation.z);
      const pointerLocal = pointerVec.clone().applyEuler(invRotation);

      const positionsAttr = ref.current.geometry.attributes.position;
      
      // The repel physics
      for (let i = 0; i < positions.length; i += 3) {
        const ox = originalPositions[i];
        const oy = originalPositions[i + 1];
        const oz = originalPositions[i + 2];
        
        const cx = positionsAttr.array[i];
        const cy = positionsAttr.array[i + 1];
        const cz = positionsAttr.array[i + 2];

        // Vector from particle to pointer (in local space)
        const dx = ox - pointerLocal.x;
        const dy = oy - pointerLocal.y;
        
        // Only consider X/Y distance since it's a 2D mouse on screen, but particles have depth
        // Add a small z influence if desired, but 2D is usually fine
        const distSq = dx * dx + dy * dy;
        const radiusSq = 0.5; // Interaction radius squared

        if (distSq < radiusSq) {
          // Inside interaction radius -> Repel
          const dist = Math.sqrt(distSq);
          const force = (0.7 - dist) * 0.1; // Repel strength
          
          positionsAttr.array[i] = ox + (dx / dist) * force;
          positionsAttr.array[i + 1] = oy + (dy / dist) * force;
        } else {
          // Outside radius -> Ease back to original position
          positionsAttr.array[i] += (ox - cx) * 0.05;
          positionsAttr.array[i + 1] += (oy - cy) * 0.05;
          positionsAttr.array[i + 2] += (oz - cz) * 0.05;
        }
      }
      positionsAttr.needsUpdate = true;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <points ref={ref} frustumCulled={false} {...props}>
        <bufferGeometry>
          {/* @ts-ignore */}
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <PointMaterial
          transparent
          color="#00f5d4"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

const GlobalBackground = () => {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none', background: 'var(--bg-deep)' }}>
      {/* Soft gradient overlay to blend the points */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 0%, var(--bg-deep) 100%)', zIndex: 1 }} />
      <Canvas camera={{ position: [0, 0, 1] }} style={{ zIndex: 0 }}>
        <StarMesh />
      </Canvas>
    </div>
  );
};

export default GlobalBackground;
