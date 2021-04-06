<?php


namespace App\Action;

use App\Core\Controller\AbstractController;
use Elasticsearch\ClientBuilder;

class SteamTest extends AbstractController
{
    public function __invoke()
    {

        $allgames=[];
        $games=[];

        $pageid = 1;

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

        $totalpage = intval(intval($response['hits']['total']['value']) / 20, 10);

        array_push($allgames, ['total_games' => $totalresultat, 'total_pages'=>$totalpage]);

        if ($pageid == 1){
            $idgame = 1;
        } else {
            $idgame = 20 * $pageid;
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
        array_push($allgames, $games);

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
