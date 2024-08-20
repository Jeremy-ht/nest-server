import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("supplier_product_register_certificate", { schema: "nest_admin" })
export class ProductRegisterCertificateEntity {
  @PrimaryGeneratedColumn({ type: "bigint", name: "register_certificate_id" })
  registerCertificateId: string;

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
    name: "register_certificate_name",
    nullable: true,
    comment: "注册证名称",
    length: 255,
  })
  registerCertificateName: string | null;

  @Column("date", {
    name: "register_certificate_endtime",
    nullable: true,
    comment: "注册证日期",
  })
  registerCertificateEndtime: string | null;

  @Column("timestamp", {
    name: "create_time",
    nullable: true,
    comment: "创建日期",
  })
  createTime: Date | null;

  @Column("timestamp", {
    name: "update_time",
    nullable: true,
    comment: "修改日期",
  })
  updateTime: Date | null;

  @Column("varchar", {
    name: "hospital_register_certificate_bh",
    nullable: true,
    comment: "医院注册证编号",
    length: 255,
  })
  hospitalRegisterCertificateBh: string | null;

  @Column("bigint", {
    name: "order_item_id",
    nullable: true,
    comment: "订单明细id",
  })
  orderItemId: string | null;
}
