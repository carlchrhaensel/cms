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

function getNavbarContent(Database $database): array
{
    $items = array();

    $stmtNavbarItems = $database->getConnection()->prepare("SELECT text, href
                                                                  FROM navbar");
    $stmtNavbarItems->execute();
    while ($row = $stmtNavbarItems->fetch()) {
        $items[] = array("text" => $row["text"], "href" => $row["href"]);
    }

    return $items;
}


switch ($method) {
    case 'GET':
        // send data
        $dataResponse["navbar"] = getNavbarContent($database);

        break;
    case 'POST':
        // add data
        // not required
        break;
    case 'PUT':
        // change data
        $success = true;

        /** @noinspection SqlWithoutWhere */
        $stmtClear = $database->getConnection()->prepare("DELETE FROM navbar");
        $success = $stmtClear->execute();

        $stmtInsert = $database->getConnection()->prepare("INSERT INTO navbar (text, href)  VALUES (:text, :href)");
        foreach ($dataRequest as $item) {
            $success = $success && $stmtInsert->execute(array(":text" => $item->{"text"}, ":href" => $item->{"href"}));
        }

        $dataResponse["navbar"] = getNavbarContent($database);
        $dataResponse["success"] = $success ? "success" : "failed";
        break;
}

echo json_encode($dataResponse);