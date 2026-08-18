export function LOCH_SYSTEM(axis, x, y) {

    const vector = { x, y, z: (x + y) / 2 };

    if (axis === "WORK") {
        return {
            type: "WLOCH",
            color: "white",
            room: 81,
            vector,
            meaning: "Licht / Öffnung / Expansion"
        };
    }

    if (axis === "FORK") {
        return {
            type: "SLOCH",
            color: "black",
            room: 243,
            vector,
            meaning: "Dunkelheit / Einzug / Kompression"
        };
    }

    return {
        type: "RAW",
        color: "none",
        room: 0,
        vector,
        meaning: "Unbestimmt"
    };
}
