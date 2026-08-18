// nc.system.js — SYSTEMSCHICHT FÜR WORK (ENTKOPLEXT)

// 1. Imports aus allen Basismodulen
import { Vec, Mat3, Body, aabb, collide } from "./nc.matrix.js";
import { Extract } from "./nc.extract.js";
import { TMP, TMP12E, TMP_KEYS, tmpRotate } from "./nc.tmp.js";
import { AXIS12E, AXIS_KEYS, getAxisPoint, getAxisKey } from "./work.axis.js";

// 2. System-Registry (zentraler Datenknoten)
export const System = {

  // Basis-Mathematik
  vec: Vec,
  mat: Mat3,

  // Physik
  body: Body,
  aabb,
  collide,

  // Zeit/TMP
  tmp: TMP,
  tmp12e: TMP12E,
  tmpKeys: TMP_KEYS,
  tmpRotate,

  // Achsen
  axis12e: AXIS12E,
  axisKeys: AXIS_KEYS,
  getAxisPoint,
  getAxisKey,

  // 3. System-Initialisierung (neutral)
  init() {
    return {
      vec: Vec.create(0,0,0),
      tmp: TMP.create(0),
      axis: getAxisPoint(1),
      ready: true
    };
  },

  // 4. System-Info (reine Daten, keine Logik)
  info() {
    return {
      modules: [
        "nc.matrix.js",
        "nc.extract.js",
        "nc.tmp.js",
        "work.axis.js"
      ],
      axes: AXIS12E.length,
      keys: Object.keys(AXIS_KEYS).length,
      tmpPoints: TMP12E.length
    };
  }
};

