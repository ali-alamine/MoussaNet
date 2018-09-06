<?php
require APPPATH . '/libraries/REST_Controller.php';
class sell extends REST_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('sell_model');
    }
    public function sell_post(){
        $bar_code = $this->post('bar_code');
        $CID = $this->post('clientID');
        $this->db->trans_start();
        $this->db->trans_strict(FALSE);
        $this->db->select('IID,type');
        $this->db->from('item');
        $this->db->where('bar_code', $bar_code );
        $query = $this->db->get();
        foreach ($query->result() as $row) {
            $IID = $row->IID;
            $type=$row->type;
        }
        if($type=="AC"){
            $this->db->select('price,cost,quantity');
            $this->db->from('accessories');
            $this->db->where('IID', $IID );
            $query = $this->db->get();
            foreach ($query->result() as $row) {
                $cost = $row->cost;
                $price= $row->price;
                $quantity=$row->quantity;
            }
            $quantity=$quantity-1;
            $resultUpdate = $this->sell_model->updateItem($IID,'accessories', array("quantity" => $quantity));
        }
        date_default_timezone_set("Asia/Beirut");
        $date=date("Y-m-d");
        $resultAdd = $this->sell_model->add(array("PID" => $CID, "IID" => $IID,
        "date" => $date,"quantity" => 1,"price"=>$price,"type" => $type));
        if($CID!=1){
            $resultUpdateClient = $this->sell_model->updatePerson($CID,$price);
        }
        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE) {
            # Something went wrong.
            $this->db->trans_rollback();
            return FALSE;
        } 
        else {
            # Everything is Perfect. 
            # Committing data to the database.
            $this->db->trans_commit();
            return TRUE;
        }
    } 
    public function sellCentral_post(){
        $country = $this->post('country');
        $quantity = $this->post('mins');
        $cost_mins = $this->post('cost_mins');
        $CID=1;
        $IID =1;
        date_default_timezone_set("Asia/Beirut");
        $date=date("Y-m-d");
        $resultAdd = $this->sell_model->add(array("PID" => $CID, "IID" => $IID,"country"=>$country,
        "date" => $date,"quantity" => $quantity,"price"=>$cost_mins,"type" => "CE"));
        if ($resultAdd === 0) {
            $this->response("Item information could not be saved. Try again.", 404);
        } else {
            $this->response("success", 200);
        }
    }
    public function searchClient_get(){
        $searchInput = $this->get('searchInput');
        $result = $this->sell_model->searchClient($searchInput);
        if ($result === 0) {
            $this->response("Client information could not be saved. Try again.", 404);
        } else {
            $this->response($result, 200);
        }
    } 
}
