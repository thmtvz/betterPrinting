import{
    print,
    log,
    warn,
    OptSettings,
    PrxSettings
} from "./index.js";
import * as glbs from "./globals.js";

let teste = new PrxSettings()
    .augment(glbs.PRINT, "oi: ", -1)
    .augment(glbs.PRINT, "burgomar", 0)
    .augment(glbs.PRINT, Date.now, "e")
    .augment(glbs.PRINT, "zika", "virus")
    .augment(glbs.PRINT, "numero 2:", 3)
    .augment(glbs.PRINT, augmenter)
    .replace(glbs.PRINT, "oi", "tchau")
    .filter(glbs.PRINT, "zika")
//    .observe("print", console.log)
    .inject();

log("oi :)");
log("oi");
log([1,2,3,4]);
log("segundo teste!")
log("zika burgomar");
log("zika");
log("jonas");
warn("burgomar");
console.log("jonas", [1,2,3,4], "burgomar");

function augmenter(a){
    return "O GRANDIOSO BRABO BALA" + ` os args: ${a}`;
}
