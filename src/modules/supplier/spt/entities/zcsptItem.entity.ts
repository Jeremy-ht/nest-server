import { Column, Entity } from "typeorm";

@Entity("supplier_zcspt_item", { schema: "nest_admin" })
export class ZcsptItemEntity {
  @Column("varchar", {
    name: "spt_id",
    nullable: true,
    comment: "省平台id",
    length: 64,
  })
  sptId: string | null;

  @Column("varchar", {
    name: "spt_item_id",
    nullable: true,
    comment: "省平台明细id",
    length: 64,
  })
  sptItemId: string | null;

  @Column("varchar", {
    name: "delivery_item_id",
    nullable: true,
    comment: "送货单明细id",
    length: 64,
  })
  deliveryItemId: string | null;

  @Column("varchar", {
    name: "product_name",
    nullable: true,
    comment: "产品名称",
    length: 255,
  })
  productName: string | null;

  @Column("varchar", {
    name: "specs",
    nullable: true,
    comment: "规格",
    length: 1024,
  })
  specs: string | null;

  @Column("varchar", {
    name: "product_model",
    nullable: true,
    comment: "产品型号",
    length: 1024,
  })
  productModel: string | null;

  @Column("varchar", {
    name: "register_certificate_name",
    nullable: true,
    comment: "注册证名称",
    length: 255,
  })
  registerCertificateName: string | null;

  @Column("date", {
    name: "register_certificate_endtime",
    nullable: true,
    comment: "注册证过期时间",
  })
  registerCertificateEndtime: string | null;

  @Column("int", { name: "num", nullable: true, comment: "数量" })
  num: number | null;

  @Column("varchar", { name: "spt_detl_id", nullable: true, length: 64 })
  sptDetlId: string | null;

  @Column("varchar", { name: "purc_plan_det_id", nullable: true, length: 64 })
  purcPlanDetId: string | null;

  @Column("varchar", {
    name: "spt_code",
    nullable: true,
    comment: "省平台订单编码",
    length: 255,
  })
  sptCode: string | null;

  @Column("varchar", {
    name: "batch_bh",
    nullable: true,
    comment: "批号",
    length: 255,
  })
  batchBh: string | null;

  @Column("varchar", {
    name: "check_flag",
    nullable: true,
    comment: "1 已收货 null 未收货",
    length: 4,
  })
  checkFlag: string | null;

  @Column("timestamp", {
    name: "check_time",
    nullable: true,
    comment: "收货时间",
  })
  checkTime: Date | null;

  @Column("varchar", {
    name: "spt_sh_id",
    nullable: true,
    comment: "省平台收获id",
    length: 255,
  })
  sptShId: string | null;
}
