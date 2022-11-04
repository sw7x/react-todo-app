<?php 

//Access-Control-Allow-Origin header with wildcard.
//header('Access-Control-Allow-Origin: *');

//header('Content-Type: application/json');








include('init.php'); 
include "dbcon.php";






$data = json_decode(file_get_contents('php://input'), true);


//var_dump($data);


// var_dump($_GET);

// var_dump($_POST);

// var_dump($_REQUEST);















if(isset($data['task'])){
    $task = $data['task'];
}else{
    $task = 'select';
}












if($task == 'select'){
    $result = select2($conn);
}else if($task == 'insert'){


    //var_dump($data); 
    //$result =   $data;


    $topic   = $data['topic'];
    $status  = $data['status'];
    $status  = 0;

    

    try{
        /*insert query*/    
        $sql = "INSERT INTO todolist(topic,status) VALUES(?,?)";
        $stmt       =   $conn->prepare($sql);    
        $isExecute  =   $stmt->execute(array($topic,$status));
        
        $id = $conn->lastInsertId();
        $result['status'] = $isExecute;
        $result['id']     = $id;
        //var_dump($isExecute);

    }catch(Exception $e){
        echo $e->getMessage();
        $result['status'] = FALSE;
    }
    








}else if($task == 'update'){
    //var_dump('update111'); 
    //var_dump($data); 
    
    try{

        $topic   = $data['topic'];
        $status  = $data['status'];
        $id      = $data['id'];


        $status = ($status)?1:0;

        //update
        $sql="UPDATE todolist SET status=? WHERE id=?";
        $stmt = $conn->prepare($sql);
       
      
        $isExecute =  $stmt->execute(array($status,$id));
        // $count = $stmt->rowCount();   
        // var_dump($count);
        $result['status'] = $isExecute;       

    }catch(Exception $e){
        echo $e->getMessage();
        $result['status'] = FALSE;
    }

}else if($task == 'delete'){
    //var_dump($data);    

    try{

        //delete
        $sql                = "DELETE FROM todolist WHERE id=?";
        $stmt               = $conn->prepare($sql);
        $isExecute          = $stmt->execute(array($data['id']));
        $result['status']   = $isExecute;
        // $count = $stmt->rowCount();   
        // var_dump($count);

    }catch(Exception $e){
        echo $e->getMessage();
        $result['status'] = FALSE;
    }


}else{


    $result = select2($conn);
}





function select2($conn){
    //select
    $sql = "SELECT * FROM todolist";    
    $stmt = $conn->prepare($sql);
    $isExecute =  $stmt->execute(array());
    //$result = $stmt->fetch(PDO::FETCH_ASSOC);                
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $modifiedArr =array();
    foreach ($result as $key => $value) {
        $tempArr =array();


        $tempArr['id']      = $value['id'];
        $tempArr['topic']   = $value['topic'];
        $statVal = ($value['status']=='1')?true:false;
        $tempArr['status']  = $statVal;


        $modifiedArr[] = $tempArr;
        //var_dump($value);
    }
    //var_dump($modifiedArr);


    //$rows = $stmt->rowCount();
    return $modifiedArr;
}








echo json_encode($result);
// foreach ($result as $value) {
//     var_dump($value);
// }



















