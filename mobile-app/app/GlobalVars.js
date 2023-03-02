//global.DEVICE_IP = "192.168.0.155"
//global.DEVICE_IP = "192.168.1.147"
global.DEVICE_IP = "192.168.50.44"  // 201 Lester
global.USER_ID = 4

export class Receipt {
    constructor() {
        this.id = null;
        this.store = null;
        this.category = null;
        this.date = null;
        this.total = null;
        this.createdAt = new Date();
        this.updatedAt = null;
        this.userId = USER_ID;
    }
}

export class Item {
    constructor() {
        this.productName = null;
        this.price = null;
        this.category = null;
        this.userId = USER_ID;
        this.receiptId = null;
    }
}