// fork.nc.js — NEUTRAL CONTROL (NC) SCHICHT FÜR FORK

// 1. Imports
import { forkResolve } from "./fork.core.js";
import { Vec } from "./nc.matrix.js";
import { TMP } from "./nc.tmp.js";

// ---------------------------------------------------------
// 2. NC: Neutraler Steuerimpuls aus Buchstabe
// ---------------------------------------------------------

export function ncImpulse(key) {
  const res = forkResolve(key);
  return res.tmp; // TMP.create(dir)
}

// ---------------------------------------------------------
// 3. NC: Bewegungsvektor aus Buchstabe
// ---------------------------------------------------------

export function ncVector(key) {
  const res = forkResolve(key);
  return res.vec; // Vec.create(x,y,z)
}

// ---------------------------------------------------------
// 4. NC: Achsenauflösung (6E + 12E)
export function ncAxis(key) {
  const res = forkResolve(key);
  return {
    sixE: res.sixE,
    twelveE: res.twelveE
  };
}

// ---------------------------------------------------------
// 5. NC: Komplettes Steuerpaket
// ---------------------------------------------------------

export function ncPacket(key) {
  const res = forkResolve(key);

  return {
    key,
    impulse: res.tmp,      // TMP Zeitimpuls
    vector: res.vec,       // Bewegungsvektor
    sixE: res.sixE,        // 6E Richtung
    twelveE: res.twelveE   // 12E Layerfolge
  };
}

// ---------------------------------------------------------
// 6. NC: Bewegung anwenden (neutral)
// ---------------------------------------------------------

export function ncApply(body, key, dt = 1) {
  const vec = ncVector(key);
  const impulse = ncImpulse(key).t;

  // Bewegung = Vektor * Impuls * Zeit
  const move = Vec.mul(vec, impulse * dt);

  body.pos = Vec.add(body.pos, move);
  return body;
}
