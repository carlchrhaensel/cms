<?php

/**
 * Description
 *
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
        $dataResponse["stats"] = array();

        $stmtStatsToday = $database->getConnection()->prepare("SELECT SUM(count) AS count
                                                                     FROM stats
                                                                     WHERE date = CURRENT_DATE()");
        $stmtStatsToday->execute();

        $row = $stmtStatsToday->fetch();

        $count = $row["count"] != null ? $row["count"] : 0;
        $dataResponse["stats"]["today"] = $count;


        $stmtStatsYear = $database->getConnection()->prepare("SELECT SUM(count) AS count
                                                                    FROM stats
                                                                    WHERE YEAR(date) = YEAR(CURRENT_DATE())");
        $stmtStatsYear->execute();

        $row = $stmtStatsYear->fetch();

        $count = $row["count"] != null ? $row["count"] : 0;
        $dataResponse["stats"]["year"] = $count;
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