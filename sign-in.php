<?php
include('config.php');
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $contractor_id = $_POST['contractor_id'];
    $site = $_POST['site'];
    $stmt = $conn->prepare("INSERT INTO attendance (contractor_id, sign_in_time, site) VALUES (?, NOW(), ?)");
    $stmt->bind_param("is", $contractor_id, $site);
    $stmt->execute();
    echo "Sign-in successful!";
}
?>
<form method="POST">
    Contractor ID: <input type="text" name="contractor_id">
    Work Site: <input type="text" name="site">
    <button type="submit">Sign In</button>
</form>