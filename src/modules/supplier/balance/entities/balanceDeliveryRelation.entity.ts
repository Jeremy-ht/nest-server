import { Column, Entity } from "typeorm";

@Entity("supplier_balance_delivery_relation", { schema: "nest_admin" })
export class BalanceDeliveryRelationEntity {
  @Column("bigint", {
    name: "delivery_item_id",
    nullable: true,
    comment: "送货单明细id\r\n",
  })
  deliveryItemId: string | null;

  @Column("varchar", {
    name: "balance_bh",
    nullable: true,
    comment: "结算编号\r\n",
    length: 64,
  })
  balanceBh: string | null;

  @Column("varchar", {
    name: "delivery_bh",
    nullable: true,
    comment: "送货单编号\r\n\r\n",
    length: 64,
  })
  deliveryBh: string | null;

  @Column("int", {
    name: "balance_num",
    nullable: true,
    comment: "结算数量\r\n",
  })
  balanceNum: number | null;

  @Column("bigint", {
    name: "second_detail_id",
    nullable: true,
    comment: "二级明细id",
  })
  secondDetailId: string | null;

  @Column("decimal", {
    name: "delivery_item_total_amount",
    nullable: true,
    comment: "送货单明细总价格",
    precision: 10,
    scale: 2,
  })
  deliveryItemTotalAmount: string | null;

  @Column("varchar", {
    name: "spt_item_id",
    nullable: true,
    comment: "省平台商品明细id",
    length: 64,
  })
  sptItemId: string | null;

  @Column("varchar", {
    name: "spt_distribution_item_id",
    nullable: true,
    comment: "省平台配送明细id",
    length: 64,
  })
  sptDistributionItemId: string | null;

  @Column("varchar", {
    name: "check_status",
    nullable: true,
    comment: "收货状态",
    length: 255,
  })
  checkStatus: string | null;

  @Column("int", {
    name: "distribution_num",
    nullable: true,
    comment: "配送数量",
  })
  distributionNum: number | null;
}
