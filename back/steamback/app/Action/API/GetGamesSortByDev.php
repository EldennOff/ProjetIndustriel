<?php


namespace App\Action\API;

use App\Core\Controller\AbstractController;
use App\Service\GamesDevTriManager;
use App\Serializer\ObjectSerializer;

class GetGamesSortByDev extends AbstractController
{
    public function __invoke(){

        $gamesmanager = New GamesDevTriManager();

        $games = $gamesmanager->getFirstsGamesByDev(intval($_GET['pageid']));

        return json_encode($games);
    }
}
