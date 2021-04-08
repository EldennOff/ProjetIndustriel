<?php


namespace App\Action\API;

use App\Service\GamesNameImplementManager;
use Elasticsearch\ClientBuilder;
use App\Core\Controller\AbstractController;

class NameImplementation extends AbstractController
{
    public function __invoke(){

        $gamesmanager = New GamesNameImplementManager();

        $games = $gamesmanager->namesImplementation($_POST['name']);

        return json_encode($games);
    }
}
