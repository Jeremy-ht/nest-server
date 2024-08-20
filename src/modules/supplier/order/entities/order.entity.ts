import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { OrderItemEntity } from '~/modules/supplier/order/entities/orderItem.entity';
import { OrderLinkPersonEntity } from '~/modules/supplier/order/entities/orderLinkPerson.entity';
import { OrderDeliveryRelationEntity } from '~/modules/supplier/order/entities/orderDeliveryRelation.entity';

@Entity("supplier_order", {schema: "nest_admin"})
export class OrderEntity {
  @PrimaryColumn("varchar", {
    primary: true,
    name: "order_bh",
    comment: "订单编号",
    length: 64,
  })
  orderBh: string;

  @Column("varchar", {
    name: "hospital_order_bh",
    nullable: true,
    comment: "医院订单编号",
    length: 64,
  })
  hospitalOrderBh: string | null;

  @Column("varchar", {
    name: "hospital_id",
    nullable: true,
    comment: "医院id",
    length: 20,
  })
  hospitalId: string | null;

  @Column("varchar", {
    name: "hospital_name",
    nullable: true,
    comment: "医院名称",
    length: 255,
  })
  hospitalName: string | null;

  @Column("bigint", {
    name: "supplier_id",
    nullable: true,
    comment: "供货商id",
  })
  supplierId: string | null;

  @Column("varchar", {
    name: "supplier_simple_name",
    nullable: true,
    comment: "供货商简称",
    length: 255,
  })
  supplierSimpleName: string | null;

  @Column("timestamp", {
    name: "order_time",
    nullable: true,
    comment: "下单时间",
  })
  orderTime: Date | null;

  @Column("varchar", {
    name: "area_code",
    nullable: true,
    comment: "院区代码",
    length: 64,
  })
  areaCode: string | null;

  @Column("varchar", {
    name: "area_name",
    nullable: true,
    comment: "院区名称",
    length: 255,
  })
  areaName: string | null;

  @Column("varchar", {
    name: "dept_code",
    nullable: true,
    comment: "部门代码",
    length: 64,
  })
  deptCode: string | null;

  @Column("varchar", {
    name: "dept_name",
    nullable: true,
    comment: "医院部门名称",
    length: 255,
  })
  deptName: string | null;

  @Column("varchar", {
    name: "order_status",
    nullable: true,
    comment: "订单状态",
    length: 64,
  })
  orderStatus: string | null;

  @Column("int", {
    name: "total_num",
    nullable: true,
    comment: "明细数量"
  })
  totalNum: number | null;

  @Column("decimal", {
    name: "order_amount",
    nullable: true,
    comment: "总金额",
    precision: 10,
    scale: 2,
  })
  orderAmount: string | null;

  @Column("timestamp", {
    name: "create_time",
    nullable: true,
    comment: "创建日期",
  })
  createTime: Date | null;

  @Column("timestamp", {
    name: "update_time",
    nullable: true,
    comment: "更新日期",
  })
  updateTime: Date | null;

  @Column("varchar", {
    name: "order_person_name",
    nullable: true,
    comment: "下单人名称",
    length: 255,
  })
  orderPersonName: string | null;

  @Column("varchar", {
    name: "order_person_code",
    nullable: true,
    comment: "下单人工号",
    length: 64,
  })
  orderPersonCode: string | null;

  @Column("varchar", {
    name: "contact_info",
    nullable: true,
    comment: "下单人联系方式",
    length: 255,
  })
  contactInfo: string | null;

  @Column("varchar", {
    name: "remark",
    nullable: true,
    comment: "备注",
    length: 255,
  })
  remark: string | null;

  @Column("varchar", {
    name: "hospital_simple_name",
    nullable: true,
    comment: "医院简称",
    length: 255,
  })
  hospitalSimpleName: string | null;

  @Column("varchar", {
    name: "delivery_address",
    nullable: true,
    comment: "配送地址",
    length: 255,
  })
  deliveryAddress: string | null;

  @Column("int", {
    name: "read_sign",
    nullable: true,
    comment: "是否已读 0/Null 未读 1 已读",
  })
  readSign: number | null;

  @Column("int", {
    name: "out_sign",
    nullable: true,
    comment: "0/null 未超时 1 已超时",
  })
  outSign: number | null;

  @Column("varchar", {
    name: "on_line_flag",
    nullable: true,
    comment: "是否线上 0-线下 1-线上",
    length: 255,
  })
  onLineFlag: string | null;

  @Column("varchar", {
    name: "pack_flag",
    nullable: true,
    comment: "虚实库标志 0-实库 1-虚库",
    length: 255,
  })
  packFlag: string | null;

  @Column("varchar", {
    name: "ph_flag",
    nullable: true,
    comment: "高低值标志 0-低值 1-高值",
    length: 255,
  })
  phFlag: string | null;

  @Column("varchar", {
    name: "sync_status",
    nullable: true,
    comment: "同步状态 0-未同步 1-已同步",
    length: 255,
  })
  syncStatus: string | null;

  @Column("varchar", {
    name: "provincial_platform_order_bh",
    nullable: true,
    comment: "省平台订单号",
    length: 255,
  })
  provincialPlatformOrderBh: string | null;

  @Column("varchar", {
    name: "supplier_name",
    nullable: true,
    comment: "供应商名称",
    length: 255,
  })
  supplierName: string | null;

  @OneToMany(() => OrderItemEntity, orderItem => orderItem.order)
  orderItem: OrderItemEntity[];

  @OneToMany(() => OrderLinkPersonEntity, orderLinkPerson => orderLinkPerson.order)
  orderLinkPerson: OrderLinkPersonEntity[];

  @OneToMany(() => OrderDeliveryRelationEntity, orderDeliverys => orderDeliverys.order)
  orderDeliverys: OrderDeliveryRelationEntity[];
}
