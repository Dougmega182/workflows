<?php
$host = getenv('DB_HOST');
$username = getenv('DB_USER');
$password = getenv('DB_PASS');
$database = getenv('DB_NAME');
$conn = new mysqli($host, $username, $password, $database);

?>