/**
 * Transforma un objeto de hasta 3 niveles en uno de 1 nivel
 * 
 * @param {object} item Objeto a combertir
 * @returns {object} Objeto de un solo nivel
 */
const TransformObj1Nivel = (item = {}) => {
    let obj1Nivel = { asistentereclamosvida: true };
    for (const key in item) {
        let element = item[key];
        if (element && typeof element == 'object') {
            for (const key2 in element) {
                let element2 = element[key2];
                if (element2 && typeof element2 == 'object') {
                    for (const key3 in element2) {
                        let element3 = element2[key3];
                        if (element3 && typeof elemen3 == 'object') {
                            for (const key4 in element3) {
                                const element4 = element3[key4];
                                obj1Nivel[key4] = element4;
                            }
                        } else obj1Nivel[key3] = element3;
                    }
                } else obj1Nivel[key2] = element2;
            }
        } else obj1Nivel[key] = element;
    }
    return obj1Nivel;
};

/**
 * transformObject toma nuevas llaves y las agrega a un nuevo objeto,
 * las viejas llaves deben de ser menores que las nuevas llaves.
 *
 * @param {Array<String>} oldKeys - Llaves del antiguo objecto
 * @param {Array<String} newKeys - Llaves que el nuevo objeto tendra
 * @param {Object} obj - Objeto que posee las llaves y valores a pasar al nuevo objecto
 * @returns Object
 */
const ChangeKeysObject = (oldKeys = [], newKeys = [], obj = {}, keepOldKeys = false) => {
    let newObj = {};

    if (
        Array.isArray(oldKeys) &&
        Array.isArray(newKeys) &&
        obj &&
        typeof obj === 'object'
    ) {
        // const lengthOldKeys = oldKeys.length;
        const lengthNewKeys = newKeys.length;

        oldKeys.map((key, index) => {
            if (
                index <= lengthNewKeys &&
                typeof key === 'string' &&
                typeof newKeys[index] === 'string'
            ) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                    newObj[newKeys[index]] = obj[key];
            }
        });
    }
    return keepOldKeys ? { ...newObj, ...obj } : newObj;
}

module.exports = {
    TransformObj1Nivel,
    ChangeKeysObject,
};
