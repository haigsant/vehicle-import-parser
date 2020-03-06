const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-body");
const {
  uploadProviderInventory
} = require("./app/vehicle-imports/vehicleImports.handler");

const app = new Koa();
const router = new Router();

app.use(
  bodyParser({
    formidable: { uploadDir: "./uploads" },
    multipart: true,
    urlencoded: true
  })
);

router.post("/vehicle-import", async ctx => {
  try {
    if (
      !ctx.request.files ||
      !ctx.request.body ||
      !ctx.request.files.upload ||
      !ctx.request.body.provider
    ) {
      ctx.throw(400, "Missing upload or provider parameters");
    }

    const file = ctx.request.files.upload;
    const provider = ctx.request.body.provider;

    await uploadProviderInventory(provider, file.path);
    ctx.status = 200;
  } catch (error) {
    ctx.throw(500, error);
  }
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
