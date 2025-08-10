'use client';
import React from 'react';
import { RISK_FACTORS } from '@/lib/data';

export default function Wheel() {
  // Simple placeholder wheel: rings & labels for domains
  const size = 280, rOuter = 130, rInner = 90;
  const center = size/2;
  const domains = Array.from(new Set(RISK_FACTORS.map(r => r.domain)));
  const slice = (2*Math.PI)/domains.length;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto">
      <circle cx={center} cy={center} r={rOuter} fill="#f1f5f9"/>
      <circle cx={center} cy={center} r={rInner} fill="#ffffff" stroke="#e5e7eb"/>
      {domains.map((d, i) => {
        const angle = i*slice + slice/2;
        const x = center + (rOuter-10) * Math.cos(angle);
        const y = center + (rOuter-10) * Math.sin(angle);
        return (
          <text key={d} x={x} y={y} textAnchor="middle" fontSize="11" fill="#334155">{d}</text>
        );
      })}
      <text x={center} y={center} textAnchor="middle" fontSize="12" fill="#0f172a">Nomogram</text>
    </svg>
  );
}
