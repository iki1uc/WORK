export async function loadAxes(csvPath) {
    const response = await fetch(csvPath);
    const text = await response.text();

    return text
        .trim()
        .split("\n")
        .slice(1)
        .map(line => {
            const [axis, value, type] = line.split(",");
            return {
                axis: Number(axis),
                value: Number(value),
                type
            };
        });
}
