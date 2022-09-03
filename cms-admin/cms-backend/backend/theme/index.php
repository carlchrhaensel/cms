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

function getTheme(Database $database): string
{
    $stmtTheme = $database->getConnection()->prepare("SELECT value
                                                            FROM settings
                                                            WHERE `key` = 'theme'");
    $stmtTheme->execute();
    if ($stmtTheme->rowCount() == 0) return "";

    $row = $stmtTheme->fetch();
    return $row["value"];
}


switch ($method) {
    case 'GET':
        // send data
        $dataResponse["theme"] = getTheme($database);
        break;
    case 'POST':
        // add data
        // not required
        break;
    case 'PUT':
        // change data
        $success = true;

        $stmtThemeExists = $database->getConnection()->prepare("SELECT *
                                                                      FROM settings
                                                                      WHERE `key` = 'theme'");
        $success = $stmtThemeExists->execute();
        if ($stmtThemeExists->rowCount() == 0) {
            $stmtInsertTheme = $database->getConnection()->prepare("INSERT INTO settings (`key`, value)
                                                                          VALUES ('theme', :value)");
            $stmtInsertTheme->bindParam(":value", $dataRequest->{"theme"});
            $success = $success && $stmtInsertTheme->execute();
        } else {
            $stmtUpdateTheme = $database->getConnection()->prepare("UPDATE settings
                                                                          SET value = :value
                                                                          WHERE `key` = 'theme'");
            $stmtUpdateTheme->bindParam(":value", $dataRequest->{"theme"});
            $success = $success && $stmtUpdateTheme->execute();
        }

        $dataResponse["theme"] = getTheme($database);
        $dataResponse["success"] = $success ? "success" : "failed";

        break;
}

echo json_encode($dataResponse);