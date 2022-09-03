<?php

/**
 * Description
 * @author Carl-Christian Hänsel
 */


class ServerData
{
    // Credentials for local development
    const DB_HOSTNAME = "localhost";
    const DB_NAME = "cms";
    const DB_PORT = 3306;
    const DB_USERNAME = "cms";
    const DB_PASSWORD = "ruzHRstag/U6!O5k";

    public static DbCredentials $dbCredentials;

    public function __construct()
    {
        $dbHostname = getenv("DB_HOSTNAME") == false ? self::DB_HOSTNAME : getenv("DB_HOSTNAME");
        $dbName = getenv("DB_NAME") == false ? self::DB_NAME : getenv("DB_NAME");
        $dbPort = getenv("DB_PORT") == false ? self::DB_PORT : getenv("DB_PORT");
        $dbUsername = getenv("DB_USERNAME") == false ? self::DB_USERNAME : getenv("DB_USERNAME");
        $dbPassword = getenv("DB_PASSWORD") == false ? self::DB_PASSWORD : getenv("DB_PASSWORD");

        ServerData::$dbCredentials = new DbCredentials(
            $dbHostname,
            $dbPort,
            $dbUsername,
            $dbPassword,
            $dbName);
    }
}