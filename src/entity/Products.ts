import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { DBTable } from "~/constants/DBTable";
import { Brands } from "./Brands";
import { ProductTypes } from "./ProductTypes";
import { PromotionPhases } from "./PromotionPhases";
import { Order_Items } from "./OrderItems";
import { Inventory } from "./Inventory";
import { Reviews } from "./Reviews";
import { CartItems } from "./CartItems";

@Entity(DBTable.PRODUCTS)
export class Products extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  id: number;
  //
  @ManyToOne(() => Brands, (brands) => brands.products, {
    eager: true,
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinColumn({
    name: "brand_id",
  })
  brands: Brands;

  @ManyToOne(() => ProductTypes, (types) => types.products, {
    eager: true,
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinColumn({
    name: "type_id",
  })
  types: ProductTypes;

  @ManyToOne(() => PromotionPhases, (phases) => phases.products, {
    eager: true,
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinColumn({
    name: "promotion_phase_id",
  })
  phases: PromotionPhases;

  @OneToMany(() => Order_Items, (items) => items.products)
  orderItems: Order_Items[];

  @OneToMany(() => Inventory, (inventory) => inventory.products)
  inventory: Inventory[];

  @OneToMany(() => Reviews, (reviews) => reviews.products)
  reviews: Reviews[];

  @OneToMany(() => CartItems, (citems) => citems.products)
  citems: CartItems[];

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  product_name: string;

  @Column({
    type: "text",
    nullable: true,
    default: "",
  })
  description: string;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price: number;

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
