export enum DeliveryStatus {
  // 状态 1.待发货 2.已发货 3.接收成功 4.接收失败 5.入库成功 6.入库失败（退货） 10.取消
  PENDING = 1,
  DELIVERED = 2,
  RECEIVED = 3,
  FAILED = 4,
  IN_STOCK = 5,
  IN_STOCK_FAILED = 6,
  CANCELED = 10,
}

export const CancelDeliveryStatus = [
  DeliveryStatus.DELIVERED,
  DeliveryStatus.PENDING,
]

