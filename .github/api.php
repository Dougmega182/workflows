// api.php - API for Sign In/Out
<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action']; // sign_in or sign_out
    $qr_code = $_POST['qr_code'];
    $timestamp = date('Y-m-d H:i:s');
    
    $stmt = $pdo->prepare("INSERT INTO attendance (qr_code, action, timestamp) VALUES (?, ?, ?)");
    if ($stmt->execute([$qr_code, $action, $timestamp])) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Database error']);
    }
    exit;
} ?>