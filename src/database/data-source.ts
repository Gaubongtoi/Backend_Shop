import { DataSource } from "typeorm";
import "reflect-metadata";
import { Products } from "~/entity/Products";
import { Categories } from "~/entity/Categories";
import { Suppliers } from "~/entity/Suppliers";
import { Users } from "~/entity";
import { RefreshTokens } from "~/entity/RefreshTokens";
import { Orders } from "~/entity/Orders";
import { Customers } from "~/entity/Customers";
import { Brands } from "~/entity/Brands";
import { ProductTypes } from "~/entity/ProductTypes";
import { Inventory } from "~/entity/Inventory";
import { Sizes } from "~/entity/Sizes";
import { Colors } from "~/entity/Colors";
import { Roles } from "~/entity/Roles";
import { ShoppingCart } from "~/entity/Cart";
import { CartItems } from "~/entity/CartItems";
import { Order_Items } from "~/entity/OrderItems";
import { PromotionPhases } from "~/entity/PromotionPhases";
import { Promotions } from "~/entity/Promotions";
import { Reviews } from "~/entity/Reviews";
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "vunhattan123",
  database: "E-commerce",
  synchronize: true, // Không nên bật trong môi trường production
  logging: false,
  entities: [
    Products,
    Categories,
    Suppliers,
    Users,
    RefreshTokens,
    Orders,
    Customers,
    Brands,
    ProductTypes,
    Inventory,
    Sizes,
    Colors,
    Roles,
    ShoppingCart,
    CartItems,
    Order_Items,
    PromotionPhases,
    Promotions,
    Reviews,
  ], // Đường dẫn tới các entity
  migrations: [],
  subscribers: [],
});
