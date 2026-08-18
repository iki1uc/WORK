// fork.tmp.js — TMP SCHICHT FÜR FORK (ENTKOPLEXT)

// 1. Imports
import { TMP } from "./nc.tmp.js";
import { TMP_KEYS } from "./fork.axis.js";
import { forkResolve } from "./fork.core.js";

// ---------------------------------------------------------
// 2. TMP: Zeitimpuls aus Buchstabe
// ---------------------------------------------------------

export function tmpImpulse(key) {
  const entry = TMP_KEYS[key];
  if (!entry) return TMP.create(0);
  return TMP.create(entry.dir);
}

// ---------------------------------------------------------
// 3. TMP: Zeitimpuls aus mehreren Buchstaben
// ---------------------------------------------------------

export function tmpImpulseMulti(keys) {
  return keys.map(k => tmpImpulse(k));
}

// ---------------------------------------------------------
// 4. TMP: Vollständige TMP‑Auflösung (TMP + 6E + 12E)
// ---------------------------------------------------------

export function tmpResolve(key) {
  const core = forkResolve(key);

  return {
    key,
    impulse: core.tmp,       // TMP Zeitimpuls
    sixE: core.sixE,         // 6E Richtung
    twelveE: core.twelveE    // 12E Layerfolge
  };
}

// ---------------------------------------------------------
// 5. TMP: Vollständige Auflösung für mehrere Keys
// ---------------------------------------------------------

export function tmpResolveMulti(keys) {
  return keys.map(k => tmpResolve(k));
}
