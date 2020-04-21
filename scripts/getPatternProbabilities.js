export const getPatternProbabilities = analyzed_possibilities  => {
    const categoryProabilities = new Array(4)
    let lastPattern;
    for (let poss of analyzed_possibilities) {
        if ((poss.pattern_number !== lastPattern) && poss.pattern_number < 4) {
            // console.log(poss.pattern_number)
            lastPattern = poss.pattern_number;
            categoryProabilities[poss.pattern_number] = poss.category_total_probability;
        }
    }

    return categoryProabilities.map(val => {
        if (val < 0.0001) {
            return 0.01; //NOTE: This is pretty fudgy but eh
        } else {
            return (val*100).toPrecision(3)
        }
        
    });
}