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
    
    public function autoSubscription()
    {
        $query = $this->db->query('select subscriber.SBID,subscriber.profile from subscriber inner join subscriber_detail on subscriber.SBID = subscriber_detail.SBID where subscriber_detail.exp_date=CURDATE() AND subscriber.is_activated=1');

        foreach ($query->result() as $row) {


            $data = array("SBID" => $row->SBID, "profile" => $row->profile);

            $this->db->set('sub_date', 'CURDATE() ', FALSE);
            $this->db->set('exp_date', 'CURDATE()+INTERVAL 1 MONTH', FALSE);

            $this->db->insert('subscriber_detail', $data);
        }

        return true;
    }

    public function update ($id, $data)
    {
        $this->db->where('SBID', $id);
        if ($this->db->update('subscriber', $data)) {
            return true;
        } else {
            return false;
        }

    }
        
    public function toggleActivation ($id)
    {

        $this->db->set('is_activated', '!is_activated', FALSE);
        $this->db->where('SBID', $id);        
        if ($this->db->update('subscriber')) {
            return true;
        } else {
            return false;
        }

    }

    public function togglePayment($id)
    {

        $this->db->set('is_paid', '!is_paid', FALSE);
        $this->db->where('SBDID', $id);        
        if ($this->db->update('subscriber_detail')) {
            return true;
        } else {
            return false;
        }

    }

    public function addSubscription($data)
    {
        if ($this->db->insert('subscriber_detail', $data)) {
            return true;
        } else {
            return false;
        }
    }

    public function deleteSubscription($id){
        $this->db->where('SBDID', $id);
        if ($this->db->delete('subscriber_detail')) {
            return true;
        } else {
            return false;
        }
    }


}
