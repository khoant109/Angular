import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Product } from './../models/product';
import { ProductService } from './../models/product-service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})

export class ProductFormComponent implements OnInit {
  @Input() public id: number;
  @Input() public title: string;
  @Output() reloadGridEvent = new EventEmitter(true);

  productModel: Product;
  productForm: FormGroup;

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.bindModel();

    this.productForm = this.formBuilder.group({
      id: this.productModel.id,
      name: [this.productModel.name, Validators.required],
      price: [this.productModel.price, Validators.required],
      description: this.productModel.description
    });
  }

  bindModel() {
    this.productModel = this.id === 0
                        ? ProductService.init()
                        : ProductService.get(this.id);
  }

  onSave(model: Product) {
    if (model.id === 0) {
      ProductService.add(model);
    } else {
      ProductService.edit(model);
    }
    this.activeModal.close('Close click');
    // this.reloadGridEvent.emit();
  }
}
