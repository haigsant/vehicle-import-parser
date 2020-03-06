const Koa = require("koa");
var Router = require("koa-router");
var bodyParser = require("koa-body");
const fs = require("fs");
const os = require("os");
const path = require("path");
const csvToJson = require("convert-csv-to-json");
const VehicleImports = require("./app/vehicle-imports/vehicleImports.model");
const dir = "uploads";

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

var app = new Koa();
var router = new Router();
app.use(
  bodyParser({
    formidable: { uploadDir: "./uploads" }, //This is where the files would come
    multipart: true,
    urlencoded: true
  })
);
// response
router.get("/", ctx => {
  ctx.body = "Hello Koa";
});

const storeData = async (data, filename) => {
  try {
    await fs.writeFileSync(
      path.join(__dirname, "/conversion/", filename),
      JSON.stringify(data)
    );
  } catch (err) {
    console.error(err);
  }
};

router.post("/vehicle-import", async ctx => {
  const file = ctx.request.files.upload;
  const user = ctx.request.body.user;

  let json = csvToJson.fieldDelimiter(",").getJsonFromCsv(file.path);
  let filteredJson = new VehicleImports(json).vehicleImportsModel();
  const filename = `${user}_${Date.now()}.json`;

  let status = await storeData(filteredJson, filename);

  ctx.body = filteredJson;
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
