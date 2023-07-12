export default class OrderItem {

    _id: string;
    _name: string;
    _quantity: number;
    _price: number;

    constructor(id: string, name: string, quantity: number, price: number) {
        this._id = id;
        this._name = name;
        this._quantity = quantity;
        this._price = price; 
        
        this.validate();
    }

    validate() {
        if (!this._id || this._id.length === 0) throw new Error("ID is required")
        if (!this._name || this._name.length === 0) throw new Error("Name is required")
        if (!this._quantity || this._quantity === 0) throw new Error("Quantity is required")
        if (!this._price || this._price === 0) throw new Error("Price is required")
    }    
}