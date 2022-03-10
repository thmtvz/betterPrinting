import{
    print,
    log,
    warn,
    OptSettings,
    PrxSettings
} from "./index.js";
import * as glbs from "./globals.js";
import "./utils/envFromFile.js";

new PrxSettings()
    // .augment(glbs.PRINT, "oi: ", -1)
    // .augment(glbs.PRINT, "burgomar", 0)
    // .augment(glbs.PRINT, Date.now, "e")
    // .augment(glbs.PRINT, "zika", "virus")
    // .augment(glbs.PRINT, "numero 2:", 3)
    // .augment(glbs.PRINT, augmenter)
    .replace(glbs.PRINT, "oi :)", "tchau :(")
    .filter(glbs.PRINT, "zika")
//    .observe("print", console.log)
    .inject();

print("oi :)");
// print();
// log("oi");
// log([1,2,3,4]);
// log("segundo teste!")
// log("zika burgomar");
// log("zika");
// log("jonas");
// log("burgomar");

function augmenter(a){
    return false;
}
