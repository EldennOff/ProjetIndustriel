<?php

namespace App\Service;

use Elasticsearch\ClientBuilder;

class GamesManager
{

    public function getFirstsGamesByDate($pageid){

        $allgames=[];
        $games=[];

        $client = ClientBuilder::create()->build();
        $params = [
            'index' => 'steam',
            'scroll' => '1m',
            'body' =>
                [
                    'sort' => [
                        'release_date' => [
                            'order' => 'desc'
                        ]
                    ]
                ]
        ];
        $response = $client->search($params);

        $totalresultat = intval($response['hits']['total']['value']);

        $totalpage = ceil(intval($response['hits']['total']['value']) / 20);

        if ($pageid == 1){
            $idgame = 1;
        } else {
            $idgame = 20 * ($pageid-1);
        }

        for ($i = $idgame; $i < $idgame+20; $i++) {
            if ($i <= $totalresultat) {
                $params = [
                    'index' => 'steam',
                    'from' => -1 + $i,
                    'size' => 1,
                    'body' =>
                        [
                            'sort' => [
                                'release_date' => [
                                    'order' => 'desc'
                                ]
                            ]
                        ]
                ];

                $response = $client->search($params);

                $paramsimg = [
                    'index' => 'steam_media_data',
                    'body' => [
                        'query' => [
                            'match' => [
                                'steam_appid' => $response['hits']['hits'][0]['_source']['appid']
                            ]
                        ]
                    ]
                ];
                $img = $client->search($paramsimg);


                $jeux = ['appid' => $response['hits']['hits'][0]['_source']['appid'],
                    'name' => $response['hits']['hits'][0]['_source']['name'],
                    'publisher' => $response['hits']['hits'][0]['_source']['publisher'],
                    'header_image' => $img['hits']['hits'][0]['_source']['header_image'],
                    'release_date' => $response['hits']['hits'][0]['_source']['release_date'],
                    'release_date_string' => $response['hits']['hits'][0]['_source']['release_date_string'],
                    'developer' => $response['hits']['hits'][0]['_source']['developer'],
                    'required_age' => $response['hits']['hits'][0]['_source']['required_age'],
                    'categories' => $response['hits']['hits'][0]['_source']['categories'],
                    'genres' => $response['hits']['hits'][0]['_source']['genres'],
                    'poucentage_ratings' => intval($response['hits']['hits'][0]['_source']['percentage_ratings'], 10)
                ];
                array_push($games, $jeux);

            }
        }
        array_push($allgames, ['total_games' => $totalresultat, 'total_pages'=>$totalpage, 'data'=>$games]);

        return $allgames;
    }

    public function getGame($appid){
        $client = ClientBuilder::create()->build();
        $params=[
            'index' => 'steam',
            'body' => [
                'query' => [
                    'match' => [
                        'appid' => $appid
                    ]
                ]
            ]
        ];
        $gameinfo = $client->search($params);

        $paramsdescription=[
            'index' => 'steam_description_data',
            'body' => [
                'query' => [
                    'match' => [
                        'steam_appid' => $appid
                    ]
                ]
            ]
        ];
        $gamedescription = $client->search($paramsdescription);

        $paramsmedia=[
            'index' => 'steam_media_data',
            'body' => [
                'query' => [
                    'match' => [
                        'steam_appid' => $appid
                    ]
                ]
            ]
        ];
        $gamemedia = $client->search($paramsmedia);

        $paramsrequirement=[
            'index' => 'steam_requirements_data',
            'body' => [
                'query' => [
                    'match' => [
                        'steam_appid' => $appid
                    ]
                ]
            ]
        ];
        $gamerequirements = $client->search($paramsrequirement);

        $paramssupportinfo=[
            'index' => 'steam_support_info',
            'body' => [
                'query' => [
                    'match' => [
                        'steam_appid' => $appid
                    ]
                ]
            ]
        ];
        $gamesupportinfo = $client->search($paramssupportinfo);

        $paramstag=[
            'index' => 'steam_tag_data',
            'body' => [
                'query' => [
                    'match' => [
                        'appid' => $appid
                    ]
                ]
            ]
        ];
        $tags = $client->search($paramstag)['hits']['hits'][0]['_source'];
        $gametags = array_keys($tags, !0);

        array_shift($gametags);
        array_shift($tags);

        $alltagsname = array_keys($tags);

        $compteur=0;
        $moyenne=0;

        foreach ($gametags as $gametag){
            $moyenne = $moyenne + $tags[$gametag];
            $compteur++;
        }
        $moyenne= $moyenne/$compteur;

        $compteur=0;
        $tagsofgame=[];

        foreach ($tags as $tag){
            if ($tag >= $moyenne){
                array_push($tagsofgame, $alltagsname[$compteur]);
            }
            $compteur++;
        }

        $game = [
            'steam' => $gameinfo['hits']['hits'][0]['_source'],
            'description' => $gamedescription['hits']['hits'][0]['_source'],
            'media' => $gamemedia['hits']['hits'][0]['_source'],
            'requirements' => $gamerequirements['hits']['hits'][0]['_source'],
            'support' => $gamesupportinfo['hits']['hits'][0]['_source'],
            'tags' => $tagsofgame
        ];

        return $game;

    }
}
