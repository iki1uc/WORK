// boom.csv.js — universeller CSV-Reader für BOOM
export async function boomCSV(url) {
    const raw = await fetch(url).then(r => r.text());
    const [header, ...rows] = raw.trim().split("\n");

    const keys = header.split(",").map(k => k.trim());

    return rows.map(r => {
        const cols = r.split(",");
        const obj = {};
        keys.forEach((k, i) => obj[k] = cols[i]?.trim());
        return obj;
    });
}

