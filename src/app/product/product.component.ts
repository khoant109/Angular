import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Product } from './models/product';
import { ProductService } from './models/product-service';

import { ProductFormComponent } from './product-form/product-form.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})

export class ProductComponent implements OnInit {
  closeResult: string;

  id = 0;
  title = '';
  productModel = null;
  products = new Array<Product>();

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.reloadGrid();
  }

  reloadGridEventHandler() {
    this.reloadGrid();
  }

  reloadGrid() {
    this.products = ProductService.getAll();
  }

  open(title: string, id: number = 0) {
    const modalRef = this.modalService.open(ProductFormComponent);
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.title = title;
    modalRef.result.then((result) => {
      this.reloadGrid();
    });
  }

  addProduct(event: any) {
    event.preventDefault();
    this.open('Add New Product');
  }

  editProduct(event: any, id: number) {
    event.preventDefault();
    this.open('Edit Product', id);
  }

  deleteProduct(event: any, id: number) {
    event.preventDefault();
    ProductService.remove(id);
    this.reloadGrid();
  }
}
