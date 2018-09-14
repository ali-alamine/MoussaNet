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
    
    
}
