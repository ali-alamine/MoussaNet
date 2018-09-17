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
    
    
}
