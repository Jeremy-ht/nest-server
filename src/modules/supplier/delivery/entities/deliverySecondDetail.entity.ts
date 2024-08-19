import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DeliveryItemEntity } from '~/modules/supplier/delivery/entities/deliveryItem.entity';

@Index("supplier_delivery_bh_index", ["deliveryBh"], {})
@Index("supplier_id_index", ["supplierId"], {})
@Entity("supplier_delivery_second_detail", {schema: "nest_admin"})
export class DeliverySecondDetailEntity {
  @PrimaryGeneratedColumn({
    type: "bigint",
    name: "second_detail_id",
    comment: "二级明细id",
  })
  secondDetailId: string;

  @Column("bigint", {
    name: "delivery_item_id",
    nullable: true,
    comment: "对应的一级明细id",
  })
  deliveryItemId: string | null;

  @Column("varchar", {
    name: "udi_di_bh",
    nullable: true,
    comment: "UDI编码DI部分",
    length: 255,
  })
  udiDiBh: string | null;

  @Column("varchar", {
    name: "product_code",
    nullable: true,
    comment: "商品编码",
    length: 64,
  })
  productCode: string | null;

  @Column("varchar", {
    name: "product_name",
    nullable: true,
    comment: "商品名称",
    length: 255,
  })
  productName: string | null;

  @Column("varchar", {
    name: "product_standard_name",
    nullable: true,
    comment: "标准名称",
    length: 512,
  })
  productStandardName: string | null;

  @Column("varchar", {
    name: "product_standard_code",
    nullable: true,
    comment: "标准代码",
    length: 64,
  })
  productStandardCode: string | null;

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
    comment: "型号",
    length: 1024,
  })
  productModel: string | null;

  @Column("varchar", {
    name: "product_unit",
    nullable: true,
    comment: "单位",
    length: 1024,
  })
  productUnit: string | null;

  @Column("varchar", {
    name: "package_unit",
    nullable: true,
    comment: "包装单位",
    length: 64,
  })
  packageUnit: string | null;

  @Column("decimal", {
    name: "in_price",
    nullable: true,
    comment: "进价",
    precision: 10,
    scale: 3,
  })
  inPrice: string | null;

  @Column("decimal", {
    name: "sale_price",
    nullable: true,
    comment: "售价",
    precision: 10,
    scale: 3,
  })
  salePrice: string | null;

  @Column("varchar", {
    name: "batch_bh",
    nullable: true,
    comment: "批号",
    length: 255,
  })
  batchBh: string | null;

  @Column("date", {name: "valid_date", nullable: true, comment: "有效期"})
  validDate: string | null;

  @Column("varchar", {
    name: "dept_code",
    nullable: true,
    comment: "部门编号",
    length: 64,
  })
  deptCode: string | null;

  @Column("varchar", {
    name: "detail_status",
    nullable: true,
    comment: "状态0-未使用 1-已使用 2-退货",
    length: 64,
  })
  detailStatus: string | null;

  @Column("varchar", {
    name: "allow_certificate",
    nullable: true,
    comment: "许可证",
    length: 255,
  })
  allowCertificate: string | null;

  @Column("varchar", {
    name: "sn",
    nullable: true,
    comment: "序列号",
    length: 255,
  })
  sn: string | null;

  @Column("varchar", {
    name: "area_code",
    nullable: true,
    comment: "院区编码",
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

  @Column("int", {name: "use_num", nullable: true, comment: "使用次数"})
  useNum: number | null;

  @Column("bigint", {name: "supplier_id", nullable: true, comment: "供应商"})
  supplierId: string | null;

  @Column("int", {
    name: "invoice_status",
    nullable: true,
    comment: "发票状态 0 未开票 1 已开票",
  })
  invoiceStatus: number | null;

  @Column("varchar", {
    name: "delivery_bh",
    nullable: true,
    comment: "对应的送货单号",
    length: 64,
  })
  deliveryBh: string | null;

  @Column("varchar", {
    name: "hospital_bar_code",
    nullable: true,
    comment: "医院条码",
    length: 767,
  })
  hospitalBarCode: string | null;

  @Column("varchar", {
    name: "main_bar_code",
    nullable: true,
    comment: "主条码",
    length: 1024,
  })
  mainBarCode: string | null;

  @Column("varchar", {
    name: "second_bar_code",
    nullable: true,
    comment: "次条码",
    length: 1024,
  })
  secondBarCode: string | null;

  // @ManyToOne(
  //   () => DeliveryItemEntity,
  //   deliveryItem => deliveryItem.deliverySecondDetail
  // )
  // @JoinColumn({name: "delivery_item_id"})
  // deliveryItem?: DeliveryItemEntity;
}
