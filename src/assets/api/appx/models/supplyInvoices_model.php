<?php
class supplyInvoices_model extends CI_Model
{
    public function __construct()
    {
        $this->load->database();
    }

    public function searchSupplier($name)
    {
        $this->db->select('*');
        $this->db->from('supply');
        $this->db->join('comments', 'comments.id = blogs.id', 'inner');
        $this->db->where('is_client', 0);
        $this->db->limit(20);

        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result_array();
        } else {
            return 0;
        }

    }
    
    

}
