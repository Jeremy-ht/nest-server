import { Column, Entity } from "typeorm";

@Entity("supplier_zcspt", { schema: "nest_admin" })
export class ZcsptEntity {
  @Column("varchar", {
    name: "balance_bh",
    nullable: true,
    comment: "结算编号",
    length: 64,
  })
  balanceBh: string | null;

  @Column("varchar", {
    name: "delivery_bh",
    nullable: true,
    comment: "送货单编号",
    length: 64,
  })
  deliveryBh: string | null;

  @Column("varchar", {
    name: "spt_id",
    nullable: true,
    comment: "省平台订单id",
    length: 64,
  })
  sptId: string | null;

  @Column("datetime", {
    name: "create_time",
    comment: "创建时间",
    default: () => "CURRENT_TIMESTAMP",
  })
  createTime: Date;

  @Column("datetime", {
    name: "check_time",
    nullable: true,
    comment: "收货时间",
  })
  checkTime: Date | null;

  @Column("datetime", {
    name: "distribution_time",
    nullable: true,
    comment: "配送时间",
  })
  distributionTime: Date | null;

  @Column("varchar", {
    name: "spt_code",
    nullable: true,
    comment: "省平台订单编码",
    length: 255,
  })
  sptCode: string | null;

  @Column("varchar", {
    name: "invoice_bh",
    nullable: true,
    comment: "发票号",
    length: 255,
  })
  invoiceBh: string | null;

  @Column("varchar", {
    name: "spt_plan_code",
    nullable: true,
    comment: "订单计划编码",
    length: 255,
  })
  sptPlanCode: string | null;

  @Column("varchar", {
    name: "hospital_input_bh",
    nullable: true,
    comment: "医院rkbh",
    length: 255,
  })
  hospitalInputBh: string | null;

  @Column("varchar", {
    name: "spt_order_bh",
    nullable: true,
    comment: "采购订单编号",
    length: 255,
  })
  sptOrderBh: string | null;

  @Column("varchar", {
    name: "check_flag",
    nullable: true,
    comment: "收货状态 1-收货 null-未收货",
    length: 255,
  })
  checkFlag: string | null;
}
