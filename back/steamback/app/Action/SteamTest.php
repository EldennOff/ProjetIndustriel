<?php


namespace App\Action;

use App\Core\Controller\AbstractController;
use Elasticsearch\ClientBuilder;

class SteamTest extends AbstractController
{
    public function __invoke()
    {
        $games = [];
        for ($i = 1; $i < 10; $i++) {
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

            $pourcentage = ($response['_source']['positive_ratings']*100)/($response['_source']['positive_ratings']+$response['_source']['negative_ratings']);


            $img = $client->search($paramsimg);
            $game = ['appid' =>$response['_source']['appid'],
                'name' => $response['_source']['name'],
                'publisher'=>$response['_source']['publisher'],
                'header_image'=>$img['hits']['hits'][0]['_source']['header_image'],
                'release_date'=>$response['_source']['release_date'],
                'developer'=>$response['_source']['developer'],
                'required_age'=>$response['_source']['required_age'],
                'categories'=>$response['_source']['categories'],
                'genres'=>$response['_source']['genres'],
                'poucentage'=>intval($pourcentage, 10)
                ];
            array_push($games, $game);
        };

//        $client = ClientBuilder::create()->build();
//        $params=[
//                'index' => 'steam',
//                'body' => [
//                    'query' => [
//                        'match' => [
//                            'appid' => 10
//                        ]
//                    ]
//                ]
//            ];
//        $gameinfo = $client->search($params);
//
//        $paramsdescription=[
//            'index' => 'steam_description_data',
//            'body' => [
//                'query' => [
//                    'match' => [
//                        'steam_appid' => 10
//                    ]
//                ]
//            ]
//        ];
//        $gamedescription = $client->search($paramsdescription);
//
//        $paramsmedia=[
//            'index' => 'steam_media_data',
//            'body' => [
//                'query' => [
//                    'match' => [
//                        'steam_appid' => 10
//                    ]
//                ]
//            ]
//        ];
//        $gamemedia = $client->search($paramsmedia);
//
//        $paramsrequirement=[
//            'index' => 'steam_requirements_data',
//            'body' => [
//                'query' => [
//                    'match' => [
//                        'steam_appid' => 10
//                    ]
//                ]
//            ]
//        ];
//        $gamerequirements = $client->search($paramsrequirement);
//
//        $paramssupportinfo=[
//            'index' => 'steam_support_info',
//            'body' => [
//                'query' => [
//                    'match' => [
//                        'steam_appid' => 10
//                    ]
//                ]
//            ]
//        ];
//        $gamesupportinfo = $client->search($paramssupportinfo);
//
//        $paramstag=[
//            'index' => 'steam_tag_data',
//            'body' => [
//                'query' => [
//                    'match' => [
//                        'appid' => 10
//                    ]
//                ]
//            ]
//        ];
//        $tags = $client->search($paramstag)['hits']['hits'][0]['_source'];
//        $gametags = array_keys($tags, !0);
//
//        array_shift($gametags);
//        array_shift($tags);
//
//        $alltagsname = array_keys($tags);
//
//        $compteur=0;
//        $moyenne=0;
//
//        foreach ($gametags as $gametag){
//            $moyenne = $moyenne + $tags[$gametag];
//            $compteur++;
//        }
//        $moyenne= $moyenne/$compteur;
//
//        $compteur=0;
//        $tagsofgame=[];
//
//        foreach ($tags as $tag){
//            if ($tag >= $moyenne){
//                array_push($tagsofgame, $alltagsname[$compteur]);
//            }
//            $compteur++;
//        }
//
//        $game = [
//            'steam' => $gameinfo['hits']['hits'][0]['_source'],
//            'description' => $gamedescription['hits']['hits'][0]['_source'],
//            'media' => $gamemedia['hits']['hits'][0]['_source'],
//            'requirements' => $gamerequirements['hits']['hits'][0]['_source'],
//            'support' => $gamesupportinfo['hits']['hits'][0]['_source'],
//            'tags' => $tagsofgame
//            ];


        return $this->render('steam/steamtest.html.twig', ['games' => $games]);
    }
}
