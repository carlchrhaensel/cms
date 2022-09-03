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

function getPageData(Database $database, int $id): ?array
{
    $stmtPageInfo = $database->getConnection()->prepare("SELECT * FROM pages WHERE id=:id");
    $stmtPageInfo->bindParam(":id", $id);
    $stmtPageInfo->execute();

    $row = $stmtPageInfo->fetch();
    if ($stmtPageInfo->rowCount() == 0) {
        return null;
    }
    $pageData = array();
    $pageData["title"] = $row["title"];
    $pageData["url"] = $row["url"];
    $pageData["id"] = $row["id"];
    $pageData["content"] = [];

    $stmtPageContent = $database->getConnection()->prepare("SELECT *
                                                                  FROM page_content
                                                                  WHERE page_id = :id
                                                                  ORDER BY `order`");
    $stmtPageContent->bindParam(":id", $id);
    $stmtPageContent->execute();

    while ($row = $stmtPageContent->fetch()) {
        $content = array();
        $content["content"] = $row["content"];
        $content["type"] = $row["type"];
        $pageData["content"][] = $content;
    }

    return $pageData;
}

function urlExists(Database $database, string $url, int $ignoreId = -1): bool
{
    $url = rtrim($url, " /");

    $stmtUrlExists = $database->getConnection()->prepare("SELECT * FROM pages WHERE url = :url AND !(id = :ignore)");
    $stmtUrlExists->bindParam(":url", $url);
    $stmtUrlExists->bindParam(":ignore", $ignoreId);
    $stmtUrlExists->execute();
    return $stmtUrlExists->rowCount() > 0;
}


switch ($method) {
    case 'GET':
        // send data
        $id = $_GET["id"] ?? -1;
        if ($id == -1) {
            echo json_encode([]);
            exit();
        }
        $pageData = getPageData($database, intval($id));
        if ($pageData == null) return;

        $dataResponse["page"] = $pageData;
        break;
    case 'POST':
        // add data
        $dataResponse["success"] = "success";
        $url = $requestUri = rtrim($dataRequest->{"url"}, " /");

        if (urlExists($database, $url, -1)) {
            $dataResponse["success"] = "failed";
            echo json_encode($dataResponse);
            exit();
        }

        $stmtInsertInfo = $database->getConnection()->prepare("INSERT INTO pages (title, url)
                                                                     VALUES (:title, :url)");
        $stmtInsertInfo->bindParam(":title", $dataRequest->{"title"});
        $stmtInsertInfo->bindParam(":url", $url);
        $stmtInsertInfo->execute();
        $newPageId = $database->getConnection()->lastInsertId();

        $stmtInsertContent = $database->getConnection()->prepare("INSERT INTO page_content (page_id, `order`, content, type)
                                                                            VALUES (:pageId, :order, :content, :type)");

        $order = 0;
        foreach ($dataRequest->{"content"} as $contentItem) {
            $stmtInsertContent->execute(array(
                ":pageId" => $newPageId,
                ":order" => $order,
                ":content" => $contentItem->{"content"},
                ":type" => $contentItem->{"type"}
            ));

            $order++;
        }

        $pageData = getPageData($database, intval($newPageId));
        if ($pageData == null) return;

        $dataResponse["page"] = $pageData;
        break;
    case 'PUT':
        // change data
        $id = $_GET["id"] ?? -1;
        if ($id == -1) {
            echo json_encode([]);
            exit();
        }
        $success = true;
        $url = $requestUri = rtrim($dataRequest->{"url"}, " /");

        if (urlExists($database, $url, intval($id))) {
            $dataResponse["success"] = false;
            echo json_encode($dataResponse);
            exit();
        }

        $stmtUpdateInfo = $database->getConnection()->prepare("UPDATE pages
                                                                     SET title = :title, url = :url
                                                                     WHERE id = :id");
        $stmtUpdateInfo->bindParam(":title", $dataRequest->{"title"});
        $stmtUpdateInfo->bindParam(":url", $url);
        $stmtUpdateInfo->bindParam(":id", $id);
        $success = $stmtUpdateInfo->execute();

        $stmtDeleteContent = $database->getConnection()->prepare("DELETE
                                                                        FROM page_content
                                                                        WHERE page_id = :id");
        $stmtDeleteContent->bindParam(":id", $id);
        $success = $success && $stmtDeleteContent->execute();

        $stmtInsertContent = $database->getConnection()->prepare("INSERT INTO page_content (page_id, `order`, content, type)
                                                                        VALUES (:pageId, :order, :content, :type)");

        $order = 0;
        foreach ($dataRequest->{"content"} as $contentItem) {
            $success = $success && $stmtInsertContent->execute(array(
                    ":pageId" => $id,
                    ":order" => $order,
                    ":content" => $contentItem->{"content"},
                    ":type" => $contentItem->{"type"}
                ));

            $order++;
        }

        $pageData = getPageData($database, intval($id));
        if ($pageData == null) return;

        $dataResponse["page"] = $pageData;
        $dataResponse["success"] = $success ? "success" : "failed";
        break;
    case "DELETE":
        $id = $_GET["id"] ?? -1;
        if ($id == -1) {
            echo json_encode([]);
            exit();
        }
        $success = true;

        $stmtDelete = $database->getConnection()->prepare("DELETE FROM pages WHERE id = :id");
        $stmtDelete->bindParam(":id", $id);
        $success = $stmtDelete->execute();

        $stmtDelete = $database->getConnection()->prepare("DELETE FROM page_content WHERE page_id = :pageId");
        $stmtDelete->bindParam(":pageId", $id);
        $success = $success && $stmtDelete->execute();

        $dataResponse["success"] = $success ? "success" : "failed";
        break;
}

echo json_encode($dataResponse);