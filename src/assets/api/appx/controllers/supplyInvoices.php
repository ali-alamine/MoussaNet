<?php
require APPPATH . '/libraries/REST_Controller.php';
class supplyInvoices extends REST_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('supplyInvoices_model');
    }

    public function getInvoiceDetails_get()
    {
        $keyword = $this->get('keyword');
        $result = $this->supplyInvoices_model->searchSupplier($keyword);
        if ($result) {
            $this->response($result, 200);

            exit;
        }
    }

}
