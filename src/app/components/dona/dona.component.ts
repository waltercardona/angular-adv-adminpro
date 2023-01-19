import { Component, OnInit, Input } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.css']
})
export class DonaComponent  {

  @Input() titulo: string = 'sin titulo';
  @Input() labels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales']
  // Doughnut
@Input('labelss') doughnutChartLabels = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
 @Input('datas') doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { 
        data: [ 350, 450, 100 ],
        backgroundColor: [
          "#FF6384",
          "#63FF84",
          "#84FF63"
        ]},
     
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';
}
