// nc.matrix.js — BASIS MATHEMATIK + PHYSIK ENGINE

// ---------------------------
// 1. Vektor-Operationen
// ---------------------------
export const Vec = {
  create: (x = 0, y = 0, z = 0) => ({ x, y, z }),

  add: (a, b) => ({ x: a.x + b.x, y: a.y + b.y, z: a.z + b.z }),
  sub: (a, b) => ({ x: a.x - b.x, y: a.y - b.y, z: a.z - b.z }),
  mul: (a, s) => ({ x: a.x * s, y: a.y * s, z: a.z * s }),

  dot: (a, b) => a.x * b.x + a.y * b.y + a.z * b.z,

  len: (a) => Math.sqrt(a.x*a.x + a.y*a.y + a.z*a.z),

  norm: (a) => {
    const L = Math.sqrt(a.x*a.x + a.y*a.y + a.z*a.z);
    return L === 0 ? { x:0, y:0, z:0 } : { x:a.x/L, y:a.y/L, z:a.z/L };
  }
};

// ---------------------------
// 2. Matrix-Operationen (3x3)
// ---------------------------
export const Mat3 = {
  identity: () => [
    [1,0,0],
    [0,1,0],
    [0,0,1]
  ],

  rotateZ: (deg) => {
    const r = deg * Math.PI / 180;
    const c = Math.cos(r);
    const s = Math.sin(r);
    return [
      [ c, -s, 0 ],
      [ s,  c, 0 ],
      [ 0,  0, 1 ]
    ];
  },

  mulVec: (m, v) => ({
    x: m[0][0]*v.x + m[0][1]*v.y + m[0][2]*v.z,
    y: m[1][0]*v.x + m[1][1]*v.y + m[1][2]*v.z,
    z: m[2][0]*v.x + m[2][1]*v.y + m[2][2]*v.z
  })
};

// ---------------------------
// 3. Körpermodell (Rigid Body)
// ---------------------------
export class Body {
  constructor(mass, x, y, z = 0) {
    this.pos = Vec.create(x, y, z);
    this.vel = Vec.create(0, 0, 0);
    this.force = Vec.create(0, 0, 0);
    this.invMass = mass > 0 ? 1/mass : 0;
  }

  applyForce(f) {
    this.force = Vec.add(this.force, f);
  }

  // Symplectic Euler Integration
  integrate(dt) {
    this.vel = Vec.add(this.vel, Vec.mul(this.force, this.invMass * dt));
    this.pos = Vec.add(this.pos, Vec.mul(this.vel, dt));
    this.force = Vec.create(0, 0, 0);
  }
}

// ---------------------------
// 4. AABB Collision
// ---------------------------
export function aabb(a, b) {
  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  );
}

// ---------------------------
// 5. Elastic Collision Response
// ---------------------------
export function collide(a, b) {
  const normal = Vec.norm(Vec.sub(b.pos, a.pos));
  const relVel = Vec.sub(b.vel, a.vel);
  const sepVel = Vec.dot(relVel, normal);

  if (sepVel > 0) return;

  const impulse = -(1 + 1.0) * sepVel / (a.invMass + b.invMass);
  const impulseVec = Vec.mul(normal, impulse);

  a.vel = Vec.sub(a.vel, Vec.mul(impulseVec, a.invMass));
  b.vel = Vec.add(b.vel, Vec.mul(impulseVec, b.invMass));
}
