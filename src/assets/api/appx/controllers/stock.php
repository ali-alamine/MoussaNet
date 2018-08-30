<?php
require APPPATH . '/libraries/REST_Controller.php';
class stock extends REST_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('stock_model');
    }
    public function stockAcc_post(){
        // $isOffers = $this->post('isOffer');
        // echo $isOffers;
        $name = $this->post('name');
        // $quantity = $this->post('quantity');
        $price = $this->post('price');
        $bar_code = $this->post('bar_code');
        // $cardCompany = $this->post('type');
        $type = "accessories";
        $result = $this->stock_model->add(array("name" => $name, "price" => $price,
        "bar_code" => $bar_code,"type" => $type));
        if ($result === 0) {
            $this->response("Item information could not be saved. Try again.", 404);
        } else {
            $this->response("success", 200);
        }
    } 
    public function stockMRC_post(){
        $is_offers = $this->post('isOffer');
        $name = $this->post('name');
        $price = $this->post('price');
        $bar_code = $this->post('bar_code');
        $cardCompany = $this->post('type');
        $type = "rechargeCard";
        if($is_offers==false){
            $quantity = $this->post('quantity');
            $result = $this->stock_model->add(array("name" => $name, "quantity" => $quantity, "price" => $price,
            "bar_code" => $bar_code,"card_company" => $cardCompany,"type" => $type,"is_offers"=>0));
        }else{
            $result = $this->stock_model->add(array("name" => $name, "price" => $price,
            "bar_code" => $bar_code,"card_company" => $cardCompany,"type" => $type,"is_offers"=>1));
        }
        if ($result === 0) {
            $this->response("Item information could not be saved. Try again.", 404);
        } else {
            $this->response("success", 200);
        }
    }

    public function stockAcc_put(){
        $name = $this->put('name');
        $quantity = $this->put('quantity');
        $price = $this->put('price');
        $bar_code = $this->put('bar_code');
        $IID = $this->put('IID');
        $result = $this->stock_model->update($IID, array("name" => $name, "quantity" => $quantity, "price" => $price,
        "bar_code" => $bar_code));
        if ($result === 0) {
            $this->response("Stock MRC information could not be saved. Try again.", 404);
        } else {
            $this->response("success", 200);
        }
    }
    public function stockMRC_put(){
        $is_offers = $this->put('is_offers');
        $name = $this->put('name');
        $quantity = $this->put('quantity');
        $price = $this->put('price');
        $bar_code = $this->put('bar_code');
        $IID = $this->put('IID');
        if($is_Offers==false){
            $result = $this->stock_model->update($IID, array("name" => $name, "quantity" => $quantity, "price" => $price,
            "bar_code" => $bar_code));
        }else{
            $result = $this->stock_model->update($IID, array("name" => $name, "price" => $price,
            "bar_code" => $bar_code));
        }
        if ($result === 0) {
            $this->response("Stock MRC information could not be saved. Try again.", 404);
        } else {
            $this->response("success", 200);
        }
    }
    public function deleteItem_put(){
        $id = $this->put('ID');
        if (!$id) {
            $this->response("Parameter missing", 404);
        }
        if ($this->stock_model->delete($id)) {
            $this->response("Success", 200);
        } else {
            $this->response("Cannot Delete this item, try to delete its items", 400);
        }
    }


    
    
}
