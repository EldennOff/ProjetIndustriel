<?php


namespace App\Action\API;

use App\Service\GamesPubliTriManager;
use Elasticsearch\ClientBuilder;
use App\Core\Controller\AbstractController;

class GetGamesSortByPubli extends  AbstractController
{
    public function __invoke(){

        $gamesmanager = New GamesPubliTriManager();

        $games = $gamesmanager->getFirstsGamesByPubli(intval($_GET['pageid']));

        return json_encode($games);
    }
}
