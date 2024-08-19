import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from '~/modules/supplier/order/entities/order.entity';

@Entity("supplier_order_link_person", {schema: "nest_admin"})
export class OrderLinkPersonEntity {
  @PrimaryGeneratedColumn({type: "bigint", name: "link_id"})
  linkId: string;

  @Column("varchar", {
    name: "link_name",
    nullable: true,
    comment: "联系人名字",
    length: 255,
  })
  linkName: string | null;

  @Column("varchar", {
    name: "link_telephone",
    nullable: true,
    comment: "联系方式",
    length: 255,
  })
  linkTelephone: string | null;

  @ManyToOne(() => OrderEntity, order => order.orderLinkPerson)
  order: OrderEntity;
}
