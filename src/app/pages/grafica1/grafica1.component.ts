

import { Component} from '@angular/core';
import { ChartData, ChartType } from 'chart.js';




@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrls: ['./grafica1.component.css']
})
export class Grafica1Component  {

 labels1 = [ 'pan', 'tacos', 'mas tacos' ]


  data1: number[] = [ 
    350, 450, 100 ]
     
   


  
}
