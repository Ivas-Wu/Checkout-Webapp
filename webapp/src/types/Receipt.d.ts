export type Receipt = {
  id: Number,
  userId: Number,
  store?: String,
  total: Number,
  category?: String,
  date?: Date,
}

export type ReceiptCreateReq = {
  userId: Number,
  store?: String,
  total: Number,
  category?: String,
  date?: Date
}

export type ReceiptUpdateReq = {
  userId?: Number,
  store?: String,
  total?: Number,
  category?: String,
  date?: Date
}