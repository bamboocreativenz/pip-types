"use strict";
/* https://github.com/peterthoeny/parse-csv-js, MIT License */
Object.defineProperty(exports, "__esModule", { value: true });
exports.canParseCsv = exports.parseAndTrimCsv = void 0;
const fp_1 = require("lodash/fp");
// parse CSV/TSV function
function parseCsv(data, fieldSep = ',', newLine = '\n') {
    const nSep = '\x1D';
    const qSep = '\x1E';
    const cSep = '\x1F';
    const nSepRe = new RegExp(nSep, 'g');
    const qSepRe = new RegExp(qSep, 'g');
    const cSepRe = new RegExp(cSep, 'g');
    const fieldRe = new RegExp('(?<=(^|[' + fieldSep + '\\n]))"(|[\\s\\S]+?(?<![^"]"))"(?=($|[' + fieldSep + '\\n]))', 'g');
    const grid = [];
    data
        .replace(/\r/g, '')
        .replace(/\n+$/, '')
        .replace(fieldRe, function (match, p1, p2) {
        return p2.replace(/\n/g, nSep).replace(/""/g, qSep).replace(/,/g, cSep);
    })
        .split(/\n/)
        .forEach(function (line) {
        const row = line.split(fieldSep).map(function (cell) {
            return cell.replace(nSepRe, newLine).replace(qSepRe, '"').replace(cSepRe, ',');
        });
        grid.push(row);
    });
    //console.log('- grid: ' + JSON.stringify(grid, null, ' '));
    return grid;
}
function parseAndTrimCsv(data) {
    return parseCsv(data).map(item => item.map(subItem => fp_1.trim(subItem)));
}
exports.parseAndTrimCsv = parseAndTrimCsv;
function canParseCsv(data) {
    return parseCsv(data)[0].length > 1;
}
exports.canParseCsv = canParseCsv;
