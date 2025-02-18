<?php
// Start session if needed
session_start();
include('./config.php'); // Include database connection
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Visitor Management System</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body { background-color: #f8f9fa; }
        .container { max-width: 600px; margin-top: 50px; }
        .card { border-radius: 15px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); }
    </style>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <a class="navbar-brand" href="#">Visitor Management</a>
        </div>
    </nav>

    <div class="container text-center">
        <div class="card p-4">
            <h2 class="mb-3">Welcome to the Visitor Management System</h2>
            <p>Track contractor check-ins and check-outs efficiently.</p>
            <div class="d-grid gap-2 mt-4">
                <form action="sign-in.php" method="POST">
                    <input type="text" name="name" class="form-control mb-2" placeholder="Name" required>
                    <input type="text" name="company" class="form-control mb-2" placeholder="Company" required>
                    <input type="text" name="site" class="form-control mb-2" placeholder="Work Site" required>
                    <button type="submit" class="btn btn-success btn-lg">Sign In</button>
                </form>
                <form action="sign-out.php" method="POST">
                    <input type="text" name="contractor_id" class="form-control mb-2" placeholder="Contractor ID" required>
                    <button type="submit" class="btn btn-danger btn-lg">Sign Out</button>
                </form>
            </div>
        </div>
    </div>

    <footer class="text-center mt-5 text-muted">
        <p>&copy; <?php echo date('Y'); ?> Visitor Management System</p>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>