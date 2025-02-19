<?php
include('config.php');
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $contractor_id = $_POST['contractor_id'];
    $stmt = $conn->prepare("UPDATE attendance SET sign_out_time = NOW() WHERE contractor_id = ? AND sign_out_time IS NULL");
    $stmt->bind_param("i", $contractor_id);
    $stmt->execute();
    echo "Sign-out successful!";
}
?>
<form method="POST">
    Contractor ID: <input type="text" name="contractor_id">
    <button type="submit">Sign Out</button>
</form>
