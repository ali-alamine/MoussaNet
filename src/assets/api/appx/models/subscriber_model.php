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
        $query = $this->db->query('SELECT subscriber.SBID,subscriber.profile FROM (SELECT SBID, MAX(exp_date) AS maxDate FROM subscriber_detail GROUP BY SBID ) as Sub1 INNER JOIN subscriber ON subscriber.SBID = Sub1.SBID where maxDate <= CURDATE() and subscriber.is_activated=1');

        foreach ($query->result() as $row) {


            $data = array("SBID" => $row->SBID, "profile" => $row->profile);

            $this->db->set('sub_date', 'CURDATE()', FALSE);
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
