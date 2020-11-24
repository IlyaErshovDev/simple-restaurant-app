export default class RestoService {
    constructor() {
        this._dataBase = 'http://localhost:3000';
    }
    getResource = async (url) => {
        const res = await fetch(`${this._dataBase}${url}`);
    
        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    };
    getMenuItems = async () => {
        return await this.getResource('/menu/');
    };

    setOrder = async (orderData) => {
        const ordNumber = await this.getOrderNum(),
        newOrder = {
            id: ordNumber,
            order: orderData
        },
        response = await fetch(`${this._dataBase}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newOrder)
        });
        if (!response.ok) {
            throw new Error ('failed to response JSON DB')
        }
        console.log(`status: ${response.status}, data: ${ JSON.stringify(newOrder)}`);
    };

    getOrderNum = async () => {
            const res = await this.getResource('/orders/');
            return ++res.length;
    } 
}