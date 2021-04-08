<?php


namespace App\Service;


use Elasticsearch\ClientBuilder;


class GameSearchManager
{
    public function searchGame($pageid, $name, $sortby, $asc_desc){

        $allgames=[];
        $games=[];
        $ascOrdesc = null;
        $isSortBy = null;

        $client = ClientBuilder::create()->build();
        $params = [
            'index' => 'steam',
            'scroll' => '1m',
            'body' =>
                [
//                    'query'=>[
//                      'bool'=>[
//                          'must'=> [
//                              'match'=>[
//                                  'name'=> [
//                                  ]
//                              ]
//                          ],
//                      ]
//                    ],
//                    'sort' => [
//                        'release_date' => [
//                            'order' => 'desc'
//                        ]
//                    ]
                ]
        ];

        if ($name != null) {

            $namesearch = ['query' => [
                'bool' => [
                    'must' => [
                        'match' => [
                            'name' => [
                                'query' => $name,
                                'operator' => 'and',
                                'zero_terms_query' => 'all',
                                'fuzziness'=>2,
                                'prefix_length'=>1
                            ]
                        ]
                    ],
                ]
            ]
            ];
            $params['body'] = $namesearch;

        }

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

                        ]
                ];
                if ($name != null) {

                    $namesearch = ['query' => [
                        'bool' => [
                            'must' => [
                                'match' => [
                                    'name' => [
                                        'query' => $name,
                                        'operator' => 'and',
                                        'zero_terms_query' => 'all',
                                        'fuzziness'=>2,
                                        'prefix_length'=>1
                                    ]
                                ]
                            ],
                        ]
                    ]
                    ];
                    $params['body'] = $namesearch;
                }

                if ($asc_desc != null){
                    $ascOrdesc = $asc_desc;
                }
                    else{
                        $ascOrdesc = 'desc';
                    }

                if ($sortby != null){
                    if ($sortby != 'release_date' && $sortby != 'percentage_ratings'){
                        $isSortBy = $sortby . ".keyword";
                    } else {
                        $isSortBy = $sortby;
                    }
                } else {
                    $isSortBy = 'release_date';
                }
                    $sort = ['sort' => [
                        $isSortBy => [
                            'order' => $ascOrdesc
                            ]
                        ]
                    ];

                    $params['body'] = array_replace($params['body'], $sort);

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
                    'percentage_ratings' => intval($response['hits']['hits'][0]['_source']['percentage_ratings'], 10)
                ];
                array_push($games, $jeux);

            }
        }
        array_push($allgames, ['total_games' => $totalresultat, 'total_pages'=>$totalpage, 'data'=>$games]);

        return $allgames;

    }
}
