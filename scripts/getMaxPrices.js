export const getMinMaxPrices = analyzed_possibilities => {
    const priceMaxes = new Array(4)
    const priceMins = new Array(4)
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
                priceMins[lastPattern] = new Array(14);
            }
            // console.log(Math.max(poss.prices[0].max, undefined))

            for (let i = 0; i < poss.prices.length; i++) {
                let oldMaxPrice = priceMaxes[lastPattern][i];
                let oldMinPrice = priceMins[lastPattern][i];
                if (oldMaxPrice) {
                    priceMaxes[lastPattern][i] = Math.max(poss.prices[i].max, oldMaxPrice);
                    priceMins[lastPattern][i] = Math.max(poss.prices[i].min, oldMinPrice);
                } else {
                    priceMaxes[lastPattern][i] = poss.prices[i].max
                    priceMins[lastPattern][i] = poss.prices[i].min
                }
                
            }
        }
    }

    return [priceMins.map(prices => prices.slice(1)), priceMaxes.map(prices => prices.slice(1))]
}