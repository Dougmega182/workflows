// generate_qr.php - Generate QR Code for Each Tradesman
<?php
include 'vendor/autoload.php'; // Require QR Code package
use Endroid\QrCode\QrCode;

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
    $id = $_GET['id'];
    $qrCode = new QrCode($id);
    header('Content-Type: '.$qrCode->getContentType());
    echo $qrCode->writeString();
    exit;
}
?>