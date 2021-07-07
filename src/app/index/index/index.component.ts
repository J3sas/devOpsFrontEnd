import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { Orders } from 'src/app/orders.model';
import { OrderServiceService } from 'src/app/service/order-service.service';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

   errWentWrong :  string = 'Something went wrong'
   updateErr : string = 'Unable to updat'
   deleteErr : string  = 'Unable to delete'
   succUpdated : string = 'Successfully Updated'
   succAdded : string = 'Successfully Added' 

  data: boolean = true
  errMessage !: string
  successMess !: string

  deciderButtonUpdate !: number

  myImageMenu: string = "../../../assets/img/menu.png"

  finalOrderSiscounted !: any
  finalOrder !: any
  sampleTotal = 0
  curStatus !: string

  testForm !: FormGroup
  updateForm !: FormGroup
  emptyObj = {
    id: 0,
    orderName: '',
    price: 0,
    originalPrice: 0,
    isDiscounted: false,
    type: ''
  }


  orders !: Orders[]
  currStatus !: boolean
  dummyData = {
    isDiscounted: "false"
  }
  menu = [{
    id: 1,
    orderName: 'Espresso',
    price: 4.50,
    isDiscounted: false,
    originalPrice: 4.50,
    type: 'Espresso'
  },
  {
    id: 2,
    orderName: 'Machhiatto',
    price: 4.50,
    isDiscounted: false,
    originalPrice: 4.50,
    type: 'Espresso'
  }, {
    id: 3,
    orderName: 'Americano',
    price: 4.50,
    isDiscounted: false,
    originalPrice: 4.50,
    type: 'Espresso'
  },
  {
    id: 4,
    orderName: 'White Coffee with Milk',
    price: 2.60,
    isDiscounted: false,
    originalPrice: 2.60,
    type: 'Espresso'
  },
  {
    id: 5,
    orderName: 'Cafe Latte',
    price: 3.50,
    isDiscounted: false,
    originalPrice: 3.50,
    type: 'Espresso'
  },
  {
    id: 6,
    orderName: 'Cappucchino',
    price: 5.50,
    isDiscounted: false,
    originalPrice: 5.50,
    type: 'Espresso'
  },
  {
    id: 7,
    orderName: 'Tea',
    price: 5.50,
    isDiscounted: false,
    originalPrice: 5.50,
    type: 'Espresso'
  },
  {
    id: 8,
    orderName: 'Hot Chocolate',
    price: 3.50,
    isDiscounted: false,
    originalPrice: 3.50,
    type: 'Specialty Drinks '
  },
  ]


  orderSearch = []

  constructor(private orderService: OrderServiceService) { }

  ngOnInit(): void {

    this.getTotalDisc()
    this.getTotalNotDisc()
    this.getOrdersFromDb()

    this.testForm = new FormGroup({
      'orderName': new FormControl('', [
        Validators.required,
      ]),
      'price': new FormControl('', [
        Validators.required,
      ]),
      'isDiscounted': new FormControl(false, [
      ])
    }

    )

    this.updateForm = new FormGroup({
      'udpateOrderName': new FormControl('', [
        Validators.required,
      ]),
      'udpatePrice': new FormControl('', [
        Validators.required,
      ]),
      'udpateIsDiscounted': new FormControl('', [
      ])
    }

    )




  }

  getOrdersFromDb() {
    this.orderService.getOrderList().subscribe(
      res => this.orders = res,
      error => console.log(error))
  }



  findNameAndPrice(form: FormGroup) {


    if (form.invalid) {
      this.getOrdersFromDb()
      this.successMess = ''
      this.errMessage = this.errWentWrong
      form.reset()
      this.getTotalDisc()
    this.getTotalNotDisc()
      return null
    }

    console.log(form.value)
    console.log(form.value.isDiscounted)

    const orderNameOk = this.menu.find(element => element.orderName === form.value.orderName && element.price === form.value.price)
    console.log(orderNameOk)
    if (form.value.isDiscounted === true) {
      console.log(`Unang if else`)
      if (orderNameOk?.type === 'Espresso') {
        console.log(`second if else`)
        console.log(` Espresso sya na drnks`)

        let newOrderNameOk = { ...orderNameOk, price: form.value.price * 0.5, isDiscounted: true,id : 0 }
        this.addMeno(newOrderNameOk)
        this.getOrdersFromDb()
        this.errMessage = ''
        this.successMess = this.succAdded
        form.reset()
        this.getTotalDisc()
    this.getTotalNotDisc()
        return null
      }
      console.log(`Innner   else`)
    }else {
      if (orderNameOk == null) {
        this.successMess  = ''
    this.errMessage = this.errWentWrong
    form.reset()
    this.getTotalDisc()
    this.getTotalNotDisc()
    return null
      }
      console.log(`Unang  else`)
      let newOrderNameOk = { ...orderNameOk,id : 0 }

      this.addMeno(newOrderNameOk)
      console.log(`Hindi naka check `)
        this.getOrdersFromDb()
        this.errMessage = ''
        this.successMess = this.succAdded
        form.reset()
        this.getTotalDisc()
    this.getTotalNotDisc()
        return null

    }
    form.reset()
    console.log(`Nag undefuned yung taga hanap ${orderNameOk}`)
    this.successMess  = ''
    this.errMessage = this.errWentWrong
    this.getTotalDisc()
    this.getTotalNotDisc()
        
    return null
    // console.log(`This is the data `, orderNameOk)
    // if (orderNameOk?.type === 'Espresso') {
    //   console.log(`THis is an expresso`)

    //   if (form.value.isDiscounted == true) {
    //     console.log(`NAKAA TRUE SYAAAA`)

    //     let newOrderNameOk = { ...orderNameOk, price: form.value.price * 0.5, isDiscounted: true }
    //     console.log(`THIs is the new data ${newOrderNameOk.price}`)
    //     console.log(`THIs is the old  data ${orderNameOk.price}`)
    //     this.errMessage = " "
    //     this.getOrdersFromDb()
    //     this.successMess = "Successfully Added"
    //     this.addMeno(newOrderNameOk)
    //     newOrderNameOk = this.emptyObj
    //     return newOrderNameOk
    //     // this.errMessage = " "
    //     // this.successMess = "Successfully Added"
    //     // this.getOrdersFromDb()
    //     // this.getOrdersFromDb()

    //     // form.reset()
    //     // this.getOrdersFromDb()
    //     // return orderNameOk  

    //   } else if (form.value.isDiscounted == false) {
    //     this.addMeno(orderNameOk)
    //     this.getOrdersFromDb()
    //     form.reset()
    //     this.errMessage = ''
    //     this.successMess = "Successfully Added"
    //     return orderNameOk
    //   }
    // } else if (orderNameOk?.type != 'Espresso' && form.value.isDiscounted === true) {
    //   this.successMess = ''
    //   this.errMessage = "Unable to add order. This Item is not discounted "

    //   return form.reset()
    // }

    // if (orderNameOk == null) {

    //   console.log(`NULL YUNG  dito`)
    //   this.successMess = ''
    //   this.errMessage = "Unable to add order. Something went wrong "

    //   return form.reset()
    // }
    // this.addMeno(orderNameOk)
    // this.errMessage = ''
    // this.successMess = "Successfully Added"
    // this.getOrdersFromDb()
    // this.getOrdersFromDb()
    // this.getOrdersFromDb()
    // form.reset()
    // this.errMessage = ""


    // this.getTotalDiscount()
    // this.getTotal()
    // return this.successMess = "Successfully Added"




  }





  getOrdersInConsole() {

    // this.orders.forEach(elem =>
    //   console.log(elem)
    //   )

    const keys = Object.keys(this.orders);

    console.log(keys);

    keys.forEach((key, index) => {
      this.sampleTotal += this.orders[index].price
    });
    console.log(`This is the total`, this.sampleTotal)


  }


  addMeno(coffee: any) {
    console.log(coffee)
    this.orderService.addCoffeeTodb(coffee).subscribe(
      res => console.log(`  Success added`)
    )
    this.getOrdersFromDb()
    this.getOrdersFromDb()
 
    this.getTotalDisc()
    this.getTotalNotDisc()

  }
  onSubmit(form: FormGroup) {
    this.orderService.addCoffeeTodb(form.value).subscribe(
      res => console.log(`  Success added`, form.value)
    )
    form.reset()
    

    this.getOrdersFromDb()
    this.getTotalDisc()
    this.getTotalNotDisc()

  }
  cancelButton() {
 
    this.deciderButtonUpdate = 123
    this.getTotalDisc()
    this.getTotalNotDisc()
  }
  updateDisc(id: number, orderStatus: boolean, orderType: any) {

    console.log(orderStatus)

    this.currStatus = orderStatus

    // console.log(`I want my data to be `,this.currStatus)
    // if (orderType === 'Espresso') {



    //   console.log(id, { isDiscounted: String(this.currStatus) })

    //   this.orderService?.updateDiscount(id, { isDiscounted: String(this.currStatus) }).subscribe(
    //     res =>  console.log(`Successfully updated ` )
    //   )
    //   this.deciderButtonUpdate = 123
    //   this.getOrdersFromDb()

    //   return this.getOrdersFromDb()

    // }
    this.getOrdersFromDb()
    this.getTotalDisc()
    this.getTotalNotDisc()
    return this.errMessage = 'Unable to update the item. Something went wrong'
  }

  disableTheButton(order: any) {
    this.deciderButtonUpdate = order.id
    console.log(`this is the data ${order.id}`)
    this.orderService.getSoloOrder(order.id).subscribe(
      res =>
        this.updateForm.setValue({
          udpateOrderName: res.orderName,
          udpatePrice: res.price,
          udpateIsDiscounted: res.isDiscounted

        })
    )
    this.getTotalDisc()
    this.getTotalNotDisc()

  }

  deleteOrderButton(orderId: number) {
    this.orderService.deleteOrder(orderId).subscribe(
      res => console.log(`successfully deleted`)
    )

    this.getOrdersFromDb()
    this.getOrdersFromDb()
    this.getOrdersFromDb()
    this.getTotalDisc()
    this.getTotalNotDisc()
    this.errMessage = ''
    return this.successMess = "Successfully Deleted"
  }
  onSubmitNewForm(orderId: number, form: FormGroup, orderType: string,orderPrice : number) {

    console.log(orderPrice)
    console.log(orderId)
    console.log(orderType)

    this.currStatus = form.value.udpateIsDiscounted

    console.log(`I want my data to be `, this.currStatus)
    if (orderType === 'Espresso') {


      this.getTotalDisc()
      this.getTotalNotDisc()

      console.log(orderId, { isDiscounted: String(this.currStatus) })

      this.orderService?.updateDiscount(orderId, { isDiscounted: String(this.currStatus) }).subscribe(
        res => console.log(`Successfully updated `)
      )
      this.getTotalDisc()
    this.getTotalNotDisc()
      this.deciderButtonUpdate = 123
      this.getOrdersFromDb()
      this.errMessage = ''
      this.successMess = 'Successfully Updated '
      this.getTotalDisc()
    this.getTotalNotDisc()
      return this.getOrdersFromDb()

    }

    this.getOrdersFromDb()
    this.successMess = ''
    return this.errMessage = 'Unable to update the item. Something went wrong'
  }

  getTotalNotDisc(){
    this.orderService.getTotal().subscribe(
      res => console.log(this.finalOrder = res, `me`)
    )
  }

  getTotalDisc(){
    this.orderService.getTotalDiscount().subscribe(
      res => console.log(this.finalOrderSiscounted = res, `second`)
    )
  }


}
