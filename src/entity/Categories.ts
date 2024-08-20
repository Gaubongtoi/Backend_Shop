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
import { ProductTypes } from "./ProductTypes";
import { Sizes } from "./Sizes";

@Entity(DBTable.CATEGORIES)
export class Categories extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  id: number;

  @OneToMany(() => ProductTypes, (types) => types.categories)
  types: ProductTypes[];

  @OneToMany(() => Sizes, (sizes) => sizes.categories)
  sizes: Sizes[];

  @Column({
    type: "varchar",
    length: 70,
    nullable: false,
    unique: true,
  })
  category_name: string;

  @Column({
    type: "text",
    nullable: false,
    default: "",
  })
  description: string;

  @Column({
    type: "text",
    nullable: false,
    default: "",
  })
  avatar_img: string;
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
