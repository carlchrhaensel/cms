<?php

class Navbar implements PageComponent
{
    private array $items = array();

    public function __construct(Page $page)
    {
        $stmtItems = $page->getDatabase()->getConnection()->prepare("SELECT * FROM navbar");
        $stmtItems->execute();
        while ($row = $stmtItems->fetch()) {
            $this->items[] = array("href" => $row["href"], "content" => $row["text"]);
        }
    }

    public function getHtml(): string
    {
        $nav = "<nav class='nav'>";
        $nav .= "<div class='nav__content'>";

        foreach ($this->items as $item) {
            $nav .= "<a href='{$item["href"]}'>{$item["content"]}</a>";
        }

        $nav .= "</div>";
        $nav .= "</nav>";
        return $nav;
    }
}