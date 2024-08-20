import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { DBTable } from "../constants/DBTable";
import { Users } from "./Users";
@Entity(DBTable.ROLES)
export class Roles extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  id: number;

  @Column({
    type: "varchar",
    length: 70,
    nullable: false,
    unique: true,
  })
  role_name: string;

  // @OneToMany(
  //   type => TargetEntity, // Hàm trả về lớp (class) của thực thể đích
  //   inverseSide => inverseSide.propertyName, // Hàm trả về thuộc tính trong thực thể đích trỏ ngược lại thực thể nguồn
  //   options? // Tùy chọn bổ sung (optional)
  // )

  @OneToMany(
    () => Users, // Đây là 1 hàm trả về lớp Users. Điều này cho TypeORM biết rằng mối quan hệ này liên kết với thực thể (table)
    (users) => users.role, // Đây là hàm nhận tương đối user và trả về thuộc tính role của thực thể users => Users sẽ có 1 thuộc tính role để trỏ lại thực thể role
  )
  users: Users[]; // Thuộc tính users trong thực thể Roles là 1 mảng Array chứa các đối tượng Users => Roles có thể liên kết với nhiều Users

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
