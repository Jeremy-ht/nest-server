import { Column, Entity } from "typeorm";

@Entity("supplier_balance_file_relation", { schema: "nest_admin" })
export class BalanceFileRelationEntity {
  @Column("varchar", {
    name: "balance_bh",
    nullable: true,
    comment: "结算编号",
    length: 64,
  })
  balanceBh: string | null;

  @Column("varchar", {
    name: "file_random_name",
    nullable: true,
    comment: "文件随机名",
    length: 255,
  })
  fileRandomName: string | null;

  @Column("varchar", {
    name: "file_type",
    nullable: true,
    comment: "文件类型(发票/明细联)",
    length: 64,
  })
  fileType: string | null;

  @Column("int", { name: "file_status", nullable: true, comment: "文件状态" })
  fileStatus: number | null;

  @Column("varchar", {
    name: "invoice_url",
    nullable: true,
    comment: "发票地址",
    length: 255,
  })
  invoiceUrl: string | null;
}
