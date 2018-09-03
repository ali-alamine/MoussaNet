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

}
