<?php

require APPPATH . '/libraries/REST_Controller.php';

class payment extends REST_Controller{

    public function __construct() {
        parent::__construct();
        $this->load->model('payment_model');
        $this->load->library('session');
    }

    // public function payment_post(){

    //     $name = $this->post('name');
    //     $phone = $this->post('phone');
    //     $address = $this->post('address');
    //     $result = $this->client_model->add(array("name" => $name, "phone" => $phone, "address" => $address));

    //     if ($result === 0) {
    //         $this->response("Client information could not be saved. Try again.", 404);
    //     } else {
    //         $this->response("success", 200);
    //     }

    // }

    public function getClientForPayment(){
        $searchInput = $this->get('clientID');
        $result = $this->client_model->getClientUsers($clientID);
        if ($result) {
            $this->response($result, 200);
        } else {
            $this->response("No record found", 404);
        }
    }
}

?>