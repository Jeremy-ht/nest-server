import { Column, Entity } from "typeorm";

@Entity("supplier_tb_order_fail", { schema: "nest_admin" })
export class TbOrderFailEntity {
  @Column("varchar", {
    name: "balance_bh",
    nullable: true,
    comment: "结算编号",
    length: 255,
  })
  balanceBh: string | null;

  @Column("varchar", {
    name: "delivery_bh",
    nullable: true,
    comment: "送货单号",
    length: 255,
  })
  deliveryBh: string | null;

  @Column("varchar", {
    name: "hospital_input_bh",
    nullable: true,
    comment: "医院入库编号",
    length: 255,
  })
  hospitalInputBh: string | null;

  @Column("varchar", {
    name: "reason",
    nullable: true,
    comment: "失败原因",
    length: 1024,
  })
  reason: string | null;

  @Column("datetime", {
    name: "create_time",
    nullable: true,
    comment: "创建时间",
  })
  createTime: Date | null;
}
