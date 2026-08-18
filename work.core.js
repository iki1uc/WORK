// fork.core.js — FORK KERNMODUL (6E + 12E + TMP LOGIKAL)

// 1. Imports
import { AXIS6E, AXIS12E, TMP_KEYS } from "./fork.axis.js";
import { TMP } from "./nc.tmp.js";
import { Vec } from "./nc.matrix.js";

// ---------------------------------------------------------
// 2. CORE: Achsenauflösung (6E → 12E → TMP)
// ---------------------------------------------------------

// 6E: einfache Richtungsauflösung
export function resolve6E(key) {
  const entry = TMP_KEYS[key];
  if (!entry) return null;
  return entry.six;
}

// 12E: Layerauflösung
export function resolve12E(key) {
  const entry = TMP_KEYS[key];
  if (!entry) return null;

  const ids = entry.twelve;
  return ids.map(id => AXIS12E.find(p => p.id === id));
}

// TMP: Zeitpunktauflösung
export function resolveTMP(key) {
  const entry = TMP_KEYS[key];
  if (!entry) return TMP.create(0);

  // TMP = Richtung als Zeitimpuls
  const dir = entry.dir;
  return TMP.create(dir);
}

// ---------------------------------------------------------
// 3. CORE: Bewegungsvektor aus Buchstabe
// ---------------------------------------------------------

export function resolveVector(key) {
  const entry = TMP_KEYS[key];
  if (!entry) return Vec.create(0,0,0);

  switch (entry.axis) {
    case "X":
      return Vec.create(entry.dir, 0, 0);

    case "Y":
      return Vec.create(0, entry.dir, 0);

    case "Z":
      return Vec.create(0, 0, entry.dir);

    case "XZ":
      return Vec.create(entry.dir, 0, entry.dir);

    default:
      return Vec.create(0,0,0);
  }
}

// ---------------------------------------------------------
// 4. CORE: Vollständige FORK‑Auflösung
// ---------------------------------------------------------

export function forkResolve(key) {
  return {
    key,
    sixE: resolve6E(key),
    twelveE: resolve12E(key),
    tmp: resolveTMP(key),
    vec: resolveVector(key)
  };
}
