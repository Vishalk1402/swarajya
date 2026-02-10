import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './ScenePresence.scss';

export default function ScenePresence({ active }) {
  const sceneRef = useRef(null);
  const figureRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (active) {
      // reset
      gsap.set(sceneRef.current, { opacity: 0.9, pointerEvents: 'auto' });
      gsap.set(figureRef.current, { opacity: 0, filter: 'blur(4px)' });
      gsap.set(textRef.current, { opacity: 0 });

      gsap.timeline({ defaults: { ease: 'power2.out' } })
        .to(figureRef.current, {
          opacity: 0.25,
          duration: 0.6
        })
        .to({}, { duration: 0.3 })
        .to(figureRef.current, {
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.2
        })
        .to(textRef.current, {
          opacity: 1,
          duration: 0.6
        });
    } else {
      gsap.to(sceneRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.4,
      });
    }
  }, [active]);

  return (
    <section className="scene presence" ref={sceneRef}>
      <div className="fog-layer" />

      <img
        ref={figureRef}
        src="/raje.svg"
        alt=""
        className="presence-figure"
      />

      <p ref={textRef} className="presence-text">
        One <span className='text'>resolve</span> was born
      </p>
    </section>
  );
}
