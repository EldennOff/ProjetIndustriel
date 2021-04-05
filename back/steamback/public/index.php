<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
use App\Core\App;

require_once __DIR__ . '/../vendor/autoload.php';

$app = new App();
$app->handle();
