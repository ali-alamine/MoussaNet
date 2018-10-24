<?php
require APPPATH . '/libraries/REST_Controller.php';
class omt extends REST_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('omt_model');
    }

    public function addOMTOperation_post()
    {
        $amountD = $this->post('amountD');
        $amountL = $this->post('amountL');
        $clientID = $this->post('clientID');
        $currency = $this->post('currency');
        $operationType = $this->post('operationType');
        $tranType = $this->post('tranType');

        if ($clientID == 1) {
            $paid = 1;
        } else {
            $paid = 0;
        }

        $result = $this->omt_model->add(array("oper_type" => $operationType, "oper_amount_d" => $amountD, "oper_amount_l" => $amountL, "oper_tran_type" => $tranType, "oper_currency" => $currency, "oper_is_paid" => $paid, "oper_client_id" => $clientID));

        if ($result === 0) {
            $this->response("omt information could not be saved. Try again.", 404);
        } else {
            $this->response("success", 200);
        }

    }

}
