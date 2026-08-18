// csv.parse.js — CSV PARSER (ENTKOPLEXT + DETERMINISTISCH)

// 1. Eine einzelne CSV-Zeile → Array
export const parseCSVLine = line =>
  typeof line === "string"
    ? line.split(",").map(v => v.trim())
    : [];

// 2. CSV-Text → Array von Arrays
export const parseCSV = text =>
  typeof text === "string"
    ? text
        .split("\n")
        .map(l => l.trim())
        .filter(Boolean)
        .map(parseCSVLine)
    : [];

// 3. CSV → Objekt (Header → Werte)
export const parseCSVObject = text => {
  const rows = parseCSV(text);
  if (rows.length < 2) return [];

  const [header, ...body] = rows;

  return body.map(row =>
    Object.fromEntries(
      header.map((h, i) => [h, row[i] ?? ""])
    )
  );
};

// 4. CSV → Key-Value Map (erste Spalte = Schlüssel)
export const parseCSVMap = text => {
  const rows = parseCSV(text);
  const map = {};

  rows.forEach(([key, ...rest]) => {
    if (key) map[key] = rest;
  });

  return map;
};

// 5. CSV → JSON
export const parseCSVtoJSON = text =>
  JSON.stringify(parseCSVObject(text), null, 2);

