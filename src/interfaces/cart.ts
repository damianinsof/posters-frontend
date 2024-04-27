export interface cabeceraCart{
    email: string;
    nameClient: string;
    fecha: Date;
    total: number;
    detalle : cart;

}



export  interface cart {
    cant: number;
    id: number;
    name:  string;
    price:  number;
    subtotal: number;
    date:Date;
}


