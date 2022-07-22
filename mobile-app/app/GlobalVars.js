global.DEVICE_IP = "192.168.0.155"
global.USER_ID = 3

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