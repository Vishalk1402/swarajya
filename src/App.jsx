import { useEffect, useRef, useState } from 'react';
import SceneIntro from './components/SceneIntro';
import SceneSunrise from './components/SceneSunrise';
import ScenePresence from './components/ScenePresence';
import SceneOath from './components/SceneOath';
import SceneClosing from './components/SceneClosing';



const MAX_SCENE = 4;
const LOCK_TIME = 1000; // ⏳ cinematic pacing (adjust 800–1200)

export default function App() {
  const [scene, setScene] = useState(0);
  const lockRef = useRef(false);
  const touchStartY = useRef(0);

  // 🔁 ONE scene change per gesture (bulletproof)
  const changeScene = (dir) => {
    if (lockRef.current) return;

    // 🔒 lock immediately
    lockRef.current = true;

    setScene((prev) => {
      return dir === 'down'
        ? Math.min(prev + 1, MAX_SCENE)
        : Math.max(prev - 1, 0);
    });

    // 🔓 unlock after delay
    setTimeout(() => {
      lockRef.current = false;
    }, LOCK_TIME);
  };

  useEffect(() => {
    // 🖱️ mouse / trackpad
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) < 25) return; // prevent micro-scrolls
      changeScene(e.deltaY > 0 ? 'down' : 'up');
    };

    // 📱 touch (mobile)
    const onTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchEnd = (e) => {
      const diff = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(diff) < 40) return;
      changeScene(diff > 0 ? 'down' : 'up');
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <>
      {/* 🌑 Scene 0 */}
      <SceneIntro active={scene === 0} />

      {/* 🌅 Scene 1 (stays alive under Presence) */}
      <SceneSunrise
        active={scene >= 1}
        dimmed={scene >= 2}
      />

      {/* 👑 Scene 2 */}
      <ScenePresence active={scene === 2} />
      <SceneOath active={scene === 3} />
      <SceneClosing active={scene === 4} />
    </>
  );
}
