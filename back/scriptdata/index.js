const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200/' });
const csv = require('csv-parser');
const fs = require('fs');
let results= [];
let compteur = 0;


function toElastic1() {
    return new Promise(resolve => {
        fs.createReadStream('steam_csvs/steam.csv')
            .pipe(csv({}))
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                for (const result of results) {
                        compteur++;
                        await createSteam1(result, compteur, 'steam').catch(console.log);
                    }
                resolve();
            });
    });
}

function toElastic2() {
    return new Promise(resolve => {
        fs.createReadStream('steam_csvs/steam_description_data.csv')
            .pipe(csv({}))
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                for (const result of results) {
                    compteur++;
                    await createSteam(result, compteur, 'steam_description_data').catch(console.log);
                }
                resolve();
            });
    });
}

function toElastic3() {
    return new Promise(resolve => {
        fs.createReadStream('steam_csvs/steam_media_data.csv')
            .pipe(csv({}))
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                for (const result of results) {
                    compteur++;
                    await createSteamMedia(result, compteur, 'steam_media_data').catch(console.log);
                }
                resolve();
            });
    });
}

function toElastic4() {
    return new Promise(resolve => {
        fs.createReadStream('steam_csvs/steam_requirements_data.csv')
            .pipe(csv({}))
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                for (const result of results) {
                    compteur++;
                    await createSteam(result, compteur, 'steam_requirements_data').catch(console.log);
                }
                resolve();
            });
    });
}

function toElastic5() {
    return new Promise(resolve => {
        fs.createReadStream('steam_csvs/steam_support_info.csv')
            .pipe(csv({}))
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                for (const result of results) {
                    compteur++;
                    await createSteam(result, compteur, 'steam_support_info').catch(console.log);
                }
                resolve();
            });
    });
}

function toElastic6() {
    return new Promise(resolve => {
        fs.createReadStream('steam_csvs/steamspy_tag_data.csv')
            .pipe(csv({}))
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                for (const result of results) {
                    compteur++;
                    await createSteam(result, compteur, 'steam_tag_data').catch(console.log);
                }
                resolve();
            });
    });
}

// fs.createReadStream('steam_csvs/steam.csv')
//     .pipe(csv({}))
//     .on('data', (data) => results.push(data))
//     .on('end',() => {
//         results.forEach(result => {
//             compteur++;
//             createSteam1(result, compteur, 'steam').catch(console.log);
//         }
//         );
//          compteur=0;
//          results=[];
//     });
//
// fs.createReadStream('steam_csvs/steam_description_data.csv')
//     .pipe(csv({}))
//     .on('data', (data) => results.push(data))
//     .on('end', () => {
//         results.forEach(result => {
//                 compteur++;
//                 createSteam(result, compteur, 'steam_description_data').catch(console.log);
//             }
//         );
//         compteur=0;
//         results=[];
//     });
//
fs.createReadStream('steam_csvs/steam_media_data.csv')
    .pipe(csv({}))
    .on('data', (data) => results.push(data))
    .on('end', () => {
        results.forEach(result => {
                compteur++;
                createSteamMedia(result, compteur, 'steam_media_data').catch(console.log);
            }
        );
        compteur=0;
        results=[];
    });
//
// fs.createReadStream('steam_csvs/steam_requirements_data.csv')
//     .pipe(csv({}))
//     .on('data', (data) => results.push(data))
//     .on('end', () => {
//         results.forEach(result => {
//                 compteur++;
//                 createSteam(result, compteur, 'steam_requirements_data').catch(console.log);
//             }
//         );
//         compteur=0;
//         results=[];
//     });
//
// fs.createReadStream('steam_csvs/steam_support_info.csv')
//     .pipe(csv({}))
//     .on('data', (data) => results.push(data))
//     .on('end', () => {
//         results.forEach(result => {
//                 compteur++;
//                 createSteam(result, compteur, 'steam_support_info').catch(console.log);
//             }
//         );
//         compteur=0;
//         results=[];
//     });
//
// fs.createReadStream('steam_csvs/steamspy_tag_data.csv')
//     .pipe(csv({}))
//     .on('data', (data) => results.push(data))
//     .on('end', () => {
//         results.forEach(result => {
//                 compteur++;
//                 createSteam(result, compteur, 'steam_tag_data').catch(console.log);
//             }
//         );
//         compteur=0;
//         results=[];
//     });

function createSteam(result, id, index) {
    return client.create({
        index: index,
        id: id,
        body: result
    });
}

function createSteam1(result, id, index) {
    return client.create({
        index: index,
        id: id,
        body: {
            appid: result.appid,
            name: result.name,
            release_date: Date.parse(result.release_date),
            release_date_string: result.release_date,
            english: result.english,
            developer: returnString(result.developer),
            publisher: returnString(result.publisher),
            platforms: returnString(result.platforms),
            required_age: result.required_age,
            categories: returnString(result.categories),
            genres: returnString(result.genres),
            steamspy_tags: returnString(result.steamspy_tags),
            achievements: result.achievements,
            positive_ratings: result.positive_ratings,
            negative_ratings: result.negative_ratings,
            percentage_ratings: parseInt( (parseInt(result.positive_ratings, 10) *100)/ (parseInt(result.negative_ratings, 10)+parseInt(result.positive_ratings, 10))),
            average_playtime: result.average_playtime,
            median_playtime: result.median_playtime,
            owners: result.owners,
            price: result.price
        }
    });
}

function createSteamMedia(result, id, index) {
    return client.create({
        index: index,
        id: id,
        body: {
            steam_appid: result.steam_appid,
            header_image: result.header_image,
            screenshots: eval('(' +result.screenshots +')'),
            background: result.background,
            movies: result.movies,
        }
    });
}

function returnString(test){
    tab=test.split(";");
    chaine=tab[0];
    if(tab.length>1){
        for(i=1;i<tab.length;i++){
            chaine=chaine+' ; '+tab[i];
        }
    }
    return chaine;

}

async function assyncCall() {
    console.log('Lancement script 1');
    await toElastic1();
    console.log('script 1 fini');
    compteur=0;
    results=[];

    console.log('Lancement script 2');
    await toElastic2();
    console.log('script 2 fini');
    compteur=0;
    results=[];

    console.log('Lancement script 3');
    await toElastic3();
    console.log('script 3 fini');
    compteur=0;
    results=[];

    console.log('Lancement script 4');
    await toElastic4();
    console.log('script 4 fini');
    compteur=0;
    results=[];

    console.log('Lancement script 5');
    await toElastic5();
    console.log('script 5 fini');
    compteur=0;
    results=[];

    console.log('Lancement script 6');
    await toElastic6();
    console.log('script 6 fini');
    compteur=0;
    results=[];
}

// assyncCall();
