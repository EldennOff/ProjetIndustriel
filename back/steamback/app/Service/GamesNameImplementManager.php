<?php


namespace App\Service;

use Elasticsearch\ClientBuilder;

class GamesNameImplementManager
{
    public function namesImplementation($name){

        $gamesname=[];

        if ($name != null) {

            $client = ClientBuilder::create()->build();
            $params = [
                'index' => 'steam',
                'size' => 5,
                'body' =>
                    [
                    ]
            ];


            $namesearch = ['query' => [
                'prefix' => [
                    'name.keyword' => [
                        'value' => $name,
                        'case_insensitive' => true
                    ],
                ]
            ]
            ];
            $params['body'] = $namesearch;


            $response = $client->search($params);


            if (intval($response['hits']['total']['value']) > 5) {
                $totres = 5;
            } else {
                $totres = intval($response['hits']['total']['value']);
            }

            if ($totres > 0) {
                for ($i = 0; $i < $totres; $i++) {

                    $params['from'] = $i;
                    $response = $client->search($params);

                    array_push($gamesname, $response['hits']['hits'][0]['_source']['name']);
                }

                $gamesname = ['names' => $gamesname];
            }

        }
        return $gamesname;
    }
}
