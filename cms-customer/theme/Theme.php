<?php

use JetBrains\PhpStorm\Pure;

require_once realpath(dirname(__FILE__)) . "/../page/Header.php";
require_once realpath(dirname(__FILE__)) . "/../page/Navbar.php";
require_once realpath(dirname(__FILE__)) . "/../page/Sidebar.php";
require_once realpath(dirname(__FILE__)) . "/../page/Footer.php";
require_once realpath(dirname(__FILE__)) . "/../page/PageContent.php";


class Theme
{
    private string $themeName = "BaseTheme";

    public function __construct(private Page $page)
    {
    }

    /**
     * @return string
     */
    public final function getThemeName(): string
    {
        return $this->themeName;
    }

    #[Pure] public function getStylesPath(): string
    {
        return "/themes/" . lcfirst($this->page->getSelectedTheme()) . "/theme.css";
    }


    #[Pure] public function getComponentH1($content): string
    {
        return "<h1 class='h1'>$content</h1>";
    }

    #[Pure] public function getComponentH2($content): string
    {
        return "<h2 class='h2'>$content</h2>";
    }

    #[Pure] public function getComponentH3($content): string
    {
        return "<h3 class='h3'>$content</h3>";
    }

    #[Pure] public function getComponentText($content): string
    {
        return "<div class='text'>$content</div>";
    }

    /**
     * @return PageContent
     */
    #[Pure] public function getContent(): PageContent
    {
        return new PageContent($this->page);
    }

    /**
     * @return Header
     */
    public function getHeader(): Header
    {
        return new Header($this->page);
    }

    public function getNavbar(): Navbar
    {
        return new Navbar($this->page);
    }

    public function getSidebar(): Sidebar
    {
        return new Sidebar($this->page);
    }

    public function getFooter(): Footer
    {
        return new Footer($this->page);
    }

    public function getBody(): string
    {
        $body = $this->getHeader()->getHtml();
        $body .= $this->getNavbar()->getHtml();

        $body .= "<section class='content'>";
        $body .= $this->getContent()->getHtml();
        $body .= $this->getSidebar()->getHtml();
        $body .= "</section>";

        $body .= $this->getFooter()->getHtml();

        return $body;
    }
}