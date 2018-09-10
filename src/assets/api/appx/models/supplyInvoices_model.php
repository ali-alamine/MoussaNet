<?php
class supplyInvoices_model extends CI_Model
{
    public function __construct()
    {
        $this->load->database();
    }

    public function getInvoiceDetails($invoiceID)
    {
        $this->db->select('*');
        $this->db->from('supply');
        $this->db->join('item', 'supply.IID = item.IID', 'inner');
        $this->db->where('SDID', $invoiceID);

        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result_array();
        } else {
            return 0;
        }

    }
    
    

}
