<?php

/**
 * Description
 *
 * @author Carl-Christian Hänsel
 */

class DbCredentials
{
    /**
     * @param string $host
     * @param string $port
     * @param string $username
     * @param string $password
     * @param string $dbName
     */
    public function __construct(private string $host,
                                private string $port,
                                private string $username,
                                private string $password,
                                private string $dbName)
    {
    }


    /**
     * @return string
     */
    public function getHost(): string
    {
        return $this->host;
    }

    /**
     * @return string
     */
    public function getPort(): string
    {
        return $this->port;
    }

    /**
     * @return string
     */
    public function getUsername(): string
    {
        return $this->username;
    }

    /**
     * @return string
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    /**
     * @return string
     */
    public function getDbName(): string
    {
        return $this->dbName;
    }
}