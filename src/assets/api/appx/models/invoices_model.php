<?php
class invoices_model extends CI_Model
{
    public function __construct()
    {
        $this->load->database();
    }

    public function update($id, $data)
    {
        $this->db->where('PID', $id);
        if ($this->db->update('person', $data)) {
            return true;
        } else {
            return false;
        }

    }

    public function updateDebit($id, $amount)
    {
        $this->db->set('debit', 'debit -' . $amount, false);
        $this->db->where('PID', $id);
        if ($this->db->update('person')) {
            return true;
        } else {
            return false;
        }

    }

    public function deleteInvoice($id, $amount)
    {
        $this->db->trans_start();
        $this->db->where('INVID', $id);
        $this->db->delete('invoice');
        $this->db->query('update drawer set amount = amount - ' . $amount . ' where date = CURDATE() and type= "a"');

        $this->db->trans_complete();

        if ($this->db->trans_status()) {
            return true;
        } else {
            return false;
        }
    }

   

}
