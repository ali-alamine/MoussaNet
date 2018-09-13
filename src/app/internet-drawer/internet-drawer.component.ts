import { Component, OnInit } from '@angular/core';
import { InternetDrawerService } from './internet-drawer.service';
declare var $: any;
@Component({
  selector: 'app-internet-drawer',
  templateUrl: './internet-drawer.component.html',
  styleUrls: ['./internet-drawer.component.css']
})
export class InternetDrawerComponent implements OnInit {
  private internetDrawer; // empty 
  constructor(private internetDrawerService: InternetDrawerService) { }

  ngOnInit() {

    this.internetDrawerService.getInternetDrawer().subscribe(Response => {
      this.internetDrawer = Response;
      var invoicePaymentsDT = $('#internetDrawerDT').DataTable({
        responsive: true,
        paging: true,
        pagingType: "full_numbers",
        serverSide: false,
        processing: true,
        ordering: true,
        stateSave: false,
        fixedHeader: false,
        searching: true,
        lengthMenu: [[5, 10, 25, 50, 100], [5, 10, 25, 50, 100]],
        data: this.internetDrawer,
        order: [[0, 'desc']],
        columns: [
  
          { data: "paymentDate", title: "Date" },
          { data: "sum(profile)", title: "Amount", render: $.fn.dataTable.render.number(',', '.', 0, 'LL ') }
          
  
        ]
      });
    },error => {
      console.log(error)
    });

    
  }

}

