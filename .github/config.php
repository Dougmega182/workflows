<?php
$host = getenv('DB_HOST');
$username = getenv('DB_USER');
$password = getenv('DB_PASS');
$database = getenv('DB_NAME');

// Initialize connection
$conn = mysqli_init();

// Set SSL certificate
//mysqli_ssl_set($conn, NULL, NULL, "D:\home\site\wwwroot\BaltimoreCyberTrustRoot.crt.pem", NULL, NULL);

// Establish the connection
mysqli_real_connect($conn, $host, $username, $password, $database, 3306, MYSQLI_CLIENT_SSL);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


?>
