<?php
require APPPATH . '/libraries/REST_Controller.php';
class invoices extends REST_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('invoices_model');
    }
    
    public function deleteInvoice_put()
    {
        
        $invoiceID = $this->put('invoiceID');
        $invoicePrice = $this->put('price');
        $invoiceAmount = $this->put('quantity');
        $invoiceProfit = $this->put('profit');
        $invoiceProfit = $this->put('personID');

        $result = $this->invoices_model->deleteInvoice($invoiceID,$invoiceAmount);
        if ($result === 0) {
            $this->response("invoice information could not be saved. Try again.", 404);
        } else {
            $this->response("success", 200);
        }
    }

    public function deleteInvoiceWOChange_put()
    {
        
        $invoiceID = $this->put('ID');

        $result = $this->invoices_model->deleteInvoiceWOChange($invoiceID);
        if ($result === 0) {
            $this->response("invoice information could not be saved. Try again.", 404);
        } else {
            $this->response("success", 200);
        }
    }
    
    
}
