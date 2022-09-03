<?php

use JetBrains\PhpStorm\Pure;

require_once realpath(dirname(__FILE__)) . "/../components/PageComponent.php";

class PageContent implements PageComponent
{
    public function __construct(private Page $page)
    {
    }

    #[Pure] public function getHtml(): string
    {
        if ($this->page->getHttpResponseCode() == 404) {
            return $this->get404();
        }


        $main = "<main class='main'>";

        $main .= "<h1 id='pageTitle'>{$this->page->getTitle()}</h1>";

        $main .= implode('', $this->getComponents());

        $main .= "</main>";

        return $main;
    }

    #[Pure] public function getComponents(): array
    {

        $components = array();
        foreach ($this->page->getPageContents() as $item) {
            $components[] = match ($item["type"]) {
                "h1" => $this->page->getTheme()->getComponentH1($item["content"]),
                "h2" => $this->page->getTheme()->getComponentH2($item["content"]),
                "h3" => $this->page->getTheme()->getComponentH3($item["content"]),
                default => $this->page->getTheme()->getComponentText($item["content"]),
            };
        }
        return $components;
    }

    public function get404(): string
    {
        return "<main class='main'><div>404: Die angegebene Seite konnte nicht gefunden werden</div></main>";
    }
}