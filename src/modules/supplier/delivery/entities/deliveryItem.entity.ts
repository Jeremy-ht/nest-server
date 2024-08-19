import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DeliveryEntity } from '~/modules/supplier/delivery/entities/delivery.entity';
import { DeliverySecondDetailEntity } from '~/modules/supplier/delivery/entities/deliverySecondDetail.entity';

@Entity("supplier_delivery_item", {schema: "nest_admin"})
export class DeliveryItemEntity {
  @PrimaryGeneratedColumn({
    type: "bigint",
    name: "delivery_item_id",
    comment: "详情id\r\n",
  })
  deliveryItemId: string;

  @Column("varchar", {
    name: "delivery_bh",
    nullable: true,
    comment: "送货单编号\r\n\r\n",
    length: 64,
  })
  deliveryBh: string | null;

  @Column("varchar", {
    name: "provincial_platform_code",
    nullable: true,
    comment: "省平台码",
    length: 64,
  })
  provincialPlatformCode: string | null;

  @Column("varchar", {
    name: "specs",
    nullable: true,
    comment: "规格\r\n",
    length: 1024,
  })
  specs: string | null;

  @Column("varchar", {
    name: "product_model",
    nullable: true,
    comment: "型号\r\n",
    length: 1024,
  })
  productModel: string | null;

  @Column("decimal", {
    name: "price",
    nullable: true,
    comment: "单价\r\n",
    precision: 12,
    scale: 4,
  })
  price: string | null;

  @Column("varchar", {
    name: "medical_insurance_code",
    nullable: true,
    comment: "医保码\r\n",
    length: 255,
  })
  medicalInsuranceCode: string | null;

  @Column("varchar", {
    name: "medical_insurance_sn",
    nullable: true,
    comment: "医保流水号\r\n",
    length: 255,
  })
  medicalInsuranceSn: string | null;

  @Column("varchar", {
    name: "udi_di_bh",
    nullable: true,
    comment: "UDI编码DI部分\r\n",
    length: 255,
  })
  udiDiBh: string | null;

  @Column("varchar", {
    name: "product_code",
    nullable: true,
    comment: "医院方产品编号\r\n",
    length: 64,
  })
  productCode: string | null;

  @Column("varchar", {
    name: "product_standard_code",
    nullable: true,
    comment: "标准代码\r\n",
    length: 64,
  })
  productStandardCode: string | null;

  @Column("varchar", {
    name: "product_name",
    nullable: true,
    comment: "产品名称\r\n",
    length: 255,
  })
  productName: string | null;

  @Column("varchar", {
    name: "product_standard_name",
    nullable: true,
    comment: "标准名称\r\n",
    length: 512,
  })
  productStandardName: string | null;

  @Column("varchar", {
    name: "min_unit",
    nullable: true,
    comment: "最小单位\r\n",
    length: 64,
  })
  minUnit: string | null;

  @Column("varchar", {
    name: "product_unit",
    nullable: true,
    comment: "产品单位\r\n",
    length: 64,
  })
  productUnit: string | null;

  @Column("varchar", {
    name: "batch_bh",
    nullable: true,
    comment: "批号",
    length: 1024,
  })
  batchBh: string | null;

  @Column("varchar", {
    name: "brand",
    nullable: true,
    comment: "品牌\r\n\r\n",
    length: 1024,
  })
  brand: string | null;

  @Column("varchar", {
    name: "package_unit",
    nullable: true,
    comment: "包装单位\r\n",
    length: 64,
  })
  packageUnit: string | null;

  @Column("int", {
    name: "package_model",
    nullable: true,
    comment: "包装规格\r\n",
  })
  packageModel: number | null;

  @Column("date", {name: "valid_time", nullable: true, comment: "有效期\r\n"})
  validTime: string | null;

  @Column("int", {name: "num", nullable: true, comment: "数量\r\n"})
  num: number | null;

  @Column("int", {
    name: "real_in_stock_num",
    nullable: true,
    comment: "真实入库数量\r\n",
  })
  realInStockNum: number | null;

  @Column("int", {name: "use_num", nullable: true, comment: "使用数量\r\n"})
  useNum: number | null;

  @Column("int", {
    name: "invoice_num",
    nullable: true,
    comment: "开票数量\r\n",
  })
  invoiceNum: number | null;

  @Column("bigint", {
    name: "supplier_id",
    nullable: true,
    comment: "供应商id\r\n",
  })
  supplierId: string | null;

  @Column("varchar", {
    name: "supplier_simple_name",
    nullable: true,
    comment: "供应商简称\r\n",
    length: 255,
  })
  supplierSimpleName: string | null;

  @Column("bigint", {
    name: "factory_id",
    nullable: true,
    comment: "生产厂家id\r\n",
  })
  factoryId: string | null;

  @Column("varchar", {
    name: "factory_name",
    nullable: true,
    comment: "生产厂家名称\r\n",
    length: 255,
  })
  factoryName: string | null;

  @Column("varchar", {
    name: "detail_flag",
    nullable: true,
    comment: "是否二级明细\r\n0没有\r\n1有",
    length: 1,
  })
  detailFlag: string | null;

  @Column("int", {
    name: "item_status",
    nullable: true,
    comment:
      "状态:-1.待发货 0.已发货1.已接收 2.已入库 3.部分使用 4.全部使用 5.全部退货",
  })
  itemStatus: number | null;

  @Column("decimal", {
    name: "total_amount",
    nullable: true,
    comment: "总价\r\n",
    precision: 15,
    scale: 4,
  })
  totalAmount: string | null;

  @Column("decimal", {
    name: "real_total_amount",
    nullable: true,
    comment: "实际总价\r\n",
    precision: 15,
    scale: 4,
  })
  realTotalAmount: string | null;

  @Column("varchar", {
    name: "area_code",
    nullable: true,
    comment: "医院院区编码\r\n\r\n",
    length: 64,
  })
  areaCode: string | null;

  @Column("varchar", {
    name: "dept_code",
    nullable: true,
    comment: "医院部门编码\r\n",
    length: 64,
  })
  deptCode: string | null;

  @Column("varchar", {
    name: "area_name",
    nullable: true,
    comment: "医院院区名称\r\n",
    length: 255,
  })
  areaName: string | null;

  @Column("varchar", {
    name: "dept_name",
    nullable: true,
    comment: "医院部门名称\r\n",
    length: 255,
  })
  deptName: string | null;

  @Column("varchar", {
    name: "cat_code",
    nullable: true,
    comment: "产品分类编号\r\n",
    length: 64,
  })
  catCode: string | null;

  @Column("varchar", {
    name: "cat_name",
    nullable: true,
    comment: "产品分类名称\r\n",
    length: 255,
  })
  catName: string | null;

  @Column("varchar", {
    name: "is_import",
    nullable: true,
    comment: "是否进口\r\n",
    length: 1,
  })
  isImport: string | null;

  @Column("int", {
    name: "can_use_num",
    nullable: true,
    comment: "可使用次数\r\n",
  })
  canUseNum: number | null;

  @Column("varchar", {
    name: "can_repeat_use",
    nullable: true,
    comment: "可否复用\r\n",
    length: 1,
  })
  canRepeatUse: string | null;

  @Column("varchar", {
    name: "py",
    nullable: true,
    comment: "拼音\r\n",
    length: 255,
  })
  py: string | null;

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

  @Column("varchar", {
    name: "made_in",
    nullable: true,
    comment: "产地",
    length: 64,
  })
  madeIn: string | null;

  @Column("varchar", {
    name: "made_in_code",
    nullable: true,
    comment: "产地代码",
    length: 64,
  })
  madeInCode: string | null;

  @Column("int", {
    name: "invoice_status",
    nullable: true,
    comment: "发票状态0 未开票 1 已开票 ",
  })
  invoiceStatus: number | null;

  @Column("int", {
    name: "fp_flag",
    nullable: true,
    comment: "开发票标志 0-不开发票入虚库 1-开发票入实库",
  })
  fpFlag: number | null;

  @Column("bigint", {
    name: "product_id",
    nullable: true,
    comment:
      "商品Id   --生成规则：根据医院送过来的商品，生成我们自己的商品id 用来判断唯一",
  })
  productId: string | null;

  @Column("bigint", {
    name: "order_item_id",
    nullable: true,
    comment: "订单明细id",
  })
  orderItemId: string | null;

  @Column("varchar", {
    name: "label_flag",
    nullable: true,
    comment: "是否需要医院贴码 0-不需要 1-需要",
    length: 2,
  })
  labelFlag: string | null;

  @Column("varchar", {
    name: "on_line_flag",
    nullable: true,
    comment: "是否线上 0-线下 1-线上",
    length: 2,
  })
  onLineFlag: string | null;

  @Column("varchar", {
    name: "delivery_source",
    nullable: true,
    comment: "来源：stock-库存，direct-直接发货",
    length: 255,
  })
  deliverySource: string | null;

  @Column("varchar", {
    name: "main_bar_code",
    nullable: true,
    comment: "主条码",
    length: 255,
  })
  mainBarCode: string | null;

  @Column("varchar", {
    name: "second_bar_code",
    nullable: true,
    comment: "次条码",
    length: 255,
  })
  secondBarCode: string | null;

  @Column("varchar", {
    name: "application_dept",
    nullable: true,
    comment: "申请科室",
    length: 255,
  })
  applicationDept: string | null;

  // @ManyToOne(() => DeliveryEntity, delivery => delivery.deliveryItems)
  // @JoinColumn({ name: "delivery_bh" })
  // delivery: DeliveryEntity;

  // @OneToMany(
  //   () => DeliverySecondDetailEntity,
  //   deliverySecondDetail => deliverySecondDetail.deliveryItem
  // )
  // // @JoinColumn({ name: "delivery_item_id" })
  // deliverySecondDetail: DeliverySecondDetailEntity[];

  deliverySecondDetail: DeliverySecondDetailEntity[];
}
