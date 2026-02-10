import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './SceneOath.scss';

export default function SceneOath({ active }) {
  const sceneRef = useRef(null);
  const swordRef = useRef(null);
  const glintRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (active) {
      // base state
      gsap.set(sceneRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
      });

      // sword is already present (important)
      gsap.set(swordRef.current, { opacity: 1 });
      gsap.set(textRef.current, { opacity: 0 });
      gsap.set(glintRef.current, { opacity: 0, y: -120 });

      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl
        // single respectful glint
        .to(glintRef.current, {
          opacity: 1,
          y: 180,
          duration: 0.6,
        })
        .to(glintRef.current, {
          opacity: 0,
          duration: 0.3,
        })
        // oath text
        .to(textRef.current, {
          opacity: 1,
          duration: 0.6,
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
    <section className="scene oath" ref={sceneRef}>
      <div className="sword-wrapper">
        <img
          ref={swordRef}
          src="/sword.svg"
          alt=""
          className="sword"
        />
        <div ref={glintRef} className="glint" />
      </div>

      <p ref={textRef} className="oath-text">
        Not for conquest.<br />for
        <span className="text"> स्वराज्य.</span>
      </p>
    </section>
  );
}
