<?php


namespace App\Action;

use App\Core\Controller\AbstractController;
use Elasticsearch\ClientBuilder;

class SteamGame extends AbstractController
{
    public function __invoke()
    {
        $games = [];
        $test = [];
        for ($i = 1; $i < 100; $i++) {
            $client = ClientBuilder::create()->build();
            $params = [
                'index' => 'steam',
                'id' => $i
            ];
            $response = $client->get($params);
            array_push($games, $response);
        };

        return $this->render('steam/steamgamelist.html.twig', ['games' => $games]);
    }
}
