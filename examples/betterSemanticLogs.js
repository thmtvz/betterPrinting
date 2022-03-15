import {
    log,
    error,
    warn,
    PrxSettings,
    globals,
} from "betterpriting";

new PrxSettings()
    .augment(globals.LOG, "LOG:")
    .augment(globals.ERROR, "ERROR:")
    .augment(globals.WARN, "WARN:")
    .inject();


function sum(num1, num2){
    return num1 + num2;
}

function isOk(value){
    if(value === "ok") return true;
    return false;
}

(async function main(){
    let sum1 = 1;
    let sum2 = 2;
    let result = sum(sum1, sum2);
    log(`performed operation sum for ${sum1} and ${sum2}, resulting in ${result}`);

    let notOk = "not ok";
    if(!isOk(notOk)){
	error("this is not ok");
    }
    warn("application running after unrecoverable state, expect breakage");
})();
