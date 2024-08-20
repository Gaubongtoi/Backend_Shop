import { AppDataSource } from "./../database/data-source";
import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidatorOptions,
} from "class-validator";
import { Not } from "typeorm";

// Custom Decorator of class-validator
// Decorator này được sử dụng để đánh dấu 1 class là 1 ràng buộc tuỳ chỉnh (custom constraint).
// Thuộc tính async: true => có thể là bất đồng bộ
@ValidatorConstraint({ async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  // bắt buộc phải có method validate, nơi chứa logic kiểm tra unique
  public defaultMessage(): string {
    return `$property is already in use.`;
  }

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    // args: là 1 mảng chứa những ràng buộc được truyền từ decorator @IsUnique
    console.log("args: ", args.object["id"]);

    const [entity, field] = args.constraints;
    // Lấy ra repository của entity để thực hiện các thao tác với dữ liệu
    const repository = AppDataSource.getRepository(entity);
    const isUpdate: boolean = args.object["id"] !== undefined; // kiểm tra xem nó có truyền vào trường id hay không.
    let count = 0;
    // Nếu có trường "id" thì nó sẽ kiểm tra xem có bao nhiêu bản ghi trong csdl có trường field: value thoả mãn
    // Nếu không có giá trị nào trong email của entity đó trùng với value -> return 0
    if (!isUpdate) {
      count = await repository.count({ where: { [field]: value } });
    } else {
      // Nếu có trường "id" thì nó sẽ tiến hành kiểm tra những bản ghi khác id mà nó nhập vào và có [field]:  value
      // Ví dụ: muốn cập nhật 1 bản ghi với id là 2 và update cột email sẽ có giá trị là "vunhattan123@gmail.com",
      // nếu tồn tại 1 id có chứa giá trị là "vunhattan123@gmail.com" khác với id mà mình truyền vào -> không có tính duy nhất -> return count > 0
      count = await repository.count({
        where: { [field]: value, id: Not(args.object["id"]) },
      });
    }
    return count <= 0;
  }
}

export function IsUnique(
  entity: any,
  field: string,
  validationOptions?: ValidatorOptions,
) {
  return function (object: Object, propertyName: string) {
    // Hàm registerDecorator là hàm đăng ký 1 decorator tuỳ chỉnh
    registerDecorator({
      target: object.constructor, // lớp chứa thuộc tính đang được xác thực
      propertyName: propertyName, // tên thuộc tính đang được xác thực
      options: validationOptions, //
      constraints: [entity, field], // ràng buộc bổ sung cho quá trình xác thực
      validator: IsUniqueConstraint, // Lớp validator chứa logic xác thực
    });
  };
}
