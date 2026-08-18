// 1. Vektor-Operationen
function vec(x, y) { return { x, y }; }
function add(a, b) { return vec(a.x + b.x, a.y + b.y); }
function sub(a, b) { return vec(a.x - b.x, a.y - b.y); }
function mul(a, s) { return vec(a.x * s, a.y * s); }
function dot(a, b) { return a.x * b.x + a.y * b.y; }
function len(a)    { return Math.sqrt(dot(a, a)); }
function norm(a)   { const L = len(a); return L ? mul(a, 1/L) : vec(0,0); }

// 2. Körpermodell (Rigid Body)
class Body {
  constructor(mass, x, y) {
    this.pos = vec(x, y);
    this.vel = vec(0, 0);
    this.force = vec(0, 0);
    this.invMass = mass > 0 ? 1/mass : 0;
  }

  // 3. Symplectic Euler Integration
  integrate(dt) {
    this.vel = add(this.vel, mul(this.force, this.invMass * dt));
    this.pos = add(this.pos, mul(this.vel, dt));
    this.force = vec(0, 0);
  }
}

// 4. AABB Collision
function aabb(a, b) {
  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  );
}

// 5. Elastic Collision Response
function collide(a, b) {
  const normal = norm(sub(b.pos, a.pos));
  const relVel = sub(b.vel, a.vel);
  const sepVel = dot(relVel, normal);

  if (sepVel > 0) return;

  const impulse = -(1 + 1.0) * sepVel / (a.invMass + b.invMass);
  const impulseVec = mul(normal, impulse);

  a.vel = sub(a.vel, mul(impulseVec, a.invMass));
  b.vel = add(b.vel, mul(impulseVec, b.invMass));
}

