// csv.read.js — CSV READER (ENTKOPLEXT + DETERMINISTISCH)

import { parseCSV, parseCSVObject, parseCSVMap } from "./csv.parse.js";

// 1. CSV aus Text lesen
export const readCSVText = text =>
  typeof text === "string" ? parseCSV(text) : [];

// 2. CSV aus File-Objekt lesen
export function readCSVFile(file) {
  return new Promise((resolve, reject) => {
    if (!file) return reject("No file provided");

    const reader = new FileReader();
    reader.onload = () => resolve(parseCSV(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}

// 3. CSV → Objektliste
export const readCSVObjects = text => parseCSVObject(text);

// 4. CSV → Key-Value Map
export const readCSVMap = text => parseCSVMap(text);

// 5. CSV → JSON
export const readCSVJSON = text =>
  JSON.stringify(parseCSVObject(text), null, 2);

