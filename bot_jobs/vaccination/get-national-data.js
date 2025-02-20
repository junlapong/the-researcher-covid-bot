const request = require('request')
const parse = require('csv-parse/lib/sync')
const moment = require('moment')
const fs = require('fs')
const _ = require('lodash')
var jsonData = []
const startDate = new Date('2021-03-06')
const currentData = require('../../components/gis/data/national-vaccination-timeseries.json')
//todo: check if newer data is already existed locally.
request('https://raw.githubusercontent.com/wiki/djay/covidthailand/vac_timeline.csv', (err, response, body) => {
    if (!err && response.statusCode == 200) {
        const dataset = parse(body, {
            columns: true,
            skip_empty_lines: true
        })
        const latest_date = dataset[dataset.length - 1]
        if (new Date(latest_date) > new Date(currentData[currentData.length - 1]['date'])) {
            for (const i in dataset) {
                if (new Date(dataset[i]['Date']) >= startDate) {
                    jsonData.push({
                        'date': dataset[i]['Date'],
                        'total_doses': Number(dataset[i]['Vac Given 1 Cum']) + Number(dataset[i]['Vac Given 2 Cum']),
                        'first_dose': Number(dataset[i]['Vac Given 1 Cum']),
                        'second_dose': Number(dataset[i]['Vac Given 2 Cum']),
                        'sinovac_supply': Number(dataset[i]['Vac Allocated Sinovac']),
                        'astrazeneca_supply': Number(dataset[i]['Vac Allocated AstraZeneca']),
                        'total_supply': Number(dataset[i]['Vac Allocated AstraZeneca']) + Number(dataset[i]['Vac Allocated Sinovac'])
                    })
                }
            }


            const endDate = new Date(jsonData[jsonData.length - 1]['date'])

            var dates = [startDate]
            var process_date = moment(startDate)
            while (process_date < moment(endDate)) {
                process_date = process_date.add(1, 'days')
                dates.push(process_date.toDate())
            }

            var sortedData = []
            for (const i in dates) {
                const day = moment(dates[i]).format('YYYY-MM-DD')
                const query = _.findIndex(jsonData, { 'date': day })
                if (query < 0) {
                    sortedData.push({
                        'date': day,
                        'missing_data': true
                    })
                }
                else {
                    sortedData.push(
                        jsonData[query]
                    )
                }
            }

            for (const i in sortedData) {
                if (sortedData[i]['total_doses'] == 0) {
                    sortedData[i]['missing_data'] = true
                }
            }

            for (const i in sortedData) {
                if (sortedData[i]['missing_data'] === true && i > 0) {
                    sortedData[i] = {
                        ...sortedData[i],
                        'total_doses': sortedData[i - 1]['total_doses'],
                        'first_dose': sortedData[i - 1]['first_dose'],
                        'second_dose': sortedData[i - 1]['second_dose'],
                    }
                }
            }
            for (const i in sortedData) {
                if (i > 0) {
                    sortedData[i]['daily_vaccinations'] = sortedData[i]['total_doses'] - sortedData[i - 1]['total_doses']
                }
                else {
                    sortedData[i]['daily_vaccinations'] = sortedData[i]['total_doses']
                }
            }
            fs.writeFileSync('../../components/gis/data/national-vaccination-timeseries.json', JSON.stringify(sortedData, null, 4), 'utf-8')
        }
        else{
            console.log('New data already existed')
        }
    }
    else {
        console.log('Error', err)
    }
})