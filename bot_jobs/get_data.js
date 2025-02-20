const request = require('request')
const axios = require('axios')
const csv = require('csv-parser')
const fs = require('fs')

request('https://data.go.th/dataset/8a956917-436d-4afd-a2d4-59e4dd8e906e/resource/be19a8ad-ab48-4081-b04a-8035b5b2b8d6/download/dataset.csv', (err, response, body) => {
    if (!err && response.statusCode == 200) {
        var dataset = body
        dataset = dataset.replace(/ุุ/g, 'ุ')
        dataset = dataset.replace(/อ\./g, '')
        dataset = dataset.replace(/\/2020/g, '/20')
        dataset = dataset.replace(/\/2021/g, '/21')
        dataset = dataset.replace(/\/0202/g, '/21')
        dataset = dataset.replace(/กทม/g, 'กรุงเทพมหานคร')
        fs.writeFileSync('dataset.csv', dataset);
        console.log('provincial dataset downloaded')
    }
    else {
        console.log("Error ",err)
    }
})

axios.get('https://covid19.th-stat.com/json/covid19v2/getTimeline.json')
.then((response)=>{
    response=response.data
    response['Data'] = response['Data'].filter(s=>{
        return new Date(s['Date']) >= new Date('7/1/2020')
    })
    fs.writeFileSync('../components/gis/data/national-timeseries.json', JSON.stringify(response,null,2));
    console.log('national stats downloaded')
}).catch((err)=>{
    console.log(err)
})