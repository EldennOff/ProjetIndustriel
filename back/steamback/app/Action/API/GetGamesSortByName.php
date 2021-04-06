<?php


namespace App\Action\API;

use App\Core\Controller\AbstractController;
use App\Service\GamesNameTrieManager;
use App\Serializer\ObjectSerializer;

class GetGamesSortByName  extends AbstractController
{
    public function __invoke(){

        $gamesmanager = New GamesNameTrieManager();

        $games = $gamesmanager->getFirstsGamesByName(intval($_GET['pageid']));

        return json_encode($games);
    }
}
