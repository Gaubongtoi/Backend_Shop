import { AppDataSource } from "./database/data-source";
import * as dotenv from "dotenv";
dotenv.config();

import app from "./app";
// import { initFolderUpload } from './utils/file';

// Tạo folder upload/images nếu chưa tạo
// initFolderUpload();

const PORT = process.env.PORT;
// Ket noi database
AppDataSource.initialize()
  .then(async () => {
    console.log("Connect database success");
  })
  .catch((error: any) => console.log(error));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
