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

    public function setDrawer($data)
    {
        date_default_timezone_set('Asia/Beirut');
        $today = date('Y-m-d');
        
        $this->db->select('*');
        $this->db->from('drawer');
        $this->db->where('date', $today);
        $query = $this->db->get();

        if ($query->num_rows() == 0) {            
            $this->db->insert_batch('drawer', $data);
            return true;
        } else {
            return 0;
        }

    }

    // select * from (select sum(profile),date(payment_date) as paymentDate FROM subscriber_detail WHERE is_paid = 1 GROUP by date(payment_date) having paymentDate between ( NOW() - INTERVAL 1 MONTH ) and NOW() ) as d inner join (select sum(`amount`),date from operation where `op_type` = 'w' and dra_type='s' GROUP BY `date`  ) as d1 on d.paymentDate = d1.date

}
