<?php

/**
 * Description
 *
 * @author Carl-Christian Hänsel
 */
require_once "Database.php";
require_once "DbCredentials.php";
require_once "ServerData.php";
require_once "page/Page.php";

new ServerData();
$database = new Database(ServerData::$dbCredentials);

$page = new Page($database);
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link rel="stylesheet" href="/css/styles.css">
    <link rel="stylesheet" href="<?php echo $page->getTheme()->getStylesPath(); ?>">
    <title><?php echo $page->getTitle(); ?></title>
</head>
<body class="<?php echo lcfirst($page->getSelectedTheme()) ?>">

<?php
echo $page->getTheme()->getBody();
?>

</body>
</html>
