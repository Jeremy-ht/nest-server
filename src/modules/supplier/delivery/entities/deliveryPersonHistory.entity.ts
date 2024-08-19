import { Column, Entity } from "typeorm";

// @Entity("supplier_delivery_person_history", { schema: "nest_admin" })
export class DeliveryPersonHistoryEntity {
  @Column("bigint", {
    name: "supplier_id",
    nullable: true,
    comment: "供应商id",
  })
  supplierId: string | null;

  @Column("varchar", {
    name: "delivery_person_name",
    nullable: true,
    comment: "送货人名称",
    length: 255,
  })
  deliveryPersonName: string | null;

  @Column("varchar", {
    name: "delivery_contact_info",
    nullable: true,
    comment: "送货单联系方式",
    length: 255,
  })
  deliveryContactInfo: string | null;
}
