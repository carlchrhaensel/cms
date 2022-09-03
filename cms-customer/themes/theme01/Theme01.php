<?php

use JetBrains\PhpStorm\Pure;

class Theme01 extends Theme
{
    public string $themeName = "Theme01";

    #[Pure] public function getComponentH1($content): string
    {
        return "<h1 class='theme01__h1'>$content</h1>";
    }

    #[Pure] public function getComponentH2($content): string
    {
        return "<h2 class='theme01__h2'>$content</h2>";
    }

    #[Pure] public function getComponentH3($content): string
    {
        return "<h3 class='theme01__h3'>$content</h3>";
    }

    public function getBody(): string
    {
        $body = $this->getNavbar()->getHtml();
        $body .= $this->getHeader()->getHtml();

        $body .= "<section class='content'>";
        $body .= $this->getContent()->getHtml();
        $body .= $this->getSidebar()->getHtml();
        $body .= "</section>";

        $body .= $this->getFooter()->getHtml();

        return $body;
    }
}