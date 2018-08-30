<?php
require APPPATH . '/libraries/REST_Controller.php';
class subscriber extends REST_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('subscriber_model');
    }

   

    
    public function subscriber_post()

    {
        $name = $this->post('name');
        $phone = $this->post('phone');
        $address = $this->post('address');
        $profile = $this->put('profile');
        $result = $this->subscriber_model->add(array("name" => $name, "phone" => $phone, "address" => $address, "profile" => $profile));

        if ($result === 0) {
            $this->response("Client information could not be saved. Try again.", 404);
        } else {
            $this->response("success", 200);
        }

    }
    // subDate: Wed Aug 29 2018 00:00:00 GMT+0300 (Eastern European Summer Time), expDate: Sat Sep 29 2018 00:00:00 GMT+0300 (Eastern European Summer Time), isPaid: true, profile: "6843424", subID: "2"}

    public function newSubscription_post()

    {
        $profile = $this->post('profile');
        $subID = $this->post('subID');
        $isPaid = $this->post('isPaid');

        $expDate = $this->put('expDate');

        $subDate = $this->put('subDate');

        
        $paymentDate;
        if($isPaid){
            $paymentDate=date("Y-m-d");
        }
        else{
            $paymentDate='';
        }
        $result = $this->subscriber_model->addSubscription(array("SBID" => $subID, "sub_date" => $subDate, "payment_date" => $paymentDate, "exp_date" => $expDate, "profile" => $profile, "is_paid" => $isPaid));

        if ($result === 0) {
            $this->response("Client information could not be saved. Try again.", 404);
        } else {
            $this->response("success", 200);
        }

    }

    

    public function subscriber_put()
    {
        $subscriber_name = $this->put('name');
        $subscriber_phone = $this->put('phone');
        $subscriber_address = $this->put('address');
        $subscriber_profile = $this->put('profile');
        $subscriberID = $this->put('id');

        $result = $this->subscriber_model->update($subscriberID, array("name" => $subscriber_name, "phone" => $subscriber_phone, "address" => $subscriber_address, "profile" => $subscriber_profile));
        if ($result === 0) {
            $this->response("subscriber information could not be saved. Try again.", 404);
        } else {
            $this->response("success", 200);
        }
    }

    public function enableDisableSub_put()
    {
        
        $subscriberID = $this->put('id');
        $result = $this->subscriber_model->toggleActivation($subscriberID);
        if ($result === 0) {
            $this->response("subscriber information could not be saved. Try again.", 404);
        } else {
            $this->response("success", 200);
        }
    }


    public function deleteClient_put()
    {
        $id = $this->put('ID');

        if (!$id) {
            $this->response("Parameter missing", 404);
        }
        if ($this->subscriber_model->delete($id)) {
            $this->response("Success", 200);
        } else {

            $this->response("Cannot Delete this client, try to delete its plates, jobs and payments", 400);
        }

    }

    public function autoSubscription_get(){
        $result = $this->subscriber_model->autoSubscription();
        if ($result) {
            $this->response($result, 200);
        } else {
            $this->response("Error", 404);
        }
    }

    public function setUnsetPayment_put()
    {
        
        $subDetailsID = $this->put('id');
        $result = $this->subscriber_model->togglePayment($subDetailsID);
        if ($result === 0) {
            $this->response("subscriber information could not be saved. Try again.", 404);
        } else {
            $this->response("success", 200);
        }
    }
    

    
    
}
