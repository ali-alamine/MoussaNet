<?php
require APPPATH . '/libraries/REST_Controller.php';
class jobs extends REST_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('jobs_model');
        $this->load->library('session');
    }
    public function job_post()   // used in I-print
    {
        $name = $this->post('name');
        $CID = $this->post('CID');
        $date = $this->post('date');
        $image = $this->post('image');
        $comments = $this->post('comments');
        $result = $this->jobs_model->add(array("name" => $name, "CID" => $CID, "date_creation" => $date, "image" => $image, "comments" => $comments));

        if ($result === 0) {
            $this->response("Job information could not be saved. Try again.", 404);
        } else {
            $this->response("success", 200);
        }

    }

    public function job_put() // used in I-print
    {
        $jobId = $this->put('id');
        $name = $this->put('name');
        $CID = $this->put('CID');
        $date = $this->put('date');
        $image = $this->put('image');
        $total = $this->put('total');
        $comments = $this->put('comments');
        
        $result = $this->client_model->update($jobId, array("name" => $name, "date_creation" => $date, "image" => $image , "total"=>$total, "comments" => $comments));
        if ($result === 0) {
            $this->response("Job information could not be saved. Try again.", 404);
        } else {
            $this->response("success", 200);
        }
    }
    public function deleteJob_put(){
        $id = $this->put('id');
        // echo $this->put('id');
        // echo $id;
        // $this->response($id, 404);
        // if (!$id) {
        //     $this->response("Parameter missing", 404);
        // }
        if ($this->jobs_model->delete($id)) {
            $this->response("Success", 200);
        } else {
            $this->response("Failed", 400);
        }

    }

?>