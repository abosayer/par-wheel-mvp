export type RiskFactor = {
  id: string;
  name: string;
  domain: 'Behavioral' | 'Healthcare' | 'Environmental' | 'Biological' | 'Social';
  rr: number;
  pe: number;
  baselinePARpct: number; // reported
  color: string;
};

export const RISK_FACTORS: RiskFactor[] = [
  { id: 'physical_inactivity', name: 'Lack of physical activity (sedentary)', domain: 'Behavioral', rr: 1.34, pe: 0.883, baselinePARpct: 23.1, color: '#ef4444' },
  { id: 'ocp_current', name: 'Oral contraception (current use)', domain: 'Behavioral', rr: 1.33, pe: 0.512, baselinePARpct: 14.5, color: '#f59e0b' },
  { id: 'obesity_postmeno', name: 'Obesity (postmenopausal)', domain: 'Behavioral', rr: 1.29, pe: 0.335, baselinePARpct: 8.9, color: '#10b981' },
  { id: 'hrt_current', name: 'Hormone replacement therapy (current)', domain: 'Healthcare', rr: 1.66, pe: 0.08, baselinePARpct: 5.2, color: '#3b82f6' },
  { id: 'passive_smoking', name: 'Passive smoking', domain: 'Environmental', rr: 1.35, pe: 0.135, baselinePARpct: 4.5, color: '#8b5cf6' },
  { id: 'age_first_birth_35', name: 'Age at first birth ≥ 35', domain: 'Social', rr: 1.15, pe: 0.048, baselinePARpct: 0.7, color: '#06b6d4' },
  { id: 'tobacco_smoking', name: 'Tobacco smoking (current/daily)', domain: 'Behavioral', rr: 1.34, pe: 0.015, baselinePARpct: 0.5, color: '#d946ef' },
];
