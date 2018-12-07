import { Product } from './../_models/product';
import { Component, OnInit, Input } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { Order, OrderLine } from '@app/_models';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @Input() order: Order;

  displayedColumns: string[];
  dataSource: MatTableDataSource<OrderLine>;
  selection: SelectionModel<OrderLine>;

  constructor() { }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  getSelected() {
    return this.selection.selected;
  }

  ngOnInit() {
    this.displayedColumns = ['select', 'name', 'quantity', 'location', 'warehouse'];
    this.dataSource = new MatTableDataSource<OrderLine>(this.order.content.map((prod) => prod.origLine));
    this.selection = new SelectionModel<OrderLine>(true, []);
  }

}
