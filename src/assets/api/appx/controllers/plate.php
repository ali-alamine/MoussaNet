<?php
require APPPATH . '/libraries/REST_Controller.php';
class plate extends REST_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('plate_model');
    }

    public function plate_post()
    {
        $name = $this->post('name');
        $phone = $this->post('phone');
        $address = $this->post('address');
        $result = $this->plate_model->add(array("name" => $name, "phone" => $phone, "address" => $address));

        if ($result === 0) {
            $this->response("plate information could not be saved. Try again.", 404);
        } else {
            $this->response("success", 200);
        }

    }

    public function plate_put()
    {
        $plate_name = $this->put('name');
        $plate_width = $this->put('width');
        $plate_height = $this->put('height');
        $plate_thickness = $this->put('thickness');
        $plate_thickness_price = $this->put('thicknessPrice');
        $plate_nbrOfColors = $this->put('nbrOfColors');
        $plate_nbrOfFaces = $this->put('nbrOfFaces');
        $plate_price = $this->put('price');

        $price_diff = $this->put('priceToAdd');

        $jobID = $this->put('jobID');
        $clientID = $this->put('clientID');
        $plateID = $this->put('plateID');

        $result = $this->plate_model->update($plateID, array("name" => $plate_name, "width" => $plate_width, "height" => $plate_height, "thickness" => $plate_thickness, "thickness_price" => $plate_thickness_price, "num_of_colors" => $plate_nbrOfColors, "num_of_faces" => $plate_nbrOfFaces, "price" => $plate_price));
        if ($result === 0) {
            $this->response("plate information could not be saved. Try again.", 404);

        } else {
            $result2 = $this->plate_model->updateJobTotal($jobID, $price_diff);
            if ($result2 === 0) {
                $this->response("plate information could not be saved. Try again.", 404);
            } else {
                $result3 = $this->plate_model->updateClientTotal($clientID, $price_diff);
                if ($result3 === 0) {
                    $this->response("plate information could not be saved. Try again.", 404);
                } else {
                    $this->response("success", 200);
                }
            }

        }
    }

    public function deletePlate_put()
    {
        $plateID = $this->put('ID');
        $jobID = $this->put('jobID');
        $clientID = $this->put('clientID');
        $price = $this->put('price');
        
        $priceToUpdate = 0-$price;
        if (!$plateID) {
            $this->response("Parameter missing", 404);
        }
        if ($this->plate_model->delete($plateID)) {
            $this->plate_model->updateJobTotal($jobID, $priceToUpdate);
            $this->plate_model->updateClientTotal($clientID, $priceToUpdate);
            $this->response("Success", 200);
        } else {
            $this->response("Failed", 400);
        }

    }
}
