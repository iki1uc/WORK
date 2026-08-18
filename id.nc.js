// id.nc.js — 6D-MIND-SCHALTUNG
// leave ↔ releave — Beam-Switch

export function ID_NC(IX, XI, MODE) {

    // 6D — Mind-Schaltung
    const MIND = MODE === "leave"
        ? "OUT_BEAM"
        : "IN_BEAM";

    // 6D — Beam-Punkt
    const BEAM = {
        X: IX * (MIND === "OUT_BEAM" ? 2 : 3),
        Y: XI * (MIND === "OUT_BEAM" ? 3 : 2)
    };

    // 6D — Kanal
    const KANAL = (BEAM.X + BEAM.Y) / 2;

    // 6D — SLI-Impuls
    const SLI = Math.sqrt(BEAM.X**2 + BEAM.Y**2) * 4;

    return {
        MODE,
        MIND,
        BEAM,
        KANAL,
        SLI
    };
}

/* NARRATIV — 6D
leave öffnet.
releave schließt.

OUT_BEAM sendet.
IN_BEAM empfängt.

BEAM ist der Punkt.
KANAL ist die Verbindung.
SLI ist die Bewegung.

6D ist die Schaltung zwischen beiden.
*/

