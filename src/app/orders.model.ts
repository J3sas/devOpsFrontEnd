export class Orders {

    constructor(
        public id : number,
        public orderName : string,
        public price : number,
        public originalPrice : number,
        public isDiscounted : boolean,
        public type : string

    ){}
}
