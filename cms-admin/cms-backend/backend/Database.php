<?php

/**
 * Description
 * @author Carl-Christian Hänsel
 */


use JetBrains\PhpStorm\Pure;

class Database
{
    private PDO $connection;
    private bool $loggedIn;

    public function __construct(private DbCredentials $dbCredentials)
    {
        try {
            $dsn = "mysql:dbname={$dbCredentials->getDbName()};host={$dbCredentials->getHost()};port={$dbCredentials->getPort()}";
            //echo $dsn;
            $pdo = new PDO($dsn, $dbCredentials->getUsername(), $dbCredentials->getPassword());
            $pdo->exec("set names utf8");
            $this->connection = $pdo;
            $this->loggedIn = true;
        } catch (Exception $e) {
            echo $e;
            $this->loggedIn = false;
        }
    }

    /**
     * @return PDO
     */
    public function getConnection(): PDO
    {
        return $this->connection;
    }

    /**
     * @return string
     */
    #[Pure] public function __toString(): string
    {
        return "LoggedIn: $this->loggedIn; Host: {$this->dbCredentials->getHost()}";
    }
}