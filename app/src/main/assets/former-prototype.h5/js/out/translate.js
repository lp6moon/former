
'use strict';

let map = {
    en: content => Array.from(String(content)).reduce((acc, cur) => (/[\w\d]/.test(cur) ? !acc.named ? (cur = cur.toUpperCase(), acc.named = true) : void 0 : acc.named ? acc.named = false : void 0, acc.value += cur, acc), { named: false, value: '' }).value
};

JS.translate = content => map[JS.status.language](content);
