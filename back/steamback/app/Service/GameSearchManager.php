<?php


namespace App\Service;


use Elasticsearch\ClientBuilder;


class GameSearchManager
{
    public function searchGame($pageid, $name, $categ, $genre, $dev, $pub, $sortby, $asc_desc){

        $games=[];
        $ascOrdesc = null;
        $isSortBy = null;

        $client = ClientBuilder::create()->build();
        $params = [
            'index' => 'steam',
            'scroll' => '1m',
            'body' =>
                [

                ]
        ];

        //  Recherche par noms
            if ($name != null) {

                $namesearch = ['query' => [
                    'bool' => [
                        'must' => [[
                            'match' => [
                                'name' => [
                                    'query' => $name,
                                    'operator' => 'and',
                                    'zero_terms_query' => 'all',
                                    'fuzziness' => 2,
                                    'prefix_length' => 1
                                ]
                            ]
                        ]
                        ],
                    ]
                ]
                ];
                $params['body'] = $namesearch;

            }

        //  Recherche par catégories
        if ($categ != null){
            if ($params['body'] == null){
                $categsearch = ['query' => [
                    'bool' => [
                        'must' => [[
                            'match' => [
                                'categories' => [
                                    'query' => $categ,
                                    'operator' => 'and',
                                    'zero_terms_query' => 'all',
                                    'fuzziness'=>2,
                                    'prefix_length'=>1
                                ]
                            ]
                            ]
                        ],
                    ]
                ]
                ];

                $params['body'] = $categsearch;
            }
            else{
                $categsearch =[
                    'match' => [
                        'categories' => [
                            'query' => $categ,
                            'operator' => 'and',
                            'zero_terms_query' => 'all',
                            'fuzziness'=>2,
                            'prefix_length'=>1
                        ]
                    ]
                ];

                array_push($params['body']['query']['bool']['must'], $categsearch);
            }
        }

        //  Recherche par genres

        if ($genre != null){
            if ($params['body'] == null){
                $genresearch = ['query' => [
                    'bool' => [
                        'must' => [[
                            'match' => [
                                'genres' => [
                                    'query' => $genre,
                                    'operator' => 'and',
                                    'zero_terms_query' => 'all',
                                    'fuzziness'=>2,
                                    'prefix_length'=>1
                                ]
                            ]
                        ]
                        ],
                    ]
                ]
                ];

                $params['body'] = $genresearch;
            }
            else{
                $genresearch =[
                    'match' => [
                        'genres' => [
                            'query' => $genre,
                            'operator' => 'and',
                            'zero_terms_query' => 'all',
                            'fuzziness'=>2,
                            'prefix_length'=>1
                        ]
                    ]
                ];

                array_push($params['body']['query']['bool']['must'], $genresearch);
            }
        }

//  Recherche par les developeurs
        if ($dev != null){
            if ($params['body'] == null){
                $devsearch = ['query' => [
                    'bool' => [
                        'must' => [[
                            'match' => [
                                'developer' => [
                                    'query' => $dev,
                                    'operator' => 'or',
                                    'zero_terms_query' => 'all',
                                    'fuzziness'=>2,
                                    'prefix_length'=>1
                                ]
                            ]
                        ]
                        ],
                    ]
                ]
                ];

                $params['body'] = $devsearch;
            }
            else{
                $devsearch =[
                    'match' => [
                        'developer' => [
                            'query' => $dev,
                            'operator' => 'or',
                            'zero_terms_query' => 'all',
                            'fuzziness'=>2,
                            'prefix_length'=>1
                        ]
                    ]
                ];

                array_push($params['body']['query']['bool']['must'], $devsearch);
            }
        }

        //  Recherche par les éditeurs
        if ($pub != null){
            if ($params['body'] == null){
                $pubsearch = ['query' => [
                    'bool' => [
                        'must' => [[
                            'match' => [
                                'developer' => [
                                    'query' => $pub,
                                    'operator' => 'and',
                                    'zero_terms_query' => 'all',
                                    'fuzziness'=>2,
                                    'prefix_length'=>1
                                ]
                            ]
                        ]
                        ],
                    ]
                ]
                ];

                $params['body'] = $pubsearch;
            }
            else{
                $pubsearch =[
                    'match' => [
                        'developer' => [
                            'query' => $pub,
                            'operator' => 'and',
                            'zero_terms_query' => 'all',
                            'fuzziness'=>2,
                            'prefix_length'=>1
                        ]
                    ]
                ];

                array_push($params['body']['query']['bool']['must'], $pubsearch);
            }
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
                $params2 = [
                    'index' => 'steam',
                    'from' => -1 + $i,
                    'size' => 1,
                    'body' =>
                        [

                        ]
                ];

                $params2['body']=$params['body'];

                //Trie de données

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

                    $params2['body'] = array_replace($params2['body'], $sort);

                $response = $client->search($params2);

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
        $allgames = ['total_games' => $totalresultat, 'total_pages'=>$totalpage, 'data'=>$games];

        return $allgames;

    }

}


