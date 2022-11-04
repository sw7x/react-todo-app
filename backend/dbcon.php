<?php 

	// $servername  = "localhost";
	// $username    = "root";
	// $password    = "";



	$servername  = "localhost";
	$username    = "susanth3_user";
	$password    = "j=Rrns)!ONgl";


	try {
	    $conn = new PDO("mysql:host=$servername;dbname=susanth3_todo", $username, $password);
	    // set the PDO error mode to exception
	    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	    //echo "Connected successfully";	    
	}catch(PDOException $e){
	    echo "Connection failed: " . $e->getMessage();
	}
	
?>

