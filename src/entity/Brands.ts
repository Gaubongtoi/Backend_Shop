import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { DBTable } from "~/constants/DBTable";
import { Products } from "./Products";

@Entity(DBTable.BRANDS)
export class Brands extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  id: number;

  @OneToMany(() => Products, (products) => products.brands)
  products: Products[];

  @Column({
    type: "varchar",
    length: 70,
    nullable: false,
    unique: true,
  })
  brand_name: string;

  @Column({
    type: "text",
    nullable: false,
    default: "",
  })
  description: string;

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
