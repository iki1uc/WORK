// csv.sync.js — CSV SYNCHRONISATION (WORK ↔ FORK)

// 1. Import CSV-Parser & Axis-Mapping
import { parseCSV, parseCSVObject } from "./csv.parse.js";
import { mapCSVRow } from "./csv.axis.map.js";

// 2. Sync: CSV → Achsenpunkte + Key-Stationen
export function syncAxisFromCSV(csvText) {
  const rows = parseCSV(csvText);
  return rows.map(mapCSVRow);
}

// 3. Sync: CSV → Objektliste (Header → Werte)
export function syncObjects(csvText) {
  return parseCSVObject(csvText);
}

// 4. Sync: CSV → Key-Value Map (erste Spalte = Schlüssel)
export function syncMap(csvText) {
  const rows = parseCSV(csvText);
  const map = {};

  rows.forEach(row => {
    if (row.length >= 2) {
      const key = row[0];
      const value = row.slice(1);
      map[key] = value;
    }
  });

  return map;
}

// 5. Sync: Vollständige Synchronisation (Axis + Objects + Map)
export function syncAll(csvText) {
  return {
    axis: syncAxisFromCSV(csvText),
    objects: syncObjects(csvText),
    map: syncMap(csvText)
  };
}
