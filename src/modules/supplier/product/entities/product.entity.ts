import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("supplier_product", { schema: "nest_admin" })
export class ProductEntity {
  @PrimaryGeneratedColumn({
    type: "bigint",
    name: "product_id",
    comment: "产品id",
  })
  productId: string;

  @Column("varchar", {
    name: "product_name",
    nullable: true,
    comment: "产品名称",
    length: 255,
  })
  productName: string | null;

  @Column("varchar", {
    name: "product_standard_name",
    nullable: true,
    comment: "产品标准名称",
    length: 512,
  })
  productStandardName: string | null;

  @Column("varchar", {
    name: "udi_di_bh",
    nullable: true,
    comment: "UDI编码(DI部分)",
    length: 255,
  })
  udiDiBh: string | null;

  @Column("varchar", {
    name: "product_unit",
    nullable: true,
    comment: "产品单位",
    length: 64,
  })
  productUnit: string | null;

  @Column("decimal", {
    name: "in_price",
    nullable: true,
    comment: "产品进价",
    precision: 12,
    scale: 4,
  })
  inPrice: string | null;

  @Column("decimal", {
    name: "sale_price",
    nullable: true,
    comment: "产品售价",
    precision: 12,
    scale: 4,
  })
  salePrice: string | null;

  @Column("varchar", {
    name: "specs",
    nullable: true,
    comment: "规格",
    length: 255,
  })
  specs: string | null;

  @Column("varchar", {
    name: "product_model",
    nullable: true,
    comment: "产品型号",
    length: 255,
  })
  productModel: string | null;

  @Column("varchar", {
    name: "min_unit",
    nullable: true,
    comment: "最小单位",
    length: 64,
  })
  minUnit: string | null;

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
    name: "product_img",
    nullable: true,
    comment: "产品主图",
    length: 512,
  })
  productImg: string | null;

  @Column("varchar", {
    name: "package_unit",
    nullable: true,
    comment: "包装单位",
    length: 64,
  })
  packageUnit: string | null;

  @Column("int", { name: "package_model", nullable: true, comment: "包装规格" })
  packageModel: number | null;

  @Column("varchar", {
    name: "product_remark",
    nullable: true,
    comment: "产品备注",
    length: 512,
  })
  productRemark: string | null;

  @Column("varchar", {
    name: "detail_flag",
    nullable: true,
    comment: "明细标志",
    length: 1,
  })
  detailFlag: string | null;

  @Column("varchar", {
    name: "sn",
    nullable: true,
    comment: "材料唯一码",
    length: 255,
  })
  sn: string | null;

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
    comment: "国家医保码",
    length: 255,
  })
  medicalInsuranceCode: string | null;

  @Column("varchar", {
    name: "medical_insurance_sn",
    nullable: true,
    comment: "国家医保流水号",
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

  @Column("int", { name: "can_use_num", nullable: true, comment: "可使用次数" })
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
    length: 255,
  })
  py: string | null;

  @Column("varchar", {
    name: "service_person",
    nullable: true,
    comment: "产品维护人工号",
    length: 64,
  })
  servicePerson: string | null;

  @Column("varchar", {
    name: "service_person_name",
    nullable: true,
    comment: "产品维护人名称",
    length: 64,
  })
  servicePersonName: string | null;

  @Column("varchar", {
    name: "support_img",
    nullable: true,
    comment: "产品辅图",
    length: 512,
  })
  supportImg: string | null;

  @Column("varchar", {
    name: "register_img",
    nullable: true,
    comment: "产品注册证图",
    length: 512,
  })
  registerImg: string | null;

  @Column("bigint", { name: "hospital_id", nullable: true, comment: "医院id" })
  hospitalId: string | null;

  @Column("varchar", {
    name: "product_code",
    nullable: true,
    comment: "产品代码",
    length: 255,
  })
  productCode: string | null;

  @Column("varchar", {
    name: "product_standard_code",
    nullable: true,
    comment: "产品标准代码",
    length: 255,
  })
  productStandardCode: string | null;

  @Column("varchar", {
    name: "provincial_platform_code",
    nullable: true,
    comment: "省平台码",
    length: 64,
  })
  provincialPlatformCode: string | null;

  @Column("varchar", {
    name: "on_line_flag",
    nullable: true,
    comment: "是否线上 0-线下 1-线上",
    length: 2,
  })
  onLineFlag: string | null;

  @Column("varchar", {
    name: "param_args",
    nullable: true,
    comment: "保存解析批次索引值",
    length: 64,
  })
  paramArgs: string | null;

  @Column("timestamp", {
    name: "create_time",
    nullable: true,
    comment: "创建时间",
  })
  createTime: Date | null;

  @Column("int", { name: "label_flag", nullable: true, comment: "是否贴码" })
  labelFlag: number | null;

  @Column("int", {
    name: "examine_status",
    nullable: true,
    comment: "审核 0-正常 1-审核中",
  })
  examineStatus: number | null;
}
