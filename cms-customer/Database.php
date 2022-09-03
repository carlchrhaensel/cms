<?php

/**
 * Description
 * @author Carl-Christian Hänsel
 */


use JetBrains\PhpStorm\Pure;

class Database
{
    private PDO $connection;

    public function __construct(DbCredentials $dbCredentials)
    {
        try {
            $dsn = "mysql:dbname={$dbCredentials->getDbName()};host={$dbCredentials->getHost()};port={$dbCredentials->getPort()}";
            $pdo = new PDO($dsn, $dbCredentials->getUsername(), $dbCredentials->getPassword());
            $pdo->exec("set names utf8");
            $this->connection = $pdo;
        } catch (Exception $e) {
            echo $e;
        }
    }

    /**
     * @return PDO
     */
    public function getConnection(): PDO
    {
        return $this->connection;
    }
}