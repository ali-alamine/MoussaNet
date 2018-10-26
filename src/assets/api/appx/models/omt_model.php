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

    public function updatePersonOmtDebit($id, $debit){
        $this->db->where('PID', $id);
        $this->db->set('omt_debit','omt_debit + '. $debit,FALSE);
        if ($this->db->update('person')) {
            return true;
        } else {
            return false;
        }
    }
 


}
