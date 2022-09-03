<?php

class Sidebar implements PageComponent
{
    private array $items = array();

    public function __construct(Page $page)
    {
        $stmtSidebar = $page->getDatabase()->getConnection()->prepare("SELECT * FROM sidebar");
        $stmtSidebar->execute();
        while ($row = $stmtSidebar->fetch()) {
            $this->items[] = array("heading"=> $row["heading"], "content" => htmlspecialchars_decode($row["content"]));
        }
    }

    public function getHtml(): string
    {

        $aside = "<aside class='aside'>";
        $aside .= "";
        foreach ($this->items as $item) {
            $aside .= "<div>
                       <h1>{$item["heading"]}</h1>
                       {$item["content"]}
                       </div>";
        }

        $aside .= "</aside>";
        return $aside;
    }
}