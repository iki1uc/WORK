// fork.respo.js — RESPONSE SCHICHT FÜR FORK (ENTKOPLEXT)

// 1. Imports
import { forkResolve } from "./fork.core.js";
import { ncPacket } from "./fork.nc.js";

// ---------------------------------------------------------
// 2. Response: Neutraler Antwortblock für einen Key
// ---------------------------------------------------------

export function respoKey(key) {
  const core = forkResolve(key);
  const packet = ncPacket(key);

  return {
    key,
    axis: {
      sixE: core.sixE,
      twelveE: core.twelveE
    },
    tmp: core.tmp,
    vector: core.vec,
    packet
  };
}

// ---------------------------------------------------------
// 3. Response: Mehrere Keys verarbeiten
// ---------------------------------------------------------

export function respoKeys(keys) {
  return keys.map(k => respoKey(k));
}

// ---------------------------------------------------------
// 4. Response: Vollständige FORK‑Antwort
// ---------------------------------------------------------

export function respoFull(input) {
  const keys = Array.isArray(input) ? input : [input];

  return {
    count: keys.length,
    entries: respoKeys(keys)
  };
}
