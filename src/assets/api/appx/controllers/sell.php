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
        $date = $this->post('date');
        $CID = $this->post('clientID');
        // $debit = $this->post('debit');
        // $type = "SL";
        $this->db->trans_start();
        $this->db->trans_strict(FALSE);
        $this->db->select('IID,price,quantity,type');
        $this->db->from('item');
        $this->db->where('bar_code', $bar_code );
        $query = $this->db->get();
        foreach ($query->result() as $row) {
            $IID = $row->IID;
            $price= $row->price;
            $quantity=$row->quantity;
            $type=$row->type;
        }
        $quantity=$quantity-1;
        $resultAdd = $this->sell_model->add(array("PID" => $CID, "IID" => $IID,
        "date" => $date,"quantity" => 1,"price"=>$price,"type" => $type));
        $resultUpdate = $this->sell_model->updateItem($IID, array("quantity" => $quantity));
        if($CID!=1){
            $resultUpdateClient = $this->sell_model->updatePerson($CID, array("debit" => "debit"+$price));
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
        // if ($resultAdd === 0) {
        //     $this->response("Item information could not be saved. Try again.", 404);
        // } else {
        //     if ($resultUpdate === 0) {
        //         $this->response("Item information could not be saved. Try again.", 404);
        //     } else {

        //         $this->response("success", 200);
        //     }
        // }
    } 
    public function sellCentral_post(){
        $country = $this->post('country');
        $quantity = $this->post('mins');
        $cost_mins = $this->post('cost_mins');
        $date = $this->post('date');
        $CID=1;
        $IID =1;
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
    // public function sellUpdateQuantity_put(){
    //     $IID = $this->put('IID');
    //     if ($resultUpdate === 0) {
    //         $this->response("Item information could not be saved. Try again.", 404);
    //     } else {
    //         $this->response("success", 200);
    //     }
    // }
    // public function stockMRC_post(){
    //     $is_offers = $this->post('isOffer');
    //     $name = $this->post('name');
    //     $price = $this->post('price');
    //     $bar_code = $this->post('bar_code');
    //     $cardCompany = $this->post('type');
    //     $type = "rechargeCard";
    //     if($is_offers==false){
    //         $quantity = $this->post('quantity');
    //         $result = $this->stock_model->add(array("name" => $name, "quantity" => $quantity, "price" => $price,
    //         "bar_code" => $bar_code,"card_company" => $cardCompany,"type" => $type,"is_offers"=>0));
    //     }else{
    //         $result = $this->stock_model->add(array("name" => $name, "price" => $price,
    //         "bar_code" => $bar_code,"card_company" => $cardCompany,"type" => $type,"is_offers"=>1));
    //     }
    //     if ($result === 0) {
    //         $this->response("Item information could not be saved. Try again.", 404);
    //     } else {
    //         $this->response("success", 200);
    //     }
    // }

    // public function stockAcc_put(){
    //     $name = $this->put('name');
    //     $quantity = $this->put('quantity');
    //     $price = $this->put('price');
    //     $bar_code = $this->put('bar_code');
    //     $IID = $this->put('IID');
    //     $result = $this->stock_model->update($IID, array("name" => $name, "quantity" => $quantity, "price" => $price,
    //     "bar_code" => $bar_code));
    //     if ($result === 0) {
    //         $this->response("Stock MRC information could not be saved. Try again.", 404);
    //     } else {
    //         $this->response("success", 200);
    //     }
    // }
    // public function stockMRC_put(){
    //     $is_offers = $this->put('is_offers');
    //     $name = $this->put('name');
    //     $price = $this->put('price');
    //     $bar_code = $this->put('bar_code');
    //     $IID = $this->put('IID');
    //     if($is_offers==false){
    //         $quantity = $this->put('quantity');
    //         $result = $this->stock_model->update($IID, array("name" => $name, "quantity" => $quantity, "price" => $price,
    //         "bar_code" => $bar_code));
    //     }else{
    //         $result = $this->stock_model->update($IID, array("name" => $name, "price" => $price,
    //         "bar_code" => $bar_code));
    //     }
    //     if ($result === 0) {
    //         $this->response("Stock MRC information could not be saved. Try again.", 404);
    //     } else {
    //         $this->response("success", 200);
    //     }
    // }
    // public function deleteItem_put(){
    //     $id = $this->put('ID');
    //     if (!$id) {
    //         $this->response("Parameter missing", 404);
    //     }
    //     if ($this->stock_model->delete($id)) {
    //         $this->response("Success", 200);
    //     } else {
    //         $this->response("Cannot Delete this item, try to delete its items", 400);
    //     }
    // }
    // public function searchItem_get(){
    //     $searchInput = $this->get('searchInput');
    //     $result = $this->stock_model->searchItem($searchInput);
    //     if ($result === 0) {
    //         $this->response("Item information could not be saved. Try again.", 404);
    //     } else {
    //         $this->response($result, 200);
    //     }
    // }    
}
