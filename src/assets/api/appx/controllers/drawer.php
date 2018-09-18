<?php
require APPPATH . '/libraries/REST_Controller.php';
class drawer extends REST_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('drawer_model');
    }

    public function internetDrawer_get()
    {

        $result = $this->drawer_model->getInternetDrawer();
        if ($result) {
            $this->response($result, 200);
            exit;
        }
    }

    public function setDrawer_post()
    {
        $accessories = $this->post('accessories');
        $internetAmount = $this->post('internetAmount');
        $mobileDrawer = $this->post('mobileDrawer');

        date_default_timezone_set('Asia/Beirut');
        $today = date('Y-m-d');

        $data = array(
            array('date' => $today, 'amount' => $accessories, 'profit' => 0, 'type' => 'a'),
            array('date' => $today, 'amount' => $mobileDrawer, 'profit' => 0, 'type' => 'm'),
            array('date' => $today, 'amount' => $internetAmount, 'profit' => 0, 'type' => 's')
        );

        $result = $this->drawer_model->setDrawer($data);
        if ($result) {
            $this->response($result, 200);
            exit;
        }
    }
    public function accDrawer_get()
    {

        $result = $this->drawer_model->getAccDrawer();
        if ($result) {
            $this->response($result, 200);
            exit;
        }
    }
    public function mobileDrawer_get()
    {

        $result = $this->drawer_model->getMobileDrawer();
        if ($result) {
            $this->response($result, 200);
            exit;
        }
    }
    public function newOperation_post()
    {
        $op_type = $this->post('op_type');
        $dra_type = $this->post('drawer');
        $amount = $this->post('amount');
        $comment = $this->post('comment');
        date_default_timezone_set('Asia/Beirut');
        $today = date('Y-m-d');
        $result = $this->drawer_model->add('operation',array('date' => $today, 'amount' => $amount, 'note' => $comment,
         'op_type' => $op_type, 'dra_type' => $dra_type));
        if ($result) {
            $this->response($result, 200);
            exit;
        }
    }
    
}
