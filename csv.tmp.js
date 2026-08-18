// csv.tmp.js — CSV → TMP SCHICHT (ENTKOPLEXT + DETERMINISTISCH)

// 1. Import TMP-Struktur & CSV-Parser
import { TMP, TMP12E, TMP_KEYS } from "./nc.tmp.js";
import { parseCSV, parseCSVObject } from "./csv.parse.js";

// 2. CSV → TMP Zeitpunkte (t-Werte)
export function csvToTMP(csvText) {
  const rows = parseCSV(csvText);

  return rows.map(row => {
    const [tStr] = row;
    const t = parseFloat(tStr);
    return TMP.create(isNaN(t) ? 0 : t);
  });
}

// 3. CSV → TMP12E Zeitachsen (deg/pct)
export function csvToTMP12E(csvText) {
  const rows = parseCSV(csvText);

  return rows.map(row => {
    const [degStr, pctStr] = row;

    const deg = parseFloat(degStr);
    const pct = parseFloat(pctStr);

    return {
      deg: isNaN(deg) ? 0 : deg,
      pct: isNaN(pct) ? 0 : pct
    };
  });
}

// 4. CSV → TMP Buchstabenstationen (WASDQEYC)
export function csvToTMPKeys(csvText) {
  const rows = parseCSV(csvText);

  return rows.map(row => {
    const [keyStr] = row;
    const key = keyStr.trim().toUpperCase();
    return TMP_KEYS[key] || null;
  });
}

// 5. Vollständige TMP-Synchronisation
export function csvTMPAll(csvText) {
  return {
    tmp: csvToTMP(csvText),
    tmp12e: csvToTMP12E(csvText),
    tmpKeys: csvToTMPKeys(csvText)
  };
}
