import React, { useEffect } from 'react';
import CibilScorePanel from './CibilScorePanel';

export default function CibilPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="feCibilPage" style={{ background: 'white' }}>
      <CibilScorePanel />
    </div>
  );
}
