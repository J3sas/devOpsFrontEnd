import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orders } from '../orders.model';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {


  

  defaultDomain = 'http://localhost:8080'

  constructor(private http : HttpClient) { }




  public getOrderList() : Observable<Orders[]> { // I was called from product list component
    return this.http.get<Orders[]>(`${this.defaultDomain}/orders/all`)
   }

  public addCoffeeTodb(coffee :Orders ) : Observable<Orders>{
  return this.http.post<Orders>(`${this.defaultDomain}/orders/insert`,coffee)
  }

  public updateDiscount(coffeeId :any,coffeeStatus : any) : Observable<Orders>{
    console.log( typeof coffeeStatus )
    console.log(  coffeeStatus )
    return this.http.put<Orders>(`${this.defaultDomain}/orders/update/${coffeeId}`,coffeeStatus)
    }

    public getSoloOrder(orderId : number) : Observable<Orders> {
      return this.http.get<Orders>(`${this.defaultDomain}/orders/order/${orderId}`)
    }

    public deleteOrder(orderId : number)  {
      return this.http.delete(`${this.defaultDomain}/orders/delete/${orderId}`)
    }

    public getTotal() {
      return this.http.get(`${this.defaultDomain}/orders/sum`)
    }
    public getTotalDiscount() {
      return this.http.get(`${this.defaultDomain}/orders/discount`)
    }


    
}
