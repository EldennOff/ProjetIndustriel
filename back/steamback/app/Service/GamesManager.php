<?php

namespace App\Service;

use Elasticsearch\ClientBuilder;

class GamesManager
{

    public function getFirstsGames($pageid){

        $games = [];

        if ($pageid == 1){
            $idgame = 1;
        } else {
            $idgame = 20 * $pageid;
        }

        for ($i = $idgame; $i < $idgame+20; $i++) {
            $client = ClientBuilder::create()->build();
            $params = [
                'index' => 'steam',
                'id' => $i
            ];
            $response = $client->get($params);

            $paramsimg=[
                'index' => 'steam_media_data',
                'body' => [
                    'query' => [
                        'match' => [
                            'steam_appid' => $response['_source']['appid']
                        ]
                    ]
                ]
            ];

            $img = $client->search($paramsimg);
            $game = ['appid' =>$response['_source']['appid'],
                'name' => $response['_source']['name'],
                'publisher'=>$response['_source']['publisher'],
                'header_image'=>$img['hits']['hits'][0]['_source']['header_image']
            ];
            array_push($games, $game);
        };

        return $games;
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
