import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("supplier_delivery_status_record", {schema: "nest_admin"})
export class DeliveryStatusRecordEntity {
  @PrimaryColumn("varchar", {
    name: "delivery_bh",
    comment: "送货单编号",
    length: 65,
  })
  deliveryBh: string | null;

  @PrimaryColumn("datetime", {
    name: "operate_time",
    comment: "创建时间\r\n",
  })
  operateTime: Date | null;

  @Column("varchar", {
    name: "record_type",
    nullable: true,
    comment: "记录类型\r\n",
    length: 64,
  })
  recordType: string | null;

  @Column("int", {name: "num", nullable: true, comment: "变动数量\r\n"})
  num: number | null;

  @Column("varchar", {
    name: "operate_person_desc",
    nullable: true,
    comment: "操作人信息描述",
    length: 512,
  })
  operatePersonDesc: string | null;

  @Column("varchar", {
    name: "remark",
    nullable: true,
    comment: "备注\r\n",
    length: 512,
  })
  remark: string | null;

  @Column("bigint", {
    name: "delivery_item_id",
    nullable: true,
    comment: "\r\n对应的送货单详情id",
  })
  deliveryItemId: string | null;

  @Column("varchar", {
    name: "product_code",
    nullable: true,
    comment: "商品编号\r\n",
    length: 64,
  })
  productCode: string | null;

  @Column("varchar", {
    name: "operate_type",
    nullable: true,
    comment:
      "业务类型:\r\n1.待发货 \r\n2.已发货\r\n3.接收成功\r\n4.接收失败\r\n5.入库成功\r\n6.入库失败（退货）\r\n7.出库使用\r\n8.退还供应商",
    length: 64,
  })
  operateType: string | null;

  @Column("varchar", {
    name: "operate_desc",
    nullable: true,
    comment: "业务描述\r\n",
    length: 64,
  })
  operateDesc: string | null;

  @Column("varchar", {
    name: "record_url",
    nullable: true,
    comment: "相关链接地址",
    length: 512,
  })
  recordUrl: string | null;

  @Column("bigint", {
    name: "second_detail_id",
    nullable: true,
    comment: "对应的送货单二级详情id",
  })
  secondDetailId: string | null;

  @Column("varchar", {
    name: "product_standard_code",
    nullable: true,
    comment: "商品标准编号",
    length: 64,
  })
  productStandardCode: string | null;

  @Column("varchar", {
    name: "operate_person",
    nullable: true,
    comment: "操作人",
    length: 64,
  })
  operatePerson: string | null;

  @Column("varchar", {
    name: "operate_person_name",
    nullable: true,
    comment: "操作人名称",
    length: 64,
  })
  operatePersonName: string | null;

  @Column("varchar", {
    name: "change_desc",
    nullable: true,
    comment: "装状态变化描述",
    length: 1024,
  })
  changeDesc: string | null;

  @Column("varchar", {
    name: "url_desc",
    nullable: true,
    comment: "链接地址描述",
    length: 255,
  })
  urlDesc: string | null;

  @Column("varchar", {
    name: "title",
    nullable: true,
    comment: "标题",
    length: 255,
  })
  title: string | null;
}
