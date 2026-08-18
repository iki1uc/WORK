export function GOLDEN_AGE(IX, XI, cache) {

    const S = cache % 9;

    const vector = {
        x: IX + S,
        y: XI + S,
        z: (IX + XI + S) / 2
    };

    const bermuda  = (IX % 2 === 0 && XI % 2 === 0);
    const atlantis = (vector.z === 9);

    const qi  = (vector.x % 3 === 0);
    const iqq = (vector.y % 3 === 0);

    const TMP = qi && iqq ? 243 : 0;

    const earth_marker = (TMP === 243 && atlantis);

    const golden_age = earth_marker && !bermuda;

    return {
        vector,
        bermuda,
        atlantis,
        qi,
        iqq,
        TMP,
        earth_marker,
        golden_age
    };
}
