// ESSENS.js — Kern-Essenz für TRANS/WARB/KANAL

export function ESSENS(IX, XI) {

    // TRANS — Bewegung
    const TRANS = IX * 2;

    // WARB — Gegenkraft
    const WARB = XI * 3;

    // KANAL — Verbindung
    const KANAL = (IX + XI) / 2;

    // Essenz — 6E → 6D Stabilität
    const ESSENZ = {
        TRANS,
        WARB,
        KANAL,
        RAW: TRANS + WARB - KANAL
    };

    return ESSENZ;
}

