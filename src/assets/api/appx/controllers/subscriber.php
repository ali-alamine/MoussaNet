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
        $result = $this->subscriber_model->add(array("name" => $name, "phone" => $phone, "address" => $address));

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
        $subscriberID = $this->put('id');

        $result = $this->subscriber_model->update($subscriberID, array("name" => $subscriber_name, "phone" => $subscriber_phone, "address" => $subscriber_address));
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

    public function updateClientPermission_put()
    {
        $clientIDArray = $this->put('params');
        $users = $this->put('users');
        $clientID = $clientIDArray["clientID"];

        foreach ($users as $key => $value) {
            if ($value["selected"] == 1) {
                $this->subscriber_model->addPermission($clientID, $value["UID"]);
            } else {
                $this->subscriber_model->deletePermission($clientID, $value["UID"]);
            }

        }

    }

    
    
}
