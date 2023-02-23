import { cases } from "../utils/changeCases";

export default (filledVars: any): any => {
    var mappedVars: { [x: string]: any } = new Object();
    for (var key in filledVars) {
        let value = filledVars[key];
        mappedVars = {
            ...mappedVars,
            [key]: value,
            [`${key}Camel`]: cases.camel(value),
            [`${key}Capital`]: cases.capital(value),
            [`${key}Constant`]: cases.constant(value),
            [`${key}Dot`]: cases.dot(value),
            [`${key}Header`]: cases.header(value),
            [`${key}Snake`]: cases.snake(value),
            [`${key}Pascal`]: cases.pascal(value),
            [`${key}No`]: cases.no(value),
            [`${key}Param`]: cases.param(value),
            [`${key}Path`]: cases.path(value),
            [`${key}Sentence`]: cases.sentence(value),
        };

    }

    return mappedVars;
};