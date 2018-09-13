<?php
class drawer_model extends CI_Model
{
    public function __construct()
    {
        $this->load->database();
    }
  
    
    public function getInternetDrawer()
    {
        $query = $this->db->query('select sum(profile),date(payment_date) as paymentDate FROM subscriber_detail WHERE is_paid = 1 GROUP by date(payment_date) having paymentDate between ( NOW() - INTERVAL 1 MONTH ) and NOW()');

        if ($query->num_rows() > 0) {
            return $query->result_array();
        } else {
            return 0;
        }

    }

    
        
   

   
   
    


}
