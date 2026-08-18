// nc.extract.js — EXTRAKTION AUS MATRIX

import { Vec, Mat3, Body, aabb, collide } from "./nc.matrix.js";

export const Extract = {

  // Vektor-Funktionen
  vec: Vec,

  // Matrix-Funktionen
  mat: Mat3,

  // Physik-Körper
  body: Body,

  // Kollisionen
  aabb,
  collide,

  // Zugriff auf einzelne Werte
  getVec(x, y, z = 0) {
    return Vec.create(x, y, z);
  },

  rotateZ(deg) {
    return Mat3.rotateZ(deg);
  },

  applyForce(body, fx, fy, fz = 0) {
    body.applyForce(Vec.create(fx, fy, fz));
  }
};
