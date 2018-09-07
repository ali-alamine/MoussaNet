<?php
class sell_model extends CI_Model{
    public function __construct(){
        $this->load->database();
    }
    public function add($data){
        if ($this->db->insert('invoice', $data)) {
            return true;
        } else {
            return false;
        }
    }
    public function updateItem($id, $data){
        $this->db->where('IID', $id);
        if ($this->db->update('item', $data)) {
            return true;
        } else {
            return false;
        }
    }
    public function updatePerson($id, $debit){
        $this->db->where('PID', $id);
        $this->db->set('debit','debit + '. $debit,FALSE);
        if ($this->db->update('person')) {
            return true;
        } else {
            return false;
        }
    }
    public function delete($id){
        $this->db->where('IID', $id);
        if ($this->db->delete('item')) {
            return true;
        } else {
            return false;
        }
    }
    public function searchClient($data){
        $this->db->select("PID,name,phone");
        $this->db->from("person");
        $this->db->where('is_client=1 and PID != 1');
        $this->db->like('name',$data,'both'); 
        $this->db->limit(10, 0);
        $query = $this->db->get(); 
        $ss=$this->db->last_query();  
        return $query->result();
    }
    public function rechargeCard(){ 
        $query = $this->db->query('SELECT * FROM recharge_card INNER JOIN item ON item.IID = recharge_card.IID WHERE item.type="RC"');
        $ss=$this->db->last_query();  
        return $query->result();
    }
}
