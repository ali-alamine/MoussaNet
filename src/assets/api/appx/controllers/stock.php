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
        // $isOffers = $this->post('isOffer');
        // echo $isOffers;
        $name = $this->post('name');
        $quantity = $this->post('quantity');
        $price = $this->post('price');
        $bar_code = $this->post('bar_code');
        $cardCompany = $this->post('type');
        $type = "rechargeCard";
        $result = $this->stock_model->add(array("name" => $name, "quantity" => $quantity, "price" => $price,
        "bar_code" => $bar_code,"card_company" => $cardCompany,"type" => $type));
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

    public function deleteClient_put()
    {
        $id = $this->put('ID');

        if (!$id) {
            $this->response("Parameter missing", 404);
        }
        if ($this->subscriber_model->delete($id)) {
            $this->response("Success", 200);
        } else {

            $this->response("Cannot Delete this client, try to delete its plates, jobs and payments", 400);
        }

    }


    
    
}
