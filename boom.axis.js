// boom.axis.js — Achsen-Erkennung
export function boomAxis(v) {
    const n = Number(v);

    if ([3,6,9].includes(n)) return "WORK";
    if ([2,4,8].includes(n)) return "FORK";
    if ([1,2,3].includes(n)) return "ID";

    return "UNKNOWN";
}
 
