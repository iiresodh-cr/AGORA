import React from 'react';

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track" id="marquee"></div>
    </div>
  );
}
