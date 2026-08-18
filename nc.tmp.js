// nc.tmp.js — TEMPORAL DATENLAGE (ENTKOPLEXT)

// Basis-Importe aus nc.matrix.js
import { Vec, Mat3 } from "./nc.matrix.js";

// 1. TMP — Zeitvektor (neutral)
export const TMP = {
  create: (t = 0) => ({ t }),

  add: (a, b) => ({ t: a.t + b.t }),

  sub: (a, b) => ({ t: a.t - b.t }),

  mul: (a, s) => ({ t: a.t * s })
};

// 2. TMP — 12E Zeitachsen (360° / 100% / 12X)
export const TMP12E = {
  points: [
    { id:1, deg:0,   pct:0 },
    { id:2, deg:30,  pct:8.33 },
    { id:3, deg:60,  pct:16.66 },
    { id:4, deg:90,  pct:25 },
    { id:5, deg:120, pct:33.33 },
    { id:6, deg:150, pct:41.66 },
    { id:7, deg:180, pct:50 },
    { id:8, deg:210, pct:58.33 },
    { id:9, deg:240, pct:66.66 },
    { id:10, deg:270, pct:75 },
    { id:11, deg:300, pct:83.33 },
    { id:12, deg:330, pct:91.66 },
    { id:13, deg:360, pct:100 }
  ]
};

// 3. TMP — Buchstabenführung (WASDQEYC)
export const TMP_KEYS = {
  W: { axis:"Z", dir:+1 },
  S: { axis:"Z", dir:-1 },
  A: { axis:"X", dir:-1 },
  D: { axis:"X", dir:+1 },
  Q: { axis:"Y", dir:-1 },
  E: { axis:"Y", dir:+1 },
  Y: { axis:"XZ", dir:+1 },
  C: { axis:"XZ", dir:-1 }
};

// 4. TMP — Rotation über Matrix (neutral)
export function tmpRotate(deg, vec) {
  const m = Mat3.rotateZ(deg);
  return Mat3.mulVec(m, vec);
}

