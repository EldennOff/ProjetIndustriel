const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200/' });
const csv = require('csv-parser');
const fs = require('fs');
let results= [];
let compteur = 0;

fs.createReadStream('steam_csvs/steam.csv')
    .pipe(csv({}))
    .on('data', (data) => results.push(data))
    .on('end', () => {
        results.forEach(result => {
                compteur++;
                createSteam(result, compteur, 'steam').catch(console.log);
            }
        );
        compteur=0;
        results=[];
    });

fs.createReadStream('steam_csvs/steam_description_data.csv')
    .pipe(csv({}))
    .on('data', (data) => results.push(data))
    .on('end', () => {
        results.forEach(result => {
                compteur++;
                createSteam(result, compteur, 'steam_description_data').catch(console.log);
            }
        );
        compteur=0;
        results=[];
    });

fs.createReadStream('steam_csvs/steam_media_data.csv')
    .pipe(csv({}))
    .on('data', (data) => results.push(data))
    .on('end', () => {
        results.forEach(result => {
                compteur++;
                createSteam(result, compteur, 'steam_media_data').catch(console.log);
            }
        );
        compteur=0;
        results=[];
    });

fs.createReadStream('steam_csvs/steam_requirements_data.csv')
    .pipe(csv({}))
    .on('data', (data) => results.push(data))
    .on('end', () => {
        results.forEach(result => {
                compteur++;
                createSteam(result, compteur, 'steam_requirements_data').catch(console.log);
            }
        );
        compteur=0;
        results=[];
    });

fs.createReadStream('steam_csvs/steam_support_info.csv')
    .pipe(csv({}))
    .on('data', (data) => results.push(data))
    .on('end', () => {
        results.forEach(result => {
                compteur++;
                createSteam(result, compteur, 'steam_support_info').catch(console.log);
            }
        );
        compteur=0;
        results=[];
    });

fs.createReadStream('steam_csvs/steamspy_tag_data.csv')
    .pipe(csv({}))
    .on('data', (data) => results.push(data))
    .on('end', () => {
        results.forEach(result => {
                compteur++;
                createSteam(result, compteur, 'steam_tag_data').catch(console.log);
            }
        );
        compteur=0;
        results=[];
    });

async function createSteam(result, id, index) {
    const { response } = await client.create({
        index: index,
        id: id,
        body: result
    });

}
