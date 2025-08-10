'use client';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { RISK_FACTORS } from '../lib/data';
import { parFraction, combinedParFraction } from '../lib/calc';
import Wheel from '../components/Wheel';
import Nomogram from '../components/Nomogram';

type FactorState = { id: string; pe: number; enabled: boolean };

export default function Page() {
  const [factors, setFactors] = useState<FactorState[]>(
    RISK_FACTORS.map(f => ({ id: f.id, pe: f.pe, enabled: true }))
  );

  const rows = useMemo(() => {
    return factors.map(fs => {
      const meta = RISK_FACTORS.find(r => r.id === fs.id)!;
      const parBase = parFraction(meta.pe, meta.rr);
      const parNew = parFraction(fs.pe, meta.rr);
      return { ...meta, peNew: fs.pe, parBase, parNew, enabled: fs.enabled };
    });
  }, [factors]);

  const combinedBase = useMemo(() => combinedParFraction(rows.filter(r=>r.enabled).map(r=>r.parBase)), [rows]);
  const combinedNew  = useMemo(() => combinedParFraction(rows.filter(r=>r.enabled).map(r=>r.parNew)), [rows]);

  const toggle = (id: string) => setFactors(prev => prev.map(x => x.id === id ? { ...x, enabled: !x.enabled } : x));
  const updatePe = (id: string, v: number) => setFactors(prev => prev.map(x => x.id === id ? { ...x, pe: v } : x));

  return (
    <main className="min-h-screen">
      <header className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-brand-blue/20" />
          <div>
            <h1 className="text-xl font-semibold">PAR Population Health Wheel — MVP</h1>
            <p className="text-xs text-gray-600">Breast cancer (Saudi women) — data from published study.</p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-4">
          <div className="card">
            <h2 className="text-base font-medium mb-2">Wheel & Nomogram</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Wheel />
              <Nomogram />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {rows.map(row => (
              <div key={row.id} className="card">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-medium text-sm">{row.name}</div>
                    <div className="text-xs text-gray-600">RR: {row.rr.toFixed(2)} · Domain: {row.domain}</div>
                  </div>
                  <label className="inline-flex items-center gap-2 text-xs">
                    <input type="checkbox" checked={row.enabled} onChange={() => toggle(row.id)} />
                    Include
                  </label>
                </div>

                <div className="mt-3">
                  <div className="text-xs text-gray-600 mb-1">Prevalence (Pe)</div>
                  <input type="range" min={0} max={1} step={0.001} value={row.peNew}
                    onChange={e => updatePe(row.id, Number(e.target.value))}
                    className="w-full accent-brand-blue" />
                  <div className="flex justify-between text-xs text-gray-700 mt-1">
                    <span>0%</span>
                    <span className="font-semibold">{Math.round(row.peNew*100)}%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="text-xs text-gray-500">Baseline PAR (reported)</div>
                    <div className="font-semibold">{row.baselinePARpct.toFixed(1)}%</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="text-xs text-gray-500">Baseline PAR (computed)</div>
                    <div className="font-semibold">{(row.parBase*100).toFixed(1)}%</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="text-xs text-gray-500">New PAR</div>
                    <div className="font-semibold">{(row.parNew*100).toFixed(1)}%</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="text-xs text-gray-500">Δ PAR</div>
                    <div className="font-semibold">-{((row.parBase-row.parNew)*100).toFixed(1)}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="space-y-4">
          <div className="card">
            <h3 className="text-base font-medium">Combined PAR (all enabled)</h3>
            <div className="mt-2 grid grid-cols-2 gap-3 text-sm">
              <div className="bg-slate-50 rounded-lg p-3">
                <div className="text-xs text-gray-500">Baseline</div>
                <div className="text-2xl font-semibold">{(combinedBase*100).toFixed(1)}%</div>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <div className="text-xs text-gray-500">New</div>
                <div className="text-2xl font-semibold">{(combinedNew*100).toFixed(1)}%</div>
              </div>
            </div>
            <div className="mt-3 text-xs text-gray-600">
              Combined PAR uses independence approximation: 1 − ∏(1 − PARᵢ).
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
