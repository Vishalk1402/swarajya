import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './SceneSunrise.scss';

export default function SceneSunrise({ active, dimmed }) {
  const sceneRef = useRef(null);
  const textRef = useRef(null);
  const playedRef = useRef(false);


  useEffect(() => {
    if (!active || playedRef.current) return;

    playedRef.current = true;

    gsap.timeline()
      .to(sceneRef.current, { opacity: 1, duration: 0.8 })
      .to('.sun', { y: 0, opacity: 1, duration: 1.2 }, '-=0.4')
      .to('.fort', { opacity: 1, y: 0, duration: 1.2 }, '-=0.9')
      .to(textRef.current, { opacity: 1, duration: 0.8 }, '-=0.6');
  }, [active]);


  useEffect(() => {
    if (active) {
      gsap.to(sceneRef.current, {
        opacity: dimmed ? 0.15 : 1,
        duration: 0.6,
        ease: 'power2.out',
        pointerEvents: dimmed ? 'none' : 'auto',
      });

      // 🔑 TEXT CONTROL (this is the fix)
      gsap.to(textRef.current, {
        opacity: dimmed ? 0 : 1,
        duration: 0.4,
      });

    } else {
      gsap.to(sceneRef.current, {
        opacity: 0,
        duration: 0.4,
        pointerEvents: 'none',
      });

      gsap.set(textRef.current, { opacity: 0 });
    }
  }, [active, dimmed]);

  return (
    <section className="scene sunrise" ref={sceneRef}>
      <div className="sky" />
      <div className="sun" />
      <div className="fort" />
      <p ref={textRef} className="sunrise-text">
        From these hills…
      </p>
    </section>
  );
}
