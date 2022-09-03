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

function getSidebarContent(Database $database): array
{
    $items = array();

    $stmtSidebarItems = $database->getConnection()->prepare("SELECT heading, content
                                                                  FROM sidebar");
    $stmtSidebarItems->execute();
    while ($row = $stmtSidebarItems->fetch()) {
        $items[] = array("heading" => $row["heading"], "content" => htmlspecialchars_decode($row["content"]));
    }

    return $items;
}


switch ($method) {
    case 'GET':
        // send data
        $dataResponse["sidebar"] = getSidebarContent($database);

        break;
    case 'POST':
        // add data
        // not required
        break;
    case 'PUT':
        // change data
        $success = true;

        /** @noinspection SqlWithoutWhere */
        $stmtClear = $database->getConnection()->prepare("DELETE FROM sidebar");
        $success = $stmtClear->execute();

        $stmtInsert = $database->getConnection()->prepare("INSERT INTO sidebar (heading, content)  VALUES (:heading, :content)");
        foreach ($dataRequest as $item) {
            $success = $success && $stmtInsert->execute(array(":heading" => $item->{"heading"}, ":content" => htmlspecialchars($item->{"content"})));
        }

        $dataResponse["sidebar"] = getSidebarContent($database);
        $dataResponse["success"] = $success ? "success" : "failed";

        break;
}

echo json_encode($dataResponse);