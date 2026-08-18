// WORK.js — 3-6-9 Realraum-Lauf

import { CUBE_MIND } from "./CUBE_MIND.js";
import { SLI2 } from "./zug.js";

export function WORK(x, y, tmp) {

    const { real, raum } = CUBE_MIND(x, y);

    if (!real) return { active: false, reason: "Nicht realisiert" };

    const axis = [3, 6, 9];
    if (!axis.includes(x)) return { active: false, reason: "Nicht WORK-Achse" };

    const sli = SLI2(real.x, tmp, tmp, raum);

    return { type: "WORK", real, sli };
}
