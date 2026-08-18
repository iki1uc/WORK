// csv.axis.map.js — CSV → 12E ACHSEN MAPPING

import { AXIS12E, AXIS_KEYS } from "./work.axis.js";

// 1. CSV-Zeile → Array
export const parseCSVLine = line =>
  line.split(",").map(v => v.trim());

// 2. CSV → Achsenpunkt (ID)
export const mapCSVToAxis = ([idStr]) =>
  AXIS12E.find(p => p.id === Number(idStr)) || null;

// 3. CSV → Buchstabenstation
export const mapCSVToKey = ([, keyStr]) =>
  AXIS_KEYS[keyStr.trim().toUpperCase()] || null;

// 4. Komplettes Mapping einer Zeile
export const mapCSVRow = line => {
  const row = parseCSVLine(line);
  return {
    axisPoint: mapCSVToAxis(row),
    keyStation: mapCSVToKey(row)
  };
};

// 5. CSV-Datei → Liste von Mappings
export const mapCSVFile = csvText =>
  csvText
    .split("\n")
    .filter(Boolean)
    .map(mapCSVRow);

