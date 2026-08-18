// RESPO_CSV_LEARNER.js
// Assimilates CSV structures → learns patterns → builds RESPONSE

export const RESPO_CSV_LEARNER = {

  // ─────────────────────────────────────────────
  // 1. ASSIMILATION – CSV → internes Modell
  // ─────────────────────────────────────────────
  assimilate(csvText) {
    const lines = csvText.split('\n').filter(l => l.trim());
    const header = lines[0].split(',').map(h => h.trim());
    
    const rows = lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim());
      const obj = {};
      header.forEach((h, i) => obj[h] = values[i] || '');
      return obj;
    });

    // Extrahiere die Struktur
    const structure = this.extractStructure(rows, header);
    
    return {
      header,
      rows,
      structure,
      assimilated: true,
      timestamp: Date.now()
    };
  },

  // ─────────────────────────────────────────────
  // 2. STRUKTUR-EXTRAKTION
  // ─────────────────────────────────────────────
  extractStructure(rows, header) {
    const structure = {
      axis: [],
      dimensions: [],
      narrative: [],
      values: [],
      relations: []
    };

    rows.forEach(row => {
      // Erkenne Achsen (X, Y, Z, 6E, 12E)
      if (row.Achse || row.axis) {
        structure.axis.push({
          name: row.Achse || row.axis,
          trans: row.TRANS || row.trans,
          warb: row.WARB || row.warb,
          kanal: row.KANAL || row.kanal,
          raw: row.RAW || row.raw
        });
      }

      // Erkenne Narrative
      if (row.Narrativ || row.narrativ) {
        structure.narrative.push({
          text: row.Narrativ || row.narrativ,
          axis: row.Achse || row.axis || 'undefiniert'
        });
      }

      // Erkenne Dimensionen (6D, 6E)
      if (row.Dimension || row.dimension) {
        structure.dimensions.push({
          name: row.Dimension || row.dimension,
          value: row.Wert || row.value,
          type: row.Typ || row.type
        });
      }

      // Erkenne Werte
      Object.keys(row).forEach(key => {
        if (key !== 'Achse' && key !== 'axis' && 
            key !== 'Narrativ' && key !== 'narrativ' &&
            key !== 'Dimension' && key !== 'dimension') {
          const val = parseFloat(row[key]);
          if (!isNaN(val)) {
            structure.values.push({
              key,
              value: val,
              source: row.Achse || row.axis || 'undefiniert'
            });
          }
        }
      });
    });

    return structure;
  },

  // ─────────────────────────────────────────────
  // 3. LERNEN – Muster aus Struktur ableiten
  // ─────────────────────────────────────────────
  learn(assimilated) {
    const s = assimilated.structure;
    
    // 3a. Achsen-Muster
    const axisPatterns = s.axis.map(a => ({
      name: a.name,
      trans: a.trans || 0,
      warb: a.warb || 0,
      kanal: a.kanal || 0,
      raw: a.raw || 0,
      // Berechne die Essenz
      essence: (parseFloat(a.trans) || 0) + (parseFloat(a.warb) || 0) - (parseFloat(a.kanal) || 0)
    }));

    // 3b. Narrative-Muster
    const narrativePatterns = s.narrative.map(n => ({
      text: n.text,
      axis: n.axis,
      // Extrahiere Kernbegriffe
      keywords: this.extractKeywords(n.text)
    }));

    // 3c. Werte-Muster
    const valuePatterns = s.values.reduce((acc, v) => {
      if (!acc[v.key]) acc[v.key] = [];
      acc[v.key].push(v.value);
      return acc;
    }, {});

    // 3d. Beziehungen erkennen
    const relations = this.findRelations(s);

    return {
      axisPatterns,
      narrativePatterns,
      valuePatterns,
      relations,
      learned: true,
      // Zusammenfassung
      summary: {
        axisCount: s.axis.length,
        narrativeCount: s.narrative.length,
        dimensionCount: s.dimensions.length,
        valueCount: s.values.length
      }
    };
  },

  // ─────────────────────────────────────────────
  // 4. KEYWORD-EXTRAKTION
  // ─────────────────────────────────────────────
  extractKeywords(text) {
    const words = text.split(/[,\s.]+/);
    const stopwords = ['der', 'die', 'das', 'und', 'oder', 'ist', 'zeigt', 'hält', 'verbindet'];
    return words
      .filter(w => w.length > 2 && !stopwords.includes(w.toLowerCase()))
      .slice(0, 5);
  },

  // ─────────────────────────────────────────────
  // 5. BEZIEHUNGEN FINDEN
  // ─────────────────────────────────────────────
  findRelations(s) {
    const relations = [];

    // Achse ↔ Narrative
    s.axis.forEach(a => {
      const relatedNarratives = s.narrative.filter(n => n.axis === a.name);
      if (relatedNarratives.length > 0) {
        relations.push({
          type: 'axis-narrative',
          axis: a.name,
          narratives: relatedNarratives.map(n => n.text)
        });
      }
    });

    // Werte ↔ Achsen
    s.values.forEach(v => {
      const relatedAxis = s.axis.find(a => a.name === v.source);
      if (relatedAxis) {
        relations.push({
          type: 'value-axis',
          value: v.key,
          axis: v.source,
          magnitude: v.value
        });
      }
    });

    return relations;
  },

  // ─────────────────────────────────────────────
  // 6. RESPONSE – basierend auf Gelerntem
  // ─────────────────────────────────────────────
  respond(learned, input) {
    const { axisPatterns, narrativePatterns, valuePatterns, relations } = learned;

    // Finde passende Achse
    let bestAxis = axisPatterns[0] || { name: 'undefiniert' };
    if (input.axis) {
      const match = axisPatterns.find(a => a.name === input.axis);
      if (match) bestAxis = match;
    }

    // Finde passendes Narrativ
    let bestNarrative = narrativePatterns[0] || { text: 'Kein Narrativ gefunden' };
    if (input.narrative) {
      const match = narrativePatterns.find(n => 
        n.text.toLowerCase().includes(input.narrative.toLowerCase())
      );
      if (match) bestNarrative = match;
    }

    // Berechne RESPONSE-Wert
    const responseValue = bestAxis.essence || 0;

    return {
      axis: bestAxis,
      narrative: bestNarrative,
      relations: relations.slice(0, 5),
      response: responseValue,
      status: responseValue > 0 ? 'POSITIV' : 'NEUTRAL',
      learned: true,
      timestamp: Date.now()
    };
  },

  // ─────────────────────────────────────────────
  // 7. KOMPLETTE PIPELINE
  // ─────────────────────────────────────────────
  pipeline(csvText, input = {}) {
    // 1. Assimilieren
    const assimilated = this.assimilate(csvText);
    
    // 2. Lernen
    const learned = this.learn(assimilated);
    
    // 3. Antworten
    const response = this.respond(learned, input);
    
    return {
      assimilated,
      learned,
      response,
      pipeline: 'ASSIMILATE → LEARN → RESPOND',
      status: 'KOMPLETT'
    };
  }
};
