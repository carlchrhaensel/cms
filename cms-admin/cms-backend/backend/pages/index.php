<?php

/**
 * Description
 * @author Carl-Christian Hänsel
 */
require_once "../../ServerData.php";
require_once "../Database.php";
require_once "../DbCredentials.php";
header('Content-Type: application/json; charset=utf-8');

$dataRequest = json_decode(file_get_contents('php://input'));
$dataResponse = array();
$method = $_SERVER['REQUEST_METHOD'];

new ServerData();
$database = new Database(ServerData::$dbCredentials);

switch ($method) {
    case 'GET':
        // send data
        $stmtPages = $database->getConnection()->prepare("SELECT * FROM pages");
        $stmtPages->execute();
        while ($row = $stmtPages->fetch()) {
            $page = array();
            $page["id"] = $row["id"];
            $page["title"] = $row["title"];
            $page["url"] = $row["url"];
            $dataResponse[] = $page;
        }
        break;
    case
    'POST':
        // add data
        break;
    case 'PUT':
        // change data
        break;
}

echo json_encode($dataResponse);