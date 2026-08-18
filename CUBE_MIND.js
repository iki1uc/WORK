// CUBE_MIND.js — 2D → 3D → REAL-3D (243-Raum)

import { QI } from "./QI.js";
import { IQQ } from "./IQQ.js";

export function CUBE_MIND(x, y) {

    // 1. 2D → 3D (Tiefe erzeugen)
    const z = (x + y) / 2;

    // 2. Vektor erzeugen
    const vector = { x, y, z };

    // 3. QI/IQQ Schaltung prüfen
    const qi  = QI(vector);
    const iqq = IQQ(vector);

    // 4. Nur wenn beide freigeben → REAL-3D
    const real = (qi && iqq) ? vector : null;

    // 5. 243-Raum zuweisen
    const raum = real ? 243 : 0;

    return { vector, real, raum };
}
