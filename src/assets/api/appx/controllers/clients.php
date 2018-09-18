<?php
require APPPATH . '/libraries/REST_Controller.php';
class clients extends REST_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('clients_model');
    }

    public function client_post()
    {
        $name = $this->post('name');
        $phone = $this->post('phone');
        $address = $this->post('address');
        $result = $this->clients_model->add(array("name" => $name, "phone" => $phone, "address" => $address));

        if ($result === 0) {
            $this->response("Client information could not be saved. Try again.", 404);
        } else {
            $this->response("success", 200);
        }

    }

    public function client_put()
    {
        $client_name = $this->put('name');
        $client_phone = $this->put('phone');
        $client_address = $this->put('address');
        $clientID = $this->put('id');

        $result = $this->clients_model->update($clientID, array("name" => $client_name, "phone" => $client_phone, "address" => $client_address));
        if ($result === 0) {
            $this->response("client information could not be saved. Try again.", 404);
        } else {
            $this->response("success", 200);
        }
    }

    public function payment_put()
    {
        $amount = $this->put('amount');
        $clientID = $this->put('clientID');

        $result = $this->clients_model->updateDebit($clientID, $amount);
        if ($result === 0) {
            $this->response("client information could not be saved. Try again.", 404);
        } else {
            $this->response("success", 200);
        }
    }

    public function totalDebit_get()
    {

        $result = $this->clients_model->getTotalDebit();
        if ($result) {
            $this->response($result, 200);
            exit;
        }
    }

}
