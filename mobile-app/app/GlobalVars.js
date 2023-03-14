//global.DEVICE_IP = "192.168.0.155"
//global.DEVICE_IP = "192.168.1.147"
global.DEVICE_IP = "192.168.50.44"  // 201 Lester
//global.DEVICE_IP = "10.33.128.43" // E7
global.USER_ID = 4
global.DATE_FORMAT = "DD/MM/YYYY"
global.DATE_DISPLAY_FORMAT = "MMMM DD YYYY"
global.INIT_LOGIN = false

export class Category {
    GROCERIES = 'Groceries';
    ENTERTAINMENT = 'Entertainment';
    MEDICAL = 'Medical';
    TRANSPORTATION = 'Transportation';
    HOUSING = 'Housing';
    UTILITIES = 'Utilities';
    OTHER = 'Other';
}

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