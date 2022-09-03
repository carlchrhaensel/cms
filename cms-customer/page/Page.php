<?php

require_once realpath(dirname(__FILE__)) . "/../components/PageComponent.php";
require_once realpath(dirname(__FILE__)) . "/../theme/Theme.php";

require_once realpath(dirname(__FILE__)) . "/../themes/theme01/Theme01.php";
require_once realpath(dirname(__FILE__)) . "/../statistics/Statistics.php";


use JetBrains\PhpStorm\Pure;

/**
 * Description
 *
 * @author Carl-Christian Hänsel
 */
class Page
{
    private array $content = array();
    private string $title;
    private int $httpResponseCode = 200;

    private string $selectedTheme = "BaseTheme";
    private int $pageId;

    public function __construct(private Database $database)
    {

        $requestUri = $_SERVER['REQUEST_URI'];
        $requestUri = rtrim($requestUri, " /");
        $stmtInfo = $database->getConnection()->prepare("SELECT * FROM pages WHERE url = :url");
        $stmtInfo->bindParam(":url", $requestUri);
        $stmtInfo->execute();

        $stmtTheme = $this->database->getConnection()->prepare("SELECT value FROM settings WHERE `key` = 'theme'");
        $stmtTheme->execute();
        $row = $stmtTheme->fetch();
        $this->selectedTheme = $row["value"];

        if ($stmtInfo->rowCount() == 0) {
            $this->httpResponseCode = 404;
            $this->title = "404 - Seite nicht gefunden";
            http_response_code($this->httpResponseCode);
            return;
        }
        $row = $stmtInfo->fetch();
        $this->title = $row["title"];
        $this->pageId = intval($row["id"]);

        $stmtContent = $database->getConnection()->prepare("SELECT content, type
                                                                  FROM page_content
                                                                  WHERE page_id = :id
                                                                  ORDER BY `order`");
        $stmtContent->bindParam(":id", $this->pageId);
        $stmtContent->execute();

        while ($row = $stmtContent->fetch()) {
            $item = array();
            $item["content"] = $row["content"];
            $item["type"] = $row["type"];

            $this->content[] = $item;
        }

        new Statistics($this);
    }

    /**
     * @return array
     */
    public function getPageContents(): array
    {
        return $this->content;
    }

    /**
     * @return Theme
     */
    #[Pure] public function getTheme(): Theme
    {
        return match ($this->selectedTheme) {
            "Theme01" => new Theme01($this),
            default => new Theme($this),
        };
    }

    /**
     * @return mixed|string
     */
    public function getTitle(): mixed
    {
        return $this->title;
    }

    /**
     * @return int
     */
    public function getHttpResponseCode(): int
    {
        return $this->httpResponseCode;
    }

    /**
     * @return Database
     */
    public function getDatabase(): Database
    {
        return $this->database;
    }

    /**
     * @return mixed|string
     */
    public function getSelectedTheme(): mixed
    {
        return $this->selectedTheme;
    }

    /**
     * @return int
     */
    public function getPageId(): int
    {
        return $this->pageId;
    }
}