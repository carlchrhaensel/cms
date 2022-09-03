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

function getHeaderContent(Database $database): array
{
    $headerContent = array();

    $stmtHeader = $database->getConnection()->prepare("SELECT `value` FROM settings WHERE `key` = :key");
    $stmtHeader->execute(array(":key" => "headerHeading"));
    if ($stmtHeader->rowCount() == 1) {
        $row = $stmtHeader->fetch();
        $headerContent["headerHeading"] = $row["value"];
    } else {
        $headerContent["headerHeading"] = "";
    }

    if ($stmtHeader->rowCount() == 1) {
        $stmtHeader->execute(array(":key" => "headerSubHeading"));
        $row = $stmtHeader->fetch();
        $headerContent["headerSubHeading"] = $row["value"];
    } else {
        $headerContent["headerSubHeading"] = "";
    }

    return $headerContent;
}


switch ($method) {
    case 'GET':
        // send data
        $dataResponse["header"] = getHeaderContent($database);
        break;
    case 'POST':
        // add data
        // not required
        break;
    case 'PUT':
        // change data
        $success = true;

        $stmtHeaderHeadingExists = $database->getConnection()->prepare("SELECT *
                                                                       FROM settings 
                                                                       WHERE `key` = 'headerHeading'");
        $success = $stmtHeaderHeadingExists->execute();
        if ($stmtHeaderHeadingExists->rowCount() == 0) {
            $stmtInsertHeaderHeading = $database->getConnection()->prepare("INSERT INTO settings (`key`, value)
                                                                           VALUES ('headerHeading', :headerHeading)");
            $stmtInsertHeaderHeading->bindParam(":headerHeading", $dataRequest->{"headerHeading"});
            $success = $success && $stmtInsertHeaderHeading->execute();
        } else {
            $stmtUpdateHeaderHeading = $database->getConnection()->prepare("UPDATE settings
                                                                           SET value = :headerHeading
                                                                           WHERE `key` = 'headerHeading'");
            $stmtUpdateHeaderHeading->bindParam(":headerHeading", $dataRequest->{"headerHeading"});
            $success = $success && $stmtUpdateHeaderHeading->execute();
        }


        $stmtHeaderSubHeadingExists = $database->getConnection()->prepare("SELECT *
                                                                       FROM settings 
                                                                       WHERE `key` = 'headerSubHeading'");
        $success = $success && $stmtHeaderSubHeadingExists->execute();
        if ($stmtHeaderSubHeadingExists->rowCount() == 0) {
            $stmtInsertHeaderSubHeading = $database->getConnection()->prepare("INSERT INTO settings (`key`, value)
                                                                           VALUES ('headerSubHeading', :headerSubHeading)");
            $stmtInsertHeaderSubHeading->bindParam(":headerSubHeading", $dataRequest->{"headerSubHeading"});
            $success = $success && $stmtInsertHeaderSubHeading->execute();
        } else {
            $stmtUpdateHeaderSubHeading = $database->getConnection()->prepare("UPDATE settings
                                                                           SET value = :headerSubHeading
                                                                           WHERE `key` = 'headerSubHeading'");
            $stmtUpdateHeaderSubHeading->bindParam(":headerSubHeading", $dataRequest->{"headerSubHeading"});
            $success = $success && $stmtUpdateHeaderSubHeading->execute();
        }

        $dataResponse["header"] = getHeaderContent($database);
        $dataResponse["success"] = $success ? "success" : "failed";

        break;
}

echo json_encode($dataResponse);