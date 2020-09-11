
/* https://github.com/peterthoeny/parse-csv-js, MIT License */

// parse CSV/TSV function
export function parseCsv(data: string, fieldSep = ',', newLine = '\n') {
  const nSep = '\x1D';
  const qSep = '\x1E';
  const cSep = '\x1F';
  const nSepRe = new RegExp(nSep, 'g');
  const qSepRe = new RegExp(qSep, 'g');
  const cSepRe = new RegExp(cSep, 'g');
  const fieldRe = new RegExp('(?<=(^|[' + fieldSep + '\\n]))"(|[\\s\\S]+?(?<![^"]"))"(?=($|[' + fieldSep + '\\n]))', 'g');
  const grid: string[][] = [];
  data.replace(/\r/g, '').replace(/\n+$/, '').replace(fieldRe, function(match: any, p1: any, p2: string) {
      return p2.replace(/\n/g, nSep).replace(/""/g, qSep).replace(/,/g, cSep);
  }).split(/\n/).forEach(function(line: string) {
      const row = line.split(fieldSep).map(function(cell: string) {
          return cell.replace(nSepRe, newLine).replace(qSepRe, '"').replace(cSepRe, ',');
      });
      grid.push(row);
  });
  //console.log('- grid: ' + JSON.stringify(grid, null, ' '));
  return grid;
}
