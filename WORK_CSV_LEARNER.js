// WORK_CSV_LEARNER.js
import { parseCSVObject } from "./csv.parse.js";
import { mapCSVFile } from "./csv.axis.map.js";

export const WORK_CSV_LEARNER = {

  assimilate(csvText) {
    const objects = parseCSVObject(csvText);
    const mapped = mapCSVFile(csvText);

    return {
      objects,
      mapped,
      assimilated: true,
      timestamp: Date.now()
    };
  },

  learn(assimilated) {
    const axisPoints = assimilated.mapped.map(m => m.axisPoint);
    const stations   = assimilated.mapped.map(m => m.keyStation);

    return {
      axisPoints,
      stations,
      learned: true,
      summary: {
        axisCount: axisPoints.length,
        stationCount: stations.length
      }
    };
  },

  respond(learned, input = {}) {
    const axis = learned.axisPoints.find(a => a?.id === Number(input.axisId)) 
              || learned.axisPoints[0];

    return {
      axis,
      station: learned.stations[0],
      response: axis?.pct || 0,
      status: "WORK RESPONSE",
      timestamp: Date.now()
    };
  },

  pipeline(csvText, input = {}) {
    const assimilated = this.assimilate(csvText);
    const learned     = this.learn(assimilated);
    const response    = this.respond(learned, input);

    return { assimilated, learned, response };
  }
};
