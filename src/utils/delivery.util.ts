import dayjs from 'dayjs';

export const createDeliveryBh = (prefix: string = 'SH') => {
  const date = dayjs().format('YYYYMMDDHHmmss')
  const random = Math.floor(Math.random() * 10000)
  return prefix + date + random
}
