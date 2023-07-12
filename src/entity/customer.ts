import Address from "./VOs/address";

// UMA ENTIDATE DE NEGOCIO POR PADRÃO DEVE SE AUTO-VALIDAR GARANTINDO SUA CONSISTÊNCIA
export default class Customer {
    _id: string;
    _name: string;
    _address!: Address;
    _active: boolean = false;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    validate() {
        if (!this._name || this._name.length === 0) throw new Error("Name is required")
        if (!this._id || this._id.length === 0) throw new Error("ID is required")
    }
    
    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    activate(){
        if(!this._address || this._address !== undefined) 
            throw new Error("Address is mandatory to activate a customer")

        this._active = true;
    }

    deactivate(){
        this._active = false;
    }

    set Address(address: Address){
        this._address = address;
    }
}

