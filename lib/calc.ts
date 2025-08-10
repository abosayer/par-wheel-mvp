export function parFraction(pe: number, rr: number): number {
  const num = pe * (rr - 1);
  const den = 1 + num;
  return den <= 0 ? 0 : Math.max(0, Math.min(1, num / den));
}
export function combinedParFraction(pars: number[]): number {
  return 1 - pars.reduce((acc, p) => acc * (1 - p), 1);
}
export const fmtPct = (x: number) => (x * 100).toFixed(1) + '%';
