import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { DBTable } from "~/constants/DBTable";
import { Orders } from "./Orders";
import { Products } from "./Products";

@Entity(DBTable.ORDER_ITEMS)
export class Order_Items extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  id: number;

  @ManyToOne(() => Orders, (orders) => orders.orderItems, {
    eager: true,
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinColumn({
    name: "order_id",
  })
  orders: Orders;

  @ManyToOne(() => Products, (products) => products.orderItems, {
    eager: true,
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinColumn({
    name: "product_id",
  })
  products: Products;

  @Column({
    type: "integer",
    nullable: false,
  })
  quantity: number;

  @Column({
    type: "varchar",
    length: 50,
    nullable: false,
  })
  product_size: string;

  @Column({
    type: "integer",
    nullable: true,
  })
  promotion_id: string;

  @Column({
    type: "varchar",
    length: 40,
    nullable: false,
  })
  hex_code: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  updated_at: Date;
}
