// WORK.js — heller Beschleuniger (3-6-9)

import { SLI2 } from "./zug.js";
import { SCHACH } from "./SCHACH.js";

export function WORK(v, tmp) {

    const axis = [3, 6, 9];
    if (!axis.includes(v)) return { active: false, reason: "Nicht WORK-Achse" };

    const roles = SCHACH.tmpRole(tmp);
    const sli = SLI2(v, tmp, tmp, 81);

    return {
        type: "WORK",
        alpha: roles.alpha,
        beta: roles.beta,
        gamma: roles.gamma,
        sli
    };
}
