import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { DeliveryItemEntity } from '~/modules/supplier/delivery/entities/deliveryItem.entity';

@Entity("supplier_delivery", { schema: "nest_admin" })
export class DeliveryEntity {
  @PrimaryColumn("varchar", {
    primary: true,
    name: "delivery_bh",
    comment: "送货单编号",
    length: 64,
  })
  deliveryBh: string;

  @Column("bigint", {
    name: "supplier_id",
    nullable: true,
    comment: "供应商id",
  })
  supplierId: string | null;

  @Column("varchar", {
    name: "supplier_simple_name",
    nullable: true,
    comment: "供应商简称",
    length: 255,
  })
  supplierSimpleName: string | null;

  @Column("datetime", {
    name: "create_time",
    nullable: true,
    comment: "创建日期",
  })
  createTime: Date | null;

  @Column("varchar", {
    name: "deliver_user",
    nullable: true,
    comment: "发货联系人",
    length: 255,
  })
  deliverUser: string | null;

  @Column("varchar", {
    name: "receive_person",
    nullable: true,
    comment: "收货联系人(对应科室的联系人)",
    length: 255,
  })
  receivePerson: string | null;

  @Column("varchar", {
    name: "dept_code",
    nullable: true,
    comment: "医院部门代码",
    length: 64,
  })
  deptCode: string | null;

  @Column("varchar", {
    name: "area_code",
    nullable: true,
    comment: "院区代码",
    length: 64,
  })
  areaCode: string | null;

  @Column("int", {
    name: "deliver_status",
    nullable: true,
    comment: "状态1.待发货 2.已发货 3.接收成功 4.接收失败 5.入库成功 6.入库失败（退货） 10.取消",
  })
  deliverStatus: number | null;

  @Column("datetime", {
    name: "check_time",
    nullable: true,
    comment: "验收日期",
  })
  checkTime: Date | null;

  @Column("int", { name: "total_num", nullable: true, comment: "条目总数" })
  totalNum: number | null;

  @Column("decimal", {
    name: "total_amount",
    nullable: true,
    comment: "货物总价值",
    precision: 15,
    scale: 4,
  })
  totalAmount: string | null;

  @Column("bigint", {
    name: "delivery_file_id",
    nullable: true,
    comment: "送货单文件",
  })
  deliveryFileId: string | null;

  @Column("varchar", {
    name: "parent_delivery_bh",
    nullable: true,
    comment: "父送货单编号",
    length: 64,
  })
  parentDeliveryBh: string | null;

  @Column("varchar", {
    name: "remark",
    nullable: true,
    comment: "备注",
    length: 512,
  })
  remark: string | null;

  @Column("varchar", {
    name: "delivery_address",
    nullable: true,
    comment: "送货地址",
    length: 512,
  })
  deliveryAddress: string | null;

  @Column("varchar", {
    name: "dept_name",
    nullable: true,
    comment: "部门名称",
    length: 255,
  })
  deptName: string | null;

  @Column("varchar", {
    name: "area_name",
    nullable: true,
    comment: "院区名称",
    length: 255,
  })
  areaName: string | null;

  @Column("bigint", { name: "hospital_id", nullable: true, comment: "医院id" })
  hospitalId: string | null;

  @Column("varchar", {
    name: "hospital_name",
    nullable: true,
    comment: "医院名称",
    length: 255,
  })
  hospitalName: string | null;

  @Column("varchar", {
    name: "hospital_simple_name",
    nullable: true,
    comment: "医院简称",
    length: 255,
  })
  hospitalSimpleName: string | null;

  @Column("varchar", {
    name: "operate_person",
    nullable: true,
    comment: "发货人",
    length: 64,
  })
  operatePerson: string | null;

  @Column("varchar", {
    name: "operate_person_name",
    nullable: true,
    comment: "发货人姓名",
    length: 255,
  })
  operatePersonName: string | null;

  @Column("varchar", {
    name: "check_person",
    nullable: true,
    comment: "出库核对人",
    length: 64,
  })
  checkPerson: string | null;

  @Column("varchar", {
    name: "check_person_name",
    nullable: true,
    comment: "出库核对人姓名",
    length: 255,
  })
  checkPersonName: string | null;

  @Column("datetime", {
    name: "delivery_time",
    nullable: true,
    comment: "出库时间",
  })
  deliveryTime: Date | null;

  @Column("varchar", {
    name: "hospital_input_bh",
    nullable: true,
    comment: "医院入库编号",
    length: 255,
  })
  hospitalInputBh: string | null;

  @Column("varchar", {
    name: "upload_flag",
    nullable: true,
    comment: "是否上传省平台 1-上传",
    length: 255,
  })
  uploadFlag: string | null;

  @Column("varchar", {
    name: "sync_status",
    nullable: true,
    comment: "同步状态 0-未同步 1-已同步",
    length: 255,
  })
  syncStatus: string | null;

  @Column("datetime", {
    name: "update_time",
    nullable: true,
    comment: "更新日期",
  })
  updateTime: Date | null;

  @Column("varchar", {
    name: "pay_apply_person",
    nullable: true,
    comment: "支付申请发起人",
    length: 255,
  })
  payApplyPerson: string | null;

  @Column("varchar", {
    name: "pay_apply_person_name",
    nullable: true,
    comment: "支付申请发起人姓名",
    length: 255,
  })
  payApplyPersonName: string | null;

  @Column("datetime", {
    name: "pay_apply_time",
    nullable: true,
    comment: "支付申请发起时间",
  })
  payApplyTime: Date | null;

  // @OneToMany(() => DeliveryItemEntity, deliveryItems => deliveryItems.delivery)
  deliveryItems: DeliveryItemEntity[];
}
