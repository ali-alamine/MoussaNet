<?php
class plate_model extends CI_Model
{
    public function __construct()
    {
        $this->load->database();
    }

    public function delete($id)
    {
        $this->db->where('PLID', $id);
        if ($this->db->delete('plate')) {
            return true;
        } else {
            return false;
        }

    }

    public function add($data)
    {
        if ($this->db->insert('client', $data)) {
            return true;
        } else {
            return false;
        }
    }

    public function update($id, $data)
    {
        $this->db->where('PLID', $id);
        if ($this->db->update('plate', $data)) {
            return true;
        } else {
            return false;
        }

    }

    public function updateJobTotal($id, $price_diff)
    {
        $this->db->set('total', 'total+'.$price_diff, false);
        $this->db->where('JID', $id);
                
        if ($this->db->update('job')) {
            return true;
        } else {
            return false;
        }

    }

    public function updateClientTotal($id, $price_diff)
    {
        $this->db->set('total', 'total+'.$price_diff, false);
        $this->db->set('rest', 'rest+'.$price_diff, false);
        $this->db->where('CID', $id);
                
        if ($this->db->update('client')) {
            return true;
        } else {
            return false;
        }

    }

}
