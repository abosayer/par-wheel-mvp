'use client';
import React, { useMemo } from 'react';
import { RISK_FACTORS } from '@/lib/data';
import { parFraction } from '@/lib/calc';

export default function Nomogram() {
  const w = 520, h = 220, pad = 40;
  const xLeft = pad, xMid = w/2, xRight = w - pad;
  const yScale = (v: number, min: number, max: number) => {
    // invert y (0 at top)
    return pad + (1 - (v - min) / (max - min)) * (h - 2*pad);
  };

  const lines = useMemo(() => {
    return RISK_FACTORS.map(r => {
      const pe = r.pe;
      const rr = r.rr;
      const par = parFraction(pe, rr);
      const p1 = { x: xLeft, y: yScale(pe, 0, 1) };
      const p2 = { x: xMid, y: yScale(rr, 1, 3) };
      const p3 = { x: xRight, y: yScale(par, 0, 0.3) };
      return { id: r.id, color: r.color, p1, p2, p3, name: r.name };
    });
  }, []);

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="mx-auto">
      {/* axes */}
      <line x1={xLeft} y1={pad} x2={xLeft} y2={h-pad} stroke="#cbd5e1"/>
      <line x1={xMid} y1={pad} x2={xMid} y2={h-pad} stroke="#cbd5e1"/>
      <line x1={xRight} y1={pad} x2={xRight} y2={h-pad} stroke="#cbd5e1"/>
      <text x={xLeft} y={20} textAnchor="start" fontSize="11" fill="#334155">Prevalence</text>
      <text x={xMid} y={20} textAnchor="middle" fontSize="11" fill="#334155">RR</text>
      <text x={xRight} y={20} textAnchor="end" fontSize="11" fill="#334155">approx. PAR%</text>

      {lines.map(l => (
        <g key={l.id}>
          <polyline points={`${l.p1.x},${l.p1.y} ${l.p2.x},${l.p2.y} ${l.p3.x},${l.p3.y}`} fill="none" stroke={l.color} strokeWidth={2}/>
        </g>
      ))}
    </svg>
  );
}
