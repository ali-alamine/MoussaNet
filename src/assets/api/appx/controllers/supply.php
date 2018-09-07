<?php
require APPPATH . '/libraries/REST_Controller.php';
class supply extends REST_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('supply_model');
    }

    public function searchSupplier_get()
    {
        $keyword = $this->get('keyword');
        $result = $this->supply_model->searchSupplier($keyword);      
        if ($result) {
            $this->response($result, 200);

            exit;
        }
    }

    public function addSupply_post()
    {
        $name = $this->post('name');
        $phone = $this->post('phone');
        $address = $this->post('address');
        $result = $this->suppliers_model->add(array("name" => $name, "phone" => $phone, "address" => $address, "is_client" => 0));

        if ($result === 0) {
            $this->response("Supply information could not be saved. Try again.", 404);
        } else {
            $this->response("success", 200);
        }
    }

}
