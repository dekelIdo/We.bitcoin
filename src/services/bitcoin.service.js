import axios from 'axios'
import {storageService} from '../services/storage.service'

export const bitcoinService = {
    getRate,
    // getMarketPriceHistory,
    // getAvgBlockSize,
    getExchangeRates,
    getCurrencyOptions,
}

async function getRate(currentCoin) {

    try {
        const coinsValues = await axios.get('https://blockchain.info/ticker')
        if(currentCoin){
            return coinsValues.data[currentCoin]
        }
        else return coinsValues
    }

    catch (err) {
        console.log('err:', err)
    }
}
async function getExchangeRates() {
    let exchangeRates = storageService.load('EXCHANGE_RATES')
    if (!exchangeRates) {
        exchangeRates = await axios.get('https://blockchain.info/ticker')
        exchangeRates = exchangeRates.data
        storageService.save('EXCHANGE_RATES', exchangeRates)
    }
    return exchangeRates
}

async function getCurrencyOptions() {
    const exchangeRates = await getExchangeRates()
    const options = []
    for (let currency in exchangeRates) {
        options.push(currency)
    }
    return options
}