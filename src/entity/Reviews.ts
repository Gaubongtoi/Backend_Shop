import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { DBTable } from "~/constants/DBTable";
import { Products } from "./Products";

@Entity(DBTable.REVIEWS)
export class Reviews extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  id: number;

  @ManyToOne(() => Products, (products) => products.reviews, {
    eager: true,
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinColumn({
    name: "product_id",
  })
  products: Products;

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
