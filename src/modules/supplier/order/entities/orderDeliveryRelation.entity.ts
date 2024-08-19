import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from '~/modules/supplier/order/entities/order.entity';

@Entity("supplier_order_delivery_relation", {schema: "nest_admin"})
export class OrderDeliveryRelationEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("bigint", {
    name: "order_item_id",
    comment: "订单明细id"
  })
  orderItemId: string | null;

  @Column("varchar", {
    name: "delivery_bh",
    nullable: true,
    comment: "送货单编号\r\n",
    length: 64,
  })
  deliveryBh: string | null;

  @ManyToOne(() => OrderEntity, order => order.orderDeliverys)
  @JoinColumn({name: 'order_bh'})
  order: OrderEntity;

}
