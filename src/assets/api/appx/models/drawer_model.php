<?php
class drawer_model extends CI_Model
{
    public function __construct()
    {
        $this->load->database();
    }

    public function getInternetDrawer()
    {
        $query = $this->db->query("select *,(drawer.amount +  IFNULL(d.sumProfile,0) - IFNULL(d2.supplySum,0) - IFNULL(d3.sumWithdraw,0)  +   IFNULL(d4.sumAdded,0) +  IFNULL( d5.sumReturned,0) ) as total from drawer 
        left join (select coalesce(sum(profile),0) as sumProfile ,date(payment_date) as paymentDate FROM subscriber_detail WHERE is_paid = 1 GROUP by date(payment_date) having paymentDate between ( NOW() - INTERVAL 1 MONTH ) and NOW() ) as d on drawer.date = d.paymentDate
        
        left join (select  sum(amount) as supplySum, date(payment_date) as sPaymentDate from payment where drawer_type = 's' group by date(payment_date) having sPaymentDate between ( NOW() - INTERVAL 1 MONTH ) and NOW() ) as d2 on  drawer.date = d2.sPaymentDate 
        
        left join (select coalesce(sum(amount),0) as sumWithdraw ,date as widthdrawDate FROM operation WHERE dra_type = 's' and op_type='w' GROUP by date having date between ( NOW() - INTERVAL 1 MONTH ) and NOW() ) as d3 on drawer.date = d3.widthdrawDate
        
        left join (select coalesce(sum(amount),0) as sumAdded ,date as addedDate FROM operation WHERE dra_type = 's' and op_type='a' GROUP by date having date between ( NOW() - INTERVAL 1 MONTH ) and NOW() ) as d4 on drawer.date = d4.addedDate
        
        left join (select coalesce(sum(amount),0) as sumReturned ,date as returnedDate FROM operation WHERE dra_type = 's' and op_type='r' GROUP by date having date between ( NOW() - INTERVAL 1 MONTH ) and NOW() ) as d5 on drawer.date = d5.returnedDate
        
        where drawer.type = 's' ");

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

}

// select * from drawer 
// left join (select coalesce(sum(profile),0) as sumProfile ,date(payment_date) as paymentDate FROM subscriber_detail WHERE is_paid = 1 GROUP by date(payment_date) having paymentDate between ( NOW() - INTERVAL 1 MONTH ) and NOW() ) as d on drawer.date = d.paymentDate

// left join (select  sum(amount) as supplySum, date(payment_date) as sPaymentDate from payment where drawer_type = 's' group by date(payment_date) having sPaymentDate between ( NOW() - INTERVAL 1 MONTH ) and NOW() ) as d2 on  drawer.date = d2.sPaymentDate 

// left join (select coalesce(sum(amount),0) as sumWithdraw ,date as widthdrawDate FROM operation WHERE dra_type = 's' and op_type='w' GROUP by date having date between ( NOW() - INTERVAL 1 MONTH ) and NOW() ) as d3 on drawer.date = d3.widthdrawDate

// left join (select coalesce(sum(amount),0) as sumAdded ,date as addedDate FROM operation WHERE dra_type = 's' and op_type='a' GROUP by date having date between ( NOW() - INTERVAL 1 MONTH ) and NOW() ) as d4 on drawer.date = d4.addedDate

// left join (select coalesce(sum(amount),0) as sumReturned ,date as returnedDate FROM operation WHERE dra_type = 's' and op_type='r' GROUP by date having date between ( NOW() - INTERVAL 1 MONTH ) and NOW() ) as d5 on drawer.date = d5.returnedDate

// where drawer.type = 's'


//   date
//   amount
//   profit
//   type
//   sumProfile
//   paymentDate
//   supplySum
//   sPaymentDate
//   sumWithdraw
//   widthdrawDate
//   sumAdded
//   addedDate
//   sumReturned
//   returnedDate