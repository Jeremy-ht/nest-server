import { Column, Entity } from "typeorm";

@Entity("supplier_balance_record", { schema: "nest_admin" })
export class BalanceRecordEntity {
  @Column("varchar", {
    primary: true,
    name: "balance_bh",
    comment: "结算编号",
    length: 64,
    default: () => "'0'",
  })
  balanceBh: string;

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
    name: "hospital_input_bh",
    nullable: true,
    comment: "医院入库编号",
    length: 255,
  })
  hospitalInputBh: string | null;

  @Column("int", {
    name: "tb_status",
    nullable: true,
    comment: "同步状态0-未同步 1-已同步 2-上传失败 3-多送货单部分上传",
    unsigned: true,
    default: () => "'0'",
  })
  tbStatus: number | null;

  @Column("int", {
    name: "spt_get_flag",
    nullable: true,
    comment: "省平台调用标志",
  })
  sptGetFlag: number | null;

  @Column("varchar", {
    name: "tb_order_id",
    nullable: true,
    comment: "同步订单号码 邵逸夫省平台订单号，后续有再加",
    length: 255,
  })
  tbOrderId: string | null;

  @Column("varchar", {
    name: "invoice_title",
    nullable: true,
    comment: "发票抬头",
    length: 255,
  })
  invoiceTitle: string | null;

  @Column("varchar", {
    name: "invoice_check_code",
    nullable: true,
    comment: "发票校验码",
    length: 255,
  })
  invoiceCheckCode: string | null;

  @Column("varchar", {
    name: "invoice_code",
    nullable: true,
    comment: "发票代码",
    length: 255,
  })
  invoiceCode: string | null;

  @Column("varchar", {
    name: "invoice_bh",
    nullable: true,
    comment: "发票编号",
    length: 255,
  })
  invoiceBh: string | null;

  @Column("decimal", {
    name: "invoice_amount",
    nullable: true,
    comment: "发票金额",
    precision: 10,
    scale: 2,
  })
  invoiceAmount: string | null;

  @Column("decimal", {
    name: "before_tax_amount",
    nullable: true,
    comment: "税前金额",
    precision: 10,
    scale: 2,
  })
  beforeTaxAmount: string | null;

  @Column("date", { name: "invoice_date", nullable: true, comment: "开票时间" })
  invoiceDate: string | null;

  @Column("bigint", {
    name: "supplier_id",
    nullable: true,
    comment: "供应商id",
  })
  supplierId: string | null;

  @Column("int", {
    name: "invoice_status",
    nullable: true,
    comment: "发票状态--0 未开票 1 已开票",
  })
  invoiceStatus: number | null;

  @Column("datetime", {
    name: "create_time",
    nullable: true,
    comment: "创建时间",
  })
  createTime: Date | null;

  @Column("varchar", {
    name: "operate_person",
    nullable: true,
    comment: "开票人",
    length: 64,
  })
  operatePerson: string | null;

  @Column("int", {
    name: "balance_status",
    nullable: true,
    comment:
      "结算状态 0-已提交 1-医院处理中 2-审核通过 3-已打款 10-审核不通过 11-打款失败",
    default: () => "'0'",
  })
  balanceStatus: number | null;

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
    comment: "科室代码",
    length: 64,
  })
  deptCode: string | null;

  @Column("varchar", {
    name: "dept_name",
    nullable: true,
    comment: "科室名称",
    length: 255,
  })
  deptName: string | null;

  @Column("int", {
    name: "hospital_get_flag",
    nullable: true,
    comment: "医院调用标志 1-已调用",
  })
  hospitalGetFlag: number | null;

  @Column("varchar", {
    name: "hospital_request_bh",
    nullable: true,
    comment: "医院调用编码",
    length: 255,
  })
  hospitalRequestBh: string | null;

  @Column("varchar", {
    name: "hospital_pay_order_bh",
    nullable: true,
    comment: "医院支付订单编号",
    length: 255,
  })
  hospitalPayOrderBh: string | null;

  @Column("varchar", {
    name: "invoice_delivery_bh",
    nullable: true,
    comment: "开发票后生成的发票送货单",
    length: 255,
  })
  invoiceDeliveryBh: string | null;
}
