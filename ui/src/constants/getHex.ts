const getHex = (str: string) => {

    let weight = 1.0
    let numberWeight = 1.0
    let letterInfo = 0;
    let numberInfo = 0;
    let code0 = '0'.charCodeAt(0);
    let code9 = '9'.charCodeAt(0);
    let codea = 'a'.charCodeAt(0);
    let codez = 'z'.charCodeAt(0);
    str.toLowerCase().split('').forEach(char => {
        let code = char.charCodeAt(0);

        if (code0 <= code && code <= code9) {
            numberInfo += numberWeight * (code - code0) / 10
            numberWeight /= 4
            return
        }
        
        if (codea <= code && code <= codez) {
            letterInfo += weight * (code - codea) / 26
            weight /= 4;
            return;
        }
    })

    numberInfo /= 1.33;
    letterInfo /= 1.33;

    let h = letterInfo * 360;
    let l = 60 + 40 * numberInfo;
    let s = 120 - l;

    return `hsl(${h}deg ${s}% ${l}%)`;
}

export default getHex;