import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './SceneClosing.scss';

export default function SceneClosing({ active }) {
  const sceneRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (active) {
      gsap.set(sceneRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
      });

      gsap.fromTo(
        textRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
        }
      );
    } else {
      gsap.to(sceneRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.5,
      });
    }
  }, [active]);

  return (
    <section className="scene closing" ref={sceneRef}>
      <p ref={textRef} className="closing-text">
        Now that shaped a <span className='text'>Nation</span>.
      </p>
    </section>
  );
}
