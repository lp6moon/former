(do {
    'use strict';

    let map = {
        en: content => Array.from(String(content)).reduce((acc, cur) => do {
            if (/[\w\d]/.test(cur)) {
                if (!acc.named) {
                    cur = cur.toUpperCase();
                    acc.named = true;
                }
            } else if (acc.named) acc.named = false;
            acc.value += cur;
            acc;
        }, {named: false, value: ''}).value
    };

    JS.translate = content => map[JS.status.language](content);
});