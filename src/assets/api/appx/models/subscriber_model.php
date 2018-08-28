<?php
class subscriber_model extends CI_Model
{
    public function __construct()
    {
        $this->load->database();
    }

    public function add($data)
    { 
        if ($this->db->insert('subscriber', $data)) {
            return true;
        } else {
            return false;
        }
    }

    public function update($id, $data)
    { 
        $this->db->where('SBID', $id);
        if ($this->db->update('subscriber', $data)) {
            return true;
        } else {
            return false;
        }

    }

}
