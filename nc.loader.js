// nc.loader.js — WORK LOADER (ENTKOPLEXT)

// 1. Module laden
import { Vec, Mat3, Body, aabb, collide } from "./nc.matrix.js";
import { Extract } from "./nc.extract.js";
import { TMP, TMP12E, TMP_KEYS, tmpRotate } from "./nc.tmp.js";
import { AXIS12E, AXIS_KEYS, getAxisPoint, getAxisKey } from "./work.axis.js";

// 2. Loader-Datenstruktur
export const Loader = {

  // Basis-Mathematik
  vec: Vec,
  mat: Mat3,

  // Physik
  body: Body,
  aabb,
  collide,

  // TMP-Schicht
  tmp: TMP,
  tmp12e: TMP12E,
  tmpKeys: TMP_KEYS,
  tmpRotate,

  // Achsen-Schicht
  axis12e: AXIS12E,
  axisKeys: AXIS_KEYS,
  getAxisPoint,
  getAxisKey,

  // 3. Neutraler Initialisierer
  init() {
    return {
      vec: Vec.create(0,0,0),
      tmp: TMP.create(0),
      axis: getAxisPoint(1)
    };
  }
};

