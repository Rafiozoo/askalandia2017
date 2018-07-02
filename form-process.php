<?php

$errorMSG = "";

// NAME
if (empty($_POST["name"])) {
    $errorMSG = "Imię jest wymagane ";
} else {
    $name = $_POST["name"];
}

// EMAIL
if (empty($_POST["email"])) {
    $errorMSG .= "Email jest wymagany ";
} else {
    $email = $_POST["email"];
}

// MESSAGE
if (empty($_POST["message"])) {
    $errorMSG .= "Treść jest wymagana ";
} else {
    $message = $_POST["message"];
}

//Add your email here
$EmailTo = "askalandia@gmail.com";
$Subject = "Kontakt ze strony [formularz]";

// prepare email body text
$Body = "";
$Body .= "Imię: ";
$Body .= $name;
$Body .= "\n";
$Body .= "Email: ";
$Body .= $email;
$Body .= "\n\n";
$Body .= "Wiadomość: \n";
$Body .= $message;
$Body .= "\n";

// send email
$success = mail($EmailTo, $Subject, $Body, "From:".$email);

// redirect to success page
if ($success && $errorMSG == ""){
   echo "success";
}else{
    if($errorMSG == ""){
        echo "Coś nie poszło :(";
    } else {
        echo $errorMSG;
    }
}

?>