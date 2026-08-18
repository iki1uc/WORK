// BERMUDA_ATLANTIS.js — Übergang ohne wLOCH

import { CUBE_MIND } from "./CUBE_MIND.js";
import { QI } from "./QI.js";
import { IQQ } from "./IQQ.js";

export function BERMUDA_ATLANTIS(x, y, cache) {

    // 1. Bermuda (2D)
    const bermuda = { x, y };

    // 2. Cache-Impuls
    const S = cache % 9;

    // 3. CUBE_MIND (2D → 3D)
    const { vector, real, raum } = CUBE_MIND(x + S, y + S);

    if (!real) return { state: "BERMUDA", msg: "Nicht realisiert" };

    // 4. QI/IQQ-Deutung
    const qi  = QI(vector);
    const iqq = IQQ(vector);

    // 5. Atlantis-Sphäre (243)
    const atlantis = (qi && iqq && raum === 243);

    return {
        bermuda,
        vector,
        qi,
        iqq,
        raum,
        atlantis
    };
}
