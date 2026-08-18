// work.axis.js — 12E ACHSEN + BUCHSTABEN-STATIONEN (ENTKOPLEXT)

// 1. 12E Achsenpunkte (360° / 100% / 12X)
export const AXIS12E = [
  { id:1,  axis:"X", layer:1, deg:0,   pct:0 },
  { id:2,  axis:"X", layer:2, deg:30,  pct:8.33 },
  { id:3,  axis:"X", layer:3, deg:60,  pct:16.66 },
  { id:4,  axis:"X", layer:4, deg:90,  pct:25 },

  { id:5,  axis:"Y", layer:1, deg:120, pct:33.33 },
  { id:6,  axis:"Y", layer:2, deg:150, pct:41.66 },
  { id:7,  axis:"Y", layer:3, deg:180, pct:50 },
  { id:8,  axis:"Y", layer:4, deg:210, pct:58.33 },

  { id:9,  axis:"Z", layer:1, deg:240, pct:66.66 },
  { id:10, axis:"Z", layer:2, deg:270, pct:75 },
  { id:11, axis:"Z", layer:3, deg:300, pct:83.33 },
  { id:12, axis:"Z", layer:4, deg:330, pct:91.66 },

  { id:13, axis:"Ω", layer:5, deg:360, pct:100 }
];

// 2. Buchstaben → Achsenstationen
export const AXIS_KEYS = {
  W: { axis:"Z", dir:+1, station:"Z-Aufwärts" },
  S: { axis:"Z", dir:-1, station:"Z-Abwärts" },

  A: { axis:"X", dir:-1, station:"X-Links" },
  D: { axis:"X", dir:+1, station:"X-Rechts" },

  Q: { axis:"Y", dir:-1, station:"Y-Tief" },
  E: { axis:"Y", dir:+1, station:"Y-Hoch" },

  Y: { axis:"XZ", dir:+1, station:"Diagonal Hoch (X+Z)" },
  C: { axis:"XZ", dir:-1, station:"Diagonal Tief (X+Z)" }
};

// 3. Achsenpunkt holen
export function getAxisPoint(id) {
  return AXIS12E.find(p => p.id === id);
}

// 4. Buchstabenstation holen
export function getAxisKey(key) {
  return AXIS_KEYS[key];
}

