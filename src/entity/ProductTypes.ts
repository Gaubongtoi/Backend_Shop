import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { DBTable } from "~/constants/DBTable";
import { Categories } from "./Categories";
import { Products } from "./Products";

@Entity(DBTable.PRODUCT_TYPES)
export class ProductTypes extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  id: number;

  @ManyToOne(() => Categories, (categories) => categories.types, {
    eager: true,
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinColumn({
    name: "category_id",
  })
  categories: Categories;

  @OneToMany(() => Products, (products) => products.types)
  products: Products[];

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
