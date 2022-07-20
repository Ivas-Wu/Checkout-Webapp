export type Item = {
  id: Number,
  userId: Number,
  receiptId: Number,
  productName: String,
  category?: String,
  numberOf?: Number,
  price: Number
}

export type ItemCreateReq = {
  userId: Number,
  receiptId: Number,
  productName: String,
  category?: String,
  numberOf?: Number,
  price: Number
}

export type ItemUpdateReq = {
  userId?: Number,
  receiptId?: Number,
  productName?: String,
  category?: String,
  numberOf?: Number,
  price?: Number
}