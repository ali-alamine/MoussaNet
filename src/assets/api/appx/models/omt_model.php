<?php
class omt_model extends CI_Model
{
    public function __construct()
    {
        $this->load->database();
    }

    public function add($data)
    {
        if ($this->db->insert('omt_operation', $data)) {
            return true;
        } else {
            return false;
        }
    }

 


}
