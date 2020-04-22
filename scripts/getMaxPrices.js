export const getMaxPrices = analyzed_possibilities => {
    const priceMaxes = new Array(4)
    let lastPattern;
    // console.log(`Starting func`)
    for (let poss of analyzed_possibilities) {
        if ((poss.pattern_number !== lastPattern) && poss.pattern_number < 4) {
            // console.log(poss.pattern_number)
            lastPattern = poss.pattern_number;
        }

        if (lastPattern >= 0) {
            // console.log(lastPattern)
            if (priceMaxes[lastPattern] === undefined) {
                priceMaxes[lastPattern] = new Array(14);
            }
            // console.log(Math.max(poss.prices[0].max, undefined))

            for (let i = 0; i < poss.prices.length; i++) {
                let oldPrice = priceMaxes[lastPattern][i];
                if (oldPrice) {
                    priceMaxes[lastPattern][i] = Math.max(poss.prices[i].max, oldPrice);
                } else {
                    priceMaxes[lastPattern][i] = poss.prices[i].max
                }
                
            }
        }
    }

    return priceMaxes.map(prices => prices.slice(1))
}