<?php
class jobs_model extends CI_Model
{
    public function __construct()
    {
        $this->load->database();
    }
    public function delete($id)
    {
        $this->db->where('JID', $id);
        if ($this->db->delete('job')) {
            return true;
        } else {
            return false;
        }

    }

    public function add($data)
    { // used in I-print
        if ($this->db->insert('job', $data)) {
            return true;
        } else {
            return false;
        }
    }

    public function update($id, $data)
    { // used in I-print
        $this->db->where('JID', $id);
        if ($this->db->update('job', $data)) {
            return true;
        } else {
            return false;
        }

    }

}
