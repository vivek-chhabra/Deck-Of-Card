function randNum(max, min = 0) {
    let rand = Math.floor(Math.random() * ((max + 1) - min)) + min;
    return rand;
}

function displayFlex(boolean) {
    return boolean ? { display: "flex" } : { display: "none" };
}

function randBool() {
    return (randNum(1) == 1)? true : false;
}

export { randNum, displayFlex, randBool };
