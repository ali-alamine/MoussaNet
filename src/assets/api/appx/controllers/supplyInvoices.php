<?php
require APPPATH . '/libraries/REST_Controller.php';
class supplyInvoices extends REST_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('supplyInvoices_model');
    }

    public function invoiceDetails_get()
    {
        $invoiceID = $this->get('invoiceID');
        $result = $this->supplyInvoices_model->getInvoiceDetails($invoiceID);
        if ($result) {
            $this->response($result, 200);

            exit;
        }
    }

}
