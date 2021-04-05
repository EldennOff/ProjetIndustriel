<?php

namespace App\Action\API;

use App\Core\Controller\AbstractController;
use App\Service\GamesManager;
use App\Serializer\ObjectSerializer;

class GetFirstsGames extends AbstractController
{
    public function __invoke(){

        $gamesmanager = New GamesManager();

        $games = $gamesmanager->getFirstsGames(intval($_GET['pageid']));

        return json_encode($games);
    }
}
