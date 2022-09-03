<?php

use JetBrains\PhpStorm\Pure;

class Header implements PageComponent
{

    private string $headerHeading = "";
    private string $headerSubHeading = "";

    public function __construct(Page $page)
    {
        $stmtSetting = $page->getDatabase()->getConnection()->prepare("SELECT value FROM settings WHERE `key` = :key");
        $stmtSetting->execute(array(":key" => "headerHeading"));
        if ($stmtSetting->rowCount() > 0) {
            $row = $stmtSetting->fetch();
            $this->headerHeading = $row["value"];
        }

        $stmtSetting->execute(array(":key" => "headerSubHeading"));
        if ($stmtSetting->rowCount() > 0) {
            $row = $stmtSetting->fetch();
            $this->headerSubHeading = $row["value"];
        }
    }

    /**
     * @return string
     */
    #[Pure] public function getHtml(): string
    {
        $header = "<header class='header'>";
        $header .= "<div class='header__content'>";
        $header .= "<a class='header__heading' href='/'>$this->headerHeading</a>";
        $header .= "<p class='header__subHeading'>$this->headerSubHeading</p>";
        $header .= "</div>";
        $header .= "</header>";

        return $header;
    }
}