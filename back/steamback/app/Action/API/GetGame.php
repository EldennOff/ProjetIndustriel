<?php


namespace App\Action\API;

use App\Core\Controller\AbstractController;
use App\Service\GamesManager;
use App\Serializer\ObjectSerializer;

class GetGame extends AbstractController
{
    public function __invoke(){

        $gamesmanager = New GamesManager();

        $games = $gamesmanager->getGame(intval($_GET['appi']));

        return json_encode($games);
    }
}
