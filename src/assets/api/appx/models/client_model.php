<?php
class client_model extends CI_Model
{
    public function __construct()
    {
        $this->load->database();
    }

    public function clientForPayment($data){
        
        $this->db->select("*");
        $this->db->from("client");
        // $this->db->where('MATCH (name) LIKE ("'.$data.'")');
        $this->db->like('name',$data,'both');
        $this->db->limit(10, 0);
        $query = $this->db->get(); 
        $ss=$this->db->last_query();  
          
        return $query->result();

        // OR
        // $query = $this->db->query('SELECT * FROM client WHERE name like "%'.$data.'%" LIMIT 10');
        // return $query->result();
    }

    // public function ($isbn)
    // {
    //     $this->db->select('id, name, price, author, category, language, ISBN, publish_date');
    //     $this->db->from('tbl_books');
    //     $this->db->where('isbn', $isbn);
    //     $query = $this->db->get();
    //     if ($query->num_rows() == 1) {
    //         return $query->result_array();
    //     } else {
    //         return 0;
    //     }
    // }

    //API call - get all books record
    // public function getAllclient()
    // {
    //     $this->db->select('CID, CUID, client_name, client_phone, client_location, client_code, client_debit, client_status');
    //     $this->db->from('client');
    //     $this->db->order_by("CID", "desc");
    //     $query = $this->db->get();
    //     if ($query->num_rows() > 0) {
    //         return $query->result_array();
    //     } else {
    //         return 0;
    //     }

    // }

    public function getRepeatedCodeCount($prefix)
    {
        $this->db->count_all_results('person');
        $this->db->like('code', $prefix, 'after');
        $this->db->from('person');
        return $this->db->count_all_results();

    }

    public function delete($id)
    { // used in I-print
        $this->db->where('CID', $id);
        if ($this->db->delete('client')) {
            return true;
        } else {
            return false;
        }

    }

    public function add($data)
    { // used in I-print
        if ($this->db->insert('client', $data)) {
            return true;
        } else {
            return false;
        }
    }

    public function update($id, $data)
    { // used in I-print
        $this->db->where('CID', $id);
        if ($this->db->update('client', $data)) {
            return true;
        } else {
            return false;
        }

    }

}
