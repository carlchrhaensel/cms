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

function getFooterContent(Database $database): string
{
    $stmtFooter = $database->getConnection()->prepare("SELECT `value`
                                                             FROM settings
                                                             WHERE `key` = 'footer'");
    $stmtFooter->execute();
    $row = $stmtFooter->fetch();
    return $row["value"];
}


switch ($method) {
    case 'GET':
        // send data
        $dataResponse["footer"] = getFooterContent($database);

        break;
    case
    'POST':
        // add data
        // not required
        break;
    case 'PUT':
        // change data
        $success = true;
        $footer = "";
        if (property_exists($dataRequest, "footer")) $footer = $dataRequest->{"footer"};
        $stmtFooterExists = $database->getConnection()->prepare("SELECT *
                                                                       FROM settings 
                                                                       WHERE `key` = 'footer'");
        $stmtFooterExists->execute();
        if ($stmtFooterExists->rowCount() == 0) {
            $stmtInsertFooter = $database->getConnection()->prepare("INSERT INTO settings (`key`, value)
                                                                           VALUES ('footer', :footer)");
            $stmtInsertFooter->bindParam(":footer", $footer);
            $success = $stmtInsertFooter->execute();
        } else {
            $stmtUpdateFooter = $database->getConnection()->prepare("UPDATE settings
                                                                           SET value = :footer
                                                                           WHERE `key` = 'footer'");
            $stmtUpdateFooter->bindParam(":footer", $footer);
            $success = $stmtUpdateFooter->execute();
        }

        $dataResponse["footer"] = getFooterContent($database);
        $dataResponse["success"] = $success ? "success" : "failed";
        break;
}

echo json_encode($dataResponse);