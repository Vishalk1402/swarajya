import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './SceneIntro.scss';

export default function SceneIntro({ active }) {
  const sceneRef = useRef(null);

  useEffect(() => {
    gsap.to(sceneRef.current, {
      opacity: active ? 1 : 0,
      duration: 0.4,
      pointerEvents: active ? 'auto' : 'none',
    });
  }, [active]);

  return (
    <section className="scene intro" ref={sceneRef}>
      <div className="fog" />
      <p className="intro-text">The <span className='text'>Shivneri Fort</span>,<br /> 17th Century</p>
    </section>
  );
}
