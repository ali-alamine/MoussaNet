<?php
include './connection.php';
openConn();

$requestData = $_REQUEST;
$rowsReq = (isset($_GET['length'])) ? intval($_GET['length']) : 10;
$start = (isset($_GET['start'])) ? intval($_GET['start']) : 0;
$orderString = "";

$rowsCount = mysqli_fetch_assoc(mysqli_query(openConn(), "SELECT COUNT(INVID) as exp FROM invoice where type IN ('RC','CT','OF') "))['exp'];

if (count($_GET['order'])) {
    $orderBy = $_GET['columns'][$_GET['order'][0]['column']]['data'];

    if ($orderBy == 'clientName') {
        $orderBy = 'person.name';
    }

    
    $orderDir = $_GET['order'][0]['dir'];
    $orderString = " ORDER BY " . $orderBy . " " . $orderDir;
}
if (isset($_GET["search"]["value"]) && !empty($_GET["search"]["value"])) {
    $search = $_GET["search"]["value"];

    $getAllFactureQuery = " select invoice.date,invoice.quantity,invoice.profit,item.name,invoice.price,person.name as pName from invoice inner join person on invoice.PID = person.PID inner join item on invoice.IID = item.IID where invoice.type IN ('RC','CT','OF') AND (  date  like '%" . $search . "%' OR person.name like '%" . $search . "%' OR item.name like '%" . $search . "%' )  " . $orderString . " LIMIT " . $rowsReq . " OFFSET " . $start;

} else {

    $getAllFactureQuery = "select invoice.date,invoice.quantity,invoice.profit,item.name,invoice.price,person.name as pName from invoice inner join person on invoice.PID = person.PID inner join item on invoice.IID = item.IID where invoice.type IN ('RC','CT','OF')   " . $orderString . " LIMIT " . $rowsReq . " OFFSET " . $start;

}

$getAllFactureQuerySQL = mysqli_query(openConn(), $getAllFactureQuery);
$rowsCountFilter = mysqli_num_rows($getAllFactureQuerySQL);
$jsonData = "";
if ($getAllFactureQuerySQL) {
    while ($row = mysqli_fetch_assoc($getAllFactureQuerySQL)) {
        if ($row != null) {
            if ($jsonData != "") {
                $jsonData = $jsonData . ",";
            }
            $jsonData = $jsonData . '{"date":"' . $row['date'] . '",';
            $jsonData = $jsonData . '"quantity":"' . $row['quantity'] . '",';
            $jsonData = $jsonData . '"price":"' . $row['price'] . '",';
            $jsonData = $jsonData . '"profit":"' . $row['profit'] . '",';
            $jsonData = $jsonData . '"clientName":"' . $row['pName'] . '",';
            $jsonData = $jsonData . '"name":"' . $row['name'] . '"}';
        }
    }
}
$jsonData = '[' . $jsonData . ']';
$jsonData2 = '{"draw":' . intval($requestData['draw']) . ',"recordsTotal":' . $rowsCount . ', "recordsFiltered":' . $rowsCount . ', "data":' . $jsonData . '}';
echo ($jsonData2);
closeConn();
