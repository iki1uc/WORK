// id.tmp.js — 6D TEMPORAL-SCHALTUNG
// 7SINN aktiviert ab 6D

export function ID_TMP(IX, XI, MODE) {

    // 6D — Mind-Schaltung
    const MIND = MODE === "leave"
        ? "TEMP_OUT"
        : "TEMP_IN";

    // 7SINN — Aktivierung
    const SINN7 = {
        WAHRNEHMUNG: IX * 1.1,
        TIEFE: XI * 1.3,
        ECHO: (IX + XI) / 2,
        STRAHL: IX * XI,
        KERN: IX - XI,
        FOKUS: IX + XI,
        SCHWELLE: Math.abs(IX - XI) * 0.7
    };

    // 6D — Temporal-Vektor
    const TEMP = {
        X: SINN7.WAHRNEHMUNG,
        Y: SINN7.TIEFE,
        Z: SINN7.ECHO
    };

    // 6D — Kanal
    const KANAL = (TEMP.X + TEMP.Y + TEMP.Z) / 3;

    // 6D — SLI-Impuls
    const SLI = Math.sqrt(
        TEMP.X**2 +
        TEMP.Y**2 +
        TEMP.Z**2
    ) * 4;

    return {
        MODE,
        MIND,
        SINN7,
        TEMP,
        KANAL,
        SLI
    };
}

/* NARRATIV — 6D + 7SINN
leave öffnet die Zeit.
releave schließt die Zeit.

TEMP_OUT sendet.
TEMP_IN empfängt.

7SINN ist die Wahrnehmung jenseits der Achse.
WAHRNEHMUNG sieht.
TIEFE trägt.
ECHO antwortet.
STRAHL verbindet.
KERN trennt.
FOKUS richtet.
SCHWELLE prüft.

TEMP ist die 6D-Form.
KANAL ist die Verbindung.
SLI ist die Bewegung.

7SINN existiert erst ab 6D.
*/

