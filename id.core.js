// id.core.js — 6D CORE-SCHALTUNG
// leave ↔ releave — Kernpunkt

export function ID_CORE(IX, XI, MODE) {

    // 6D — Kernmodus
    const CORE = MODE === "leave"
        ? "CORE_OUT"
        : "CORE_IN";

    // 6D — Kernvektor
    const VEKTOR = {
        X: IX * (CORE === "CORE_OUT" ? 2 : 3),
        Y: XI * (CORE === "CORE_OUT" ? 3 : 2),
        Z: (IX + XI) / 2
    };

    // 6D — Kanalpunkt
    const KANAL = (VEKTOR.X + VEKTOR.Y + VEKTOR.Z) / 3;

    // 6D — SLI-Kernimpuls
    const SLI = Math.sqrt(
        VEKTOR.X**2 +
        VEKTOR.Y**2 +
        VEKTOR.Z**2
    ) * 4;

    // 6D — RAW-Kernwert
    const RAW = VEKTOR.X + VEKTOR.Y - VEKTOR.Z;

    return {
        MODE,
        CORE,
        VEKTOR,
        KANAL,
        SLI,
        RAW
    };
}

/* NARRATIV — 6D CORE
leave öffnet den Kern.
releave schließt den Kern.

CORE_OUT sendet.
CORE_IN empfängt.

VEKTOR ist die 6D-Form.
KANAL ist die Verbindung.
SLI ist die Bewegung.
RAW ist die Wahrheit.

6D ist die Kernschaltung zwischen beiden.
*/
