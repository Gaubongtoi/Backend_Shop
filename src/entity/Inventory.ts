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
import { Sizes } from "./Sizes";
import { Products } from "./Products";
import { Colors } from "./Colors";
import { Suppliers } from "./Suppliers";

@Entity(DBTable.INVENTORY)
export class Inventory extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  id: number;

  @ManyToOne(() => Sizes, (sizes) => sizes.inventory, {
    eager: true,
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinColumn({
    name: "size_id",
  })
  sizes: Sizes;

  @ManyToOne(() => Products, (products) => products.inventory, {
    eager: true,
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinColumn({
    name: "product_id",
  })
  products: Products;

  @ManyToOne(() => Colors, (colors) => colors.inventory, {
    eager: true,
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinColumn({
    name: "color_id",
  })
  colors: Colors;

  @ManyToOne(() => Suppliers, (suppliers) => suppliers.inventory, {
    eager: true,
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinColumn({
    name: "supplier_id",
  })
  suppliers: Suppliers;

  @Column({
    type: "integer",
    nullable: false,
  })
  quantity: number;

  @Column("text")
  img: string;

  @Column("text", { array: true, nullable: false })
  imgs: string[];

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
