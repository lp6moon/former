(do {
    'use strict';

    JS.empty = x => x === undefined || x === null;

    JS.render = {
        list: (head, body, item_view) => $.tag('table', {class: 'table table-hover'}).append([
            $.tag('thead', {class: 'thead-light'}).append($.tag('tr').append([
                $.tag('th', {scope: 'col'}).text('#'),
                ...head.map(h => $.tag('th', {scope: 'col'}).text(h))
            ])),
            $.tag('tbody').append(body.map((line, i) => $.tag('tr').css({cursor: 'pointer'}).append([
                $.tag('th', {scope: 'row'}).text(i + 1),
                ...line.slice(1).map(b => $.tag('td').text(b))
            ]).click(e => do {
                JS.status.mode = 'browse';
                JS.status.view = item_view;
                JS.status.id = line[0];
                refresh();
            })))
        ]),
        title: t => $.tag('table', {class: 'table'}).append($.tag('thead', {class: 'thead-light'}).append(
            $.tag('tr').append($.tag('th', {scope: 'col'}).text(t))
        )).get(0),
        keyValuesBodyLines: data => data.map(([key, value]) => $.tag('tr').append([
            $.tag('th', {scope: 'row', class: 'field field-key'}).append(key),
            $.tag('td').append(value)
        ]).get(0)),
        keyValues: data => $.tag('table', {class: 'table table-bordered'}).css({
            background: 'transparent'
        }).append(
            $.tag('tbody').append(JS.render.keyValuesBodyLines(data))
        ).get(0)
    };
});