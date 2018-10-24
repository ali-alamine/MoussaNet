<?php
include './connection.php';
openConn();

$requestData = $_REQUEST;
$rowsReq = (isset($_GET['length'])) ? intval($_GET['length']) : 10;
$start = (isset($_GET['start'])) ? intval($_GET['start']) : 0;
$orderString = "";

$rowsCount = mysqli_fetch_assoc(mysqli_query(openConn(), "SELECT COUNT(*) as exp FROM omt_operation where DATE(oper_date) = DATE(NOW())"))['exp'];
$search = $_GET['searchCriteria'];

$searchCriteria = json_decode($search);

$condition = " ";

if (isset($_GET['nameSearch']) && $_GET['nameSearch'] != "") {
    $nameSearch = $_GET['nameSearch'];
    $condition = $condition . " AND per_name LIKE '%" . $nameSearch . "%' ";

}

if (isset($_GET['codeSearch']) && $_GET['codeSearch'] != "") {
    $codeSearch = $_GET['codeSearch'];
    $condition = $condition . " AND per_code LIKE '%" . $codeSearch . "%' ";

}

if (isset($_GET['phoneSearch']) && $_GET['phoneSearch'] != "") {
    $phoneSearch = $_GET['phoneSearch'];
    $condition = $condition . " AND per_phone LIKE '%" . $phoneSearch . "%' ";

}

if (isset($_GET['addressSearch']) && $_GET['addressSearch'] != "") {
    $addressSearch = $_GET['addressSearch'];
    $condition = $condition . " AND per_address LIKE '%" . $addressSearch . "%' ";

}

if (count($_GET['order'])) {
    $orderBy = $_GET['columns'][$_GET['order'][0]['column']]['data'];
    if ($orderBy == 'ID') {
        $orderBy = 'perID';
    }
   

    $orderDir = $_GET['order'][0]['dir'];
    $orderString = " ORDER BY " . $orderBy . " " . $orderDir;
}

$getAllFactureQuery = "select * , DATE_FORMAT(oper_date,'%h:%i:%s %p') as oper_time from omt_operation inner join person on omt_operation.oper_client_id = person.PID where DATE(oper_date) = DATE(NOW()) " . $condition . $orderString . " LIMIT " . $rowsReq . " OFFSET " . $start;


$getAllFactureQuerySQL = mysqli_query(openConn(), $getAllFactureQuery);
$rowsCountFilter = mysqli_num_rows($getAllFactureQuerySQL);
$jsonData = "";
if ($getAllFactureQuerySQL) {
    while ($row = mysqli_fetch_assoc($getAllFactureQuerySQL)) {
        if ($row != null) {
            if ($jsonData != "") {
                $jsonData = $jsonData . ",";
            }
            $jsonData = $jsonData . '{"oper_time":"' . $row['oper_time'] . '",';
            $jsonData = $jsonData . '"oper_type":"' . $row['oper_type'] . '",';
            $jsonData = $jsonData . '"oper_amount_d":"' . $row['oper_amount_d'] . '",';
            $jsonData = $jsonData . '"oper_amount_l":"' . $row['oper_amount_l'] . '",';
            $jsonData = $jsonData . '"oper_tran_type":"' . $row['oper_tran_type'] . '",';
            $jsonData = $jsonData . '"oper_currency":"' . $row['oper_currency'] . '",';
            $jsonData = $jsonData . '"oper_is_paid":"' . $row['oper_is_paid'] . '",';
            $jsonData = $jsonData . '"name":"' . $row['name'] . '",';
            $jsonData = $jsonData . '"oper_client_id":"' . $row['oper_client_id'] . '"}';
        }
    }
}
$jsonData = '[' . $jsonData . ']';
$jsonData2 = '{"draw":' . intval($requestData['draw']) . ',"recordsTotal":' . $rowsCount . ', "recordsFiltered":' . $rowsCount . ', "data":' . $jsonData . '}';
echo ($jsonData2);
closeConn();
