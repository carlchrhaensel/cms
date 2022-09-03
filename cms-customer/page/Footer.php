<?php

class Footer implements PageComponent
{
    private string $footerHtml;
    public function __construct(Page $page)
    {
        $stmtFooter = $page->getDatabase()->getConnection()->prepare("SELECT value FROM settings WHERE `key` = 'footer'");
        $stmtFooter->execute();
        $row = $stmtFooter->fetch();
        $this->footerHtml = $row["value"];
    }

    public function getHtml(): string
    {
        $footer = "<footer class='footer'>";
        $footer .= "<div class='footer__content'>";
        $footer .= $this->footerHtml;
        $footer .= "</div>";
        $footer .= "</footer>";
        return $footer;
    }
}