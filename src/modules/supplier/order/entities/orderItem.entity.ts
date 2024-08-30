import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from '~/modules/supplier/order/entities/order.entity';

@Entity("supplier_order_item", {schema: "nest_admin"})
export class OrderItemEntity {

  @PrimaryGeneratedColumn({
    type: "bigint",
    name: "order_item_id",
    comment: "详情id",
  })
  orderItemId: string;

  // @Column("varchar", {
  //   name: "order_bh",
  //   nullable: true,
  //   comment: "所属订单编号",
  //   length: 64,
  // })
  // orderBh: string | null;

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
    comment: "医院商品编码",
    length: 64,
  })
  productCode: string | null;

  @Column("varchar", {
    name: "product_standard_code",
    nullable: true,
    comment: "商品标准代码",
    length: 64,
  })
  productStandardCode: string | null;

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
    comment: "商品标准名称",
    length: 512,
  })
  productStandardName: string | null;

  @Column("varchar", {
    name: "product_unit",
    nullable: true,
    comment: "商品单位",
    length: 64,
  })
  productUnit: string | null;

  @Column("varchar", {
    name: "min_unit",
    nullable: true,
    comment: "最小单位",
    length: 64,
  })
  minUnit: string | null;

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
    length: 255,
  })
  productModel: string | null;

  @Column("varchar", {
    name: "package_unit",
    nullable: true,
    comment: "包装单位",
    length: 64,
  })
  packageUnit: string | null;

  @Column("int", {name: "package_model", nullable: true, comment: "包装规格"})
  packageModel: number | null;

  @Column("int", {name: "num", nullable: true, comment: "采购数量"})
  num: number | null;

  @Column("int", {
    name: "delivery_num",
    nullable: true,
    comment: "已发货数量",
  })
  deliveryNum: number | null;

  @Column("decimal", {
    name: "price",
    nullable: true,
    comment: "单价",
    precision: 10,
    scale: 4,
  })
  price: string | null;

  @Column("decimal", {
    name: "total_amount",
    nullable: true,
    comment: "总价",
    precision: 12,
    scale: 4,
  })
  totalAmount: string | null;

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

  @Column("bigint", {
    name: "factory_id",
    nullable: true,
    comment: "生产厂家id",
  })
  factoryId: string | null;

  @Column("varchar", {
    name: "factory_name",
    nullable: true,
    comment: "生产厂家名称",
    length: 255,
  })
  factoryName: string | null;

  @Column("varchar", {
    name: "brand",
    nullable: true,
    comment: "品牌",
    length: 255,
  })
  brand: string | null;

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
    name: "product_url",
    nullable: true,
    comment: "商品图片路径",
    length: 512,
  })
  productUrl: string | null;

  @Column("varchar", {
    name: "detail_flag",
    nullable: true,
    comment: "二级明细标志",
    length: 1,
  })
  detailFlag: string;

  @Column("varchar", {
    name: "cat_code",
    nullable: true,
    comment: "产品分类编号",
    length: 64,
  })
  catCode: string | null;

  @Column("varchar", {
    name: "cat_name",
    nullable: true,
    comment: "产品分类名称",
    length: 255,
  })
  catName: string | null;

  @Column("varchar", {
    name: "medical_insurance_code",
    nullable: true,
    comment: "医保码",
    length: 255,
  })
  medicalInsuranceCode: string | null;

  @Column("varchar", {
    name: "medical_insurance_sn",
    nullable: true,
    comment: "医保流水号",
    length: 255,
  })
  medicalInsuranceSn: string | null;

  @Column("varchar", {
    name: "is_import",
    nullable: true,
    comment: "是否进口",
    length: 1,
  })
  isImport: string | null;

  @Column("int", {name: "can_use_num", nullable: true, comment: "可使用次数"})
  canUseNum: number | null;

  @Column("varchar", {
    name: "can_repeat_use",
    nullable: true,
    comment: "可否复用",
    length: 1,
  })
  canRepeatUse: string | null;

  @Column("varchar", {
    name: "py",
    nullable: true,
    comment: "拼音",
    length: 128,
  })
  py: string | null;

  @Column("varchar", {
    name: "provincial_platform_code",
    nullable: true,
    comment: "省平台码",
    length: 64,
  })
  provincialPlatformCode: string | null;

  @Column("int", {
    name: "fp_flag",
    nullable: true,
    comment: "开发票标志 0-不开发票入虚库 1-开发票入实库",
  })
  fpFlag: number | null;

  @Column("bigint", {
    name: "product_id",
    nullable: true,
    comment: "对应系统商品的主键",
  })
  productId: string | null;

  @Column("varchar", {
    name: "label_flag",
    nullable: true,
    comment: "医院贴码标志 0-不贴码 1-贴码",
    length: 2,
  })
  labelFlag: string | null;

  @Column("varchar", {
    name: "hospital_detail_bh",
    nullable: true,
    comment: "医院材料订单序号",
    length: 255,
  })
  hospitalDetailBh: string | null;

  @Column("varchar", {
    name: "on_line_flag",
    nullable: true,
    comment: "是否线上 0-线下 1-线上",
    length: 2,
  })
  onLineFlag: string | null;

  @Column("varchar", {
    name: "provincial_platform_item_id",
    nullable: true,
    comment: "省平台明细号",
    length: 255,
  })
  provincialPlatformItemId: string | null;

  @Column("varchar", {
    name: "application_dept",
    nullable: true,
    comment: "申请科室",
    length: 255,
  })
  applicationDept: string | null;

  @ManyToOne(() => OrderEntity, order => order.orderItem)
  @JoinColumn([{ name: "order_bh" }])
  order: OrderEntity;
}
