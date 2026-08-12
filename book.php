<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = htmlspecialchars($_POST['name']);
    $phone = htmlspecialchars($_POST['phone']);
    $car = htmlspecialchars($_POST['car']);

    $data = "Name: $name | Phone: $phone | Car: $car" . PHP_EOL;

    $file = 'bookings.txt';

    if(file_put_contents($file, $data, FILE_APPEND | LOCK_EX)) {

        header("Location: index.html?success=1");
        exit();

    } else {

        header("Location: index.html?error=1");
        exit();
    }

} else {
    header("Location: index.html");
    exit();
}
?>