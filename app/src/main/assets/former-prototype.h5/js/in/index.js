(do {
    'use strict';

    JS.status = $.extend({
        language: 'en',
        mode: 'home'
    }, (do {
        try {
            JSON.parse(decodeURIComponent(location.href.match(/(?<=\?)(.*)(?=\#?)/)[0]));
        } catch (e) {
        }
    }) || null);

    let refresh = () => location.href = location.origin + location.pathname + '?' + JSON.stringify(JS.status) + location.hash;
    let href = ext => location.origin + location.pathname + (ext === undefined ? '' : '?' + JSON.stringify($.extend($.extend(null, JS.status), ext)));

    $('.demo-layout').now(layout => do {
        $(layout).find('.demo-header .mdl-layout-title').text(JS.translate(JS.status.mode === 'home' ? 'home' : JS.status.view));
        $(layout).find('.demo-drawer .demo-navigation').prepend(do {
            let icon_names = ['home', 'assignment', 'description'];
            let labels = ['home', 'papers', 'records'];
            let $as = Array.from({length: 3}).map((_, i) => $.tag('a', {class: 'mdl-navigation__link'}).append([
                $.tag('i', {class: 'mdl-color-text--blue-grey-400 material-icons', role: 'presentation'}).text(icon_names[i]),
                JS.translate(labels[i])
            ]));
            JS.status.mode === 'home' ? $as[0].css({background: 'rgb(0, 188, 212)'}) : $as[0].attr({href: href()});
            $as.slice(1).forEach(($a, i) => do {
                let label = labels[1 + i];
                JS.status.view === label ? $a.css({background: 'rgb(0, 188, 212)'}) : $a.attr({
                    href: href({mode: 'query', view: label})
                });
            });
            $as;
        });

        // let box = content => $.tag('div').css({
        //     margin: '8px',
        //     padding: '8px',
        //     'min-width': 'calc(100% - 16px)',
        //     'box-shadow': '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)',
        //     'background-color': 'white',
        //     overflow: 'scroll'
        // }).append($(content)).get(0);


        $(layout).find('.demo-content').css({
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            'overflow-x': 'scroll',
            display: 'block'
        }).now(content => do {
            ({
                home: () => do {
                },
                query: () => do {
                    ({
                        papers: () => do {
                            $(content).append([
                                $(JS.render.list(
                                    [JS.translate('title'), JS.translate('description'), JS.translate('create time'), JS.translate('update time')],
                                    JS.data_samples.papers.list.map(line => [line.id, line.title, line.description, new Date(line.create_time).toLocaleString(), new Date(line.update_time).toLocaleString()]),
                                    'paper'
                                )).now(table => Array.from($(table).find('tbody tr')).forEach(tr => do {
                                    let tds = Array.from($(tr).find('td'));
                                    tds.filter((td, i) => i !== 1).forEach(td => $(td).css({
                                        'white-space': 'nowrap'
                                    }));
                                    $(tds[1]).css({
                                        'min-width': '128px'
                                    });
                                }))
                            ]);
                        },
                        records: () => do {
                            $(content).append([
                                $(JS.render.list(
                                    [JS.translate('paper'), JS.translate('title'), JS.translate('description'), JS.translate('create time'), JS.translate('update time')],
                                    data.list.map(line => [line.id, line.paper_id, line.title, line.description, new Date(line.create_time).toLocaleString(), new Date(line.update_time).toLocaleString()]),
                                    'record'
                                )).now(table => Array.from($(table).find('tbody tr')).forEach(tr => do {
                                    let tds = Array.from($(tr).find('td'));
                                    tds.filter((td, i) => i !== 2).forEach(td => $(td).css({
                                        'white-space': 'nowrap'
                                    }));
                                    $(tds[2]).css({
                                        'min-width': '128px'
                                    });
                                }))
                            ]);
                        }
                    })[JS.status.view]();

                    $(layout).find('div#view-source').append([
                        $.tag('a', {
                            class: 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored mdl-color-text--white'
                        }).append($.tag('i', {class: 'material-icons'}).text('edit')),
                        $.tag('a', {
                            class: 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored mdl-color-text--white',
                            href: href({
                                mode: 'edit',
                                view: {
                                    papers: 'paper',
                                    records: 'record'
                                }[JS.status.view],
                                id: NaN
                            })
                        }).append($.tag('i', {class: 'material-icons'}).text('note_add'))
                    ]);
                },
                browse: () => do {
                    ({
                        paper: () => do {
                            $(content).append([
                                JS.render.title(JS.translate('basic information')),
                                JS.render.keyValues([
                                    [JS.translate('title'), JS.data_samples.paper.title],
                                    [JS.translate('description'), JS.data_samples.paper.description],
                                    [JS.translate('create time'), new Date(JS.data_samples.paper.create_time).toLocaleString()],
                                    [JS.translate('update time'), new Date(JS.data_samples.paper.update_time).toLocaleString()],
                                ]),
                                JS.render.title(JS.translate('content')),
                                JS.form.renderBrowse(JS.data_samples.paper.data)
                            ]);
                        }
                    })[JS.status.view]();

                    $(layout).find('div#view-source').append([
                        $.tag('a', {
                            class: 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored mdl-color-text--white',
                            href: href({
                                mode: 'edit',
                                view: JS.status.view,
                                id: JS.data_samples.paper.id
                            })
                        }).append($.tag('i', {class: 'material-icons'}).text('edit'))
                    ]);
                },
                edit: () => do {
                    ({
                        paper: () => do {
                            let data = JS.empty(JS.status.id) ? null : JS.data_samples.paper;

                            $(content).append([
                                JS.render.title(JS.translate('basic information')),
                                $(JS.render.keyValues([
                                    [JS.translate('title'), $.tag('input', {type: 'text', class: 'form-control input input-medium', input: 'title'}).now(input => data && $(input).val(data.title))],
                                    [JS.translate('description'), $.tag('textarea', {class: 'form-control input input-long', input: 'description'}).now(input => data && $(input).val(data.description))],
                                    [JS.translate('create time'), new Date(JS.data_samples.paper.create_time).toLocaleString()],
                                    [JS.translate('update time'), new Date(JS.data_samples.paper.update_time).toLocaleString()],
                                ])).now(table => $(table).addClass('basic-input-table')),
                                JS.render.title(JS.translate('content')),
                                $(JS.form.renderEdit(JS.empty(JS.status.id) ? null : JS.data_samples.paper.data)).now(table => $(table).addClass('content-input-table'))
                            ]);
                        }
                    })[JS.status.view]();

                    $(layout).find('div#view-source').append([
                        $.tag('a', {
                            class: 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored mdl-color-text--white',
                            href: href(JS.empty(JS.status.id) ? {
                                mode: 'query',
                                view: {
                                    paper: 'papers',
                                    record: 'records'
                                }[JS.status.view]
                            } : {
                                mode: 'browse',
                                view: JS.status.view,
                                id: JS.data_samples.paper.id
                            })
                        }).append($.tag('i', {class: 'material-icons'}).text('cancel')),
                        $.tag('a', {
                            class: 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored mdl-color-text--white'
                        }).append($.tag('i', {class: 'material-icons'}).text('save')).click(e => do {
                            ({
                                paper: () => do {
                                    let inputs = {id: JS.status.id};
                                    $(content).find('.basic-input-table').now(table => do {
                                        let title = $(table).find('[input=title]').val().trim();
                                        title.length ? do {
                                            inputs.title = title;
                                            inputs.description = $(table).find('[input=description]').val().trim();

                                            inputs.data = {};
                                            JS.form.getInputs(inputs.data, $(content).find('table.content-input-table').get(0))
                                            && alert(JSON.stringify(inputs));
                                        } : alert(JS.translate('title') + '不能为空');
                                    });
                                }
                            })[JS.status.view]();
                        })
                    ]);
                }
            })[JS.status.mode]();
        });
    });


    // let empty = x => x === undefined || x === null;
    //
    // let decode = (() => {
    //     let map = {};
    //     map.number = map.text = map.textarea = data => data.defaut;
    //     let range_map = data => data.range.reduce((acc, cur) => {
    //         acc[cur.id] = empty(cur.title) ? cur.id : cur.title;
    //         return acc;
    //     });
    //     map.select = map.radio = data => {
    //         let rm = range_map(data);
    //         return rm[data.default];
    //     };
    //     // map.checkbox=
    // })();
    //
    // let box = (content, callback) => ['div', {
    //     style: {
    //         margin: '8px',
    //         padding: '8px',
    //         'min-width': 'calc(100% - 16px)',
    //         'box-shadow': '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)',
    //         'background-color': 'white',
    //         overflow: 'scroll'
    //     }
    // }, content, callback];
    // let listTable = (head, body, item_view) => ['table', {class: 'table table-hover'}, [
    //     ['thead', {class: 'thead-light'}, [['tr', null, [
    //         ['th', {}, '#'],
    //         ...head.map(item => ['th', {}, item])
    //     ]]]],
    //     ['tbody', null, body.map((row, index) => ['tr', {style: {cursor: 'pointer'}}, [
    //         ['th', {scope: 'row'}, index + 1],
    //         ...row.slice(1).map(item => ['td', null, item])
    //     ], $tr => $tr.click(e => {
    //         JS.status.mode = 'browse';
    //         JS.status.view = item_view;
    //         JS.status.id = row[0];
    //         refresh();
    //     })])]
    // ]];
    // let titledTable = (title, children) => ['table', {class: 'table table-borderless'}, [
    //     ['thead', {class: 'thead-light'}, [['tr', null, [['th', {JS.status colspan: 99}, title]]]]],
    //     ['tbody', null, children]
    // ]];
    // let table = (children, callback) => ['table', {class: 'table table-bordered', style: {'margin-bottom': 'auto'}}, [
    //     ['tbody', null, children]
    // ], callback];
    // let pair = (key, value) => ['tr', null, [['th', {}, key], ['td', null, value]]];
    // ({
    //     home: () => {
    //
    //     },
    //     query: () => {
    //         $root.$header.$search.show();
    //
    //         $root.$main.$button.append(
    //             [$$(['i', {class: 'material-icons'}, 'create'])]
    //         ).show();
    //
    //         ({
    //             papers: () => {
    //                 $root.$main.$button.attr({
    //                     href: href({
    //                         mode: 'edit',
    //                         view: 'paper',
    //                         id: null
    //                     })
    //                 });
    //
    //                 $.post('/query/papers', res => {
    //                     res = JSON.parse(res);
    //                     $root.$main.$content.append(
    //                         $$(box([
    //                             listTable(
    //                                 [JS.translate('title'), JS.translate('description'), JS.translate('create time'), JS.translate('update time')],
    //                                 res.map(row => [row.id, row.id, row.description, new Date(row.create_time).toLocaleString(), new Date(row.update_time).toLocaleString()]),
    //                                 'paper'
    //                             )
    //                         ]))
    //                     );
    //                 });
    //             },
    //             rules: () => {
    //             },
    //             records: () => {
    //             },
    //             trash: () => {
    //             }
    //         })[JS.status.view]();
    //     },
    //     browse: () => {
    //         $root.$main.$button.append(
    //             [$$(['i', {class: 'material-icons'}, 'edit'])]
    //         ).show();
    //         ({
    //             paper: () => {
    //                 $root.$main.$button.attr({
    //                     href: href({
    //                         mode: 'edit',
    //                         view: 'paper',
    //                         id: JS.status.id
    //                     })
    //                 });
    //
    //                 $.post('/browse/paper', {id: JS.status.id}, res => {
    //                     res = JSON.parse(res);
    //                     $root.$main.$content.append([
    //                         $$(box([
    //                             titledTable(JS.translate('basic information'), [
    //                                 pair(JS.translate('title'), res.id),
    //                                 pair(JS.translate('description'), res.description),
    //                                 pair(JS.translate('create time'), new Date(res.create_time).toLocaleString()),
    //                                 pair(JS.translate('update time'), new Date(res.update_time).toLocaleString())
    //                             ])
    //                         ]))
    //                     ]);
    //                     let render = (path, data) => {
    //                         let afterwards = [];
    //                         let unit = data => table([
    //                             pair(JS.translate('type'), JS.translate(data.type)),
    //                             ...(() => {
    //                                 let rest = [];
    //                                 if (!empty(data.range)) switch (data.type) {
    //                                     case 'select':
    //                                     case 'radio':
    //                                     case 'checkbox':
    //                                         rest.push(pair(JS.translate('range'), data.range.map(item => item.id + '&nbsp;(' + (item.title ? item.title : '') + ')').join('<br/>')))
    //                                 }
    //                                 if (!empty(data.fields)) switch (data.type) {
    //                                     case 'group':
    //                                     case 'form':
    //                                     case 'table':
    //                                         rest.push(pair(JS.translate('fields'), [table(data.fields.map(field => pair(field.id + '<br/>(' + (field.title ? field.title : '') + ')', (() => {
    //                                             switch (field.type) {
    //                                                 case 'form':
    //                                                 case 'table':
    //                                                     afterwards.push(() => render(path + '.' + field.id, field));
    //                                                     return JS.translate('sub') + ' ' + JS.translate(field.type);
    //                                                 default:
    //                                                     return [unit(field)];
    //                                             }
    //                                         })())))]));
    //                                         break;
    //                                 }
    //                                 if (!empty(data.default)) switch (data.type) {
    //                                     case 'number':
    //                                     case 'text':
    //                                     case 'textarea':
    //                                         rest.push(pair(JS.translate('default'), data.default));
    //                                         break;
    //                                     case 'select':
    //                                     case 'radio':
    //                                     case 'checkbox':
    //                                         let range_map = data.range.reduce((acc, cur) => {
    //                                             acc[cur.id] = empty(cur.title) ? cur.id : cur.title;
    //                                             return acc;
    //                                         });
    //                                         switch (data.type) {
    //                                             case 'select':
    //                                             case 'radio':
    //                                                 rest.push(pair(JS.translate('default'), range_map[data.default]));
    //                                                 break;
    //                                             case 'checkbox':
    //                                                 rest.push(pair(JS.translate('default'), Object.keys(data.default).map(value => range_map(value)).join(',')))
    //                                                 break;
    //                                         }
    //                                         break;
    //                                     case 'date':
    //                                         rest.push(pair(JS.translate('default'), new Date(data.default * 1000).toLocaleDateString()));
    //                                         break;
    //                                 }
    //                                 if (!empty(data.defaults)) switch (data.type) {
    //                                     case 'table':
    //                                         // rest.push(pair(JS.translate('defaults'),));
    //                                         break;
    //                                 }
    //                                 return rest;
    //                             })()
    //                         ]);
    //                         $root.$main.$content.append(
    //                             $$(box([
    //                                 titledTable(path),
    //                                 unit(data)
    //                             ]))
    //                         );
    //                         afterwards.forEach(f => f());
    //                     };
    //                     render(JS.translate('content'), res.data);
    //                 });
    //             }
    //         })[JS.status.view]();
    //     },
    //     edit: () => {
    //         $root.$main.$button.append(
    //             [$$(['i', {class: 'material-icons'}, 'save'])]
    //         ).show();
    //
    //         ({
    //             paper: () => {
    //                 let unit = (data = null) => table([
    //                     pair(JS.translate('type'), [['select', {class: 'form-control', input: 'type'}, [
    //                         ['option'],
    //                         ...[
    //                             'number',
    //                             'date',
    //                             'text',
    //                             'textarea',
    //                             'select',
    //                             'radio',
    //                             'checkbox',
    //                             'group',
    //                             'form',
    //                             'table'
    //                         ].map(v => ['option', {value: v}, JS.translate(v)])
    //                     ], $select => {
    //                         $select.change((e, data = null) => {
    //                             $select.parents('tr:first').nextAll().remove();
    //                             let v = $select.val();
    //                             let $tbody = $select.parents('tbody:first');
    //                             switch (v) {
    //                                 case 'select':
    //                                 case 'radio':
    //                                 case 'checkbox':
    //                                     $tbody.append(
    //                                         $$(pair(JS.translate('range'), [['input', {class: 'form-control', type: 'text', placeholder: 'id(title); ...', input: 'range'}]]))
    //                                     );
    //                                     if (data) $tbody.find('[input=range]').val(data.range.map(item => item.id + '(' + (item.title ? item.title : '') + ')').join('; '));
    //                                     break;
    //                             }
    //                             switch (v) {
    //                                 case 'group':
    //                                 case 'form':
    //                                 case 'table':
    //                                     $tbody.append(
    //                                         $$(pair(
    //                                             JS.translate('fields'),
    //                                             [table([['tr', null, [['td', {colspan: 2}, [['button', {type: 'button', class: 'btn btn-light'}, JS.translate('add'), $button => {
    //                                                 $button.click((e, field = null) => $$(pair(
    //                                                     [table([
    //                                                         pair(JS.translate('id'), [['input', {class: 'form-control', type: 'text', input: 'id'}]]),
    //                                                         pair(JS.translate('title'), [['input', {class: 'form-control', type: 'text', input: 'title'}]])
    //                                                     ], $table => {
    //                                                         if (field) {
    //                                                             $table.find('[input=id]').val(field.id);
    //                                                             $table.find('[input=title]').val(field.title);
    //                                                         }
    //                                                     })],
    //                                                     [unit(field)]
    //                                                 )).insertBefore($button.parents('tr:first')));
    //                                                 if (data) setTimeout(() => data.fields.forEach(field => $button.trigger('click', field)), 0);
    //                                             }]]]]]])]
    //                                         ))
    //                                     );
    //                                     break;
    //                             }
    //                         });
    //                         if (data) setTimeout(() => $select.val(data.type).trigger('change', data), 0);
    //                     }]])
    //                 ]);
    //
    //                 $root.$main.$content.append([
    //                     $$(box([
    //                         titledTable(JS.translate('basic information'), [
    //                             pair(JS.translate('title'), [['input', {class: 'form-control', input: 'title'}]]),
    //                             pair(JS.translate('description'), [['textarea', {class: 'form-control', input: 'description'}]])
    //                         ])
    //                     ], $div => $div.attr({id: 'basic-info'}))),
    //                     $$(box([
    //                         titledTable(JS.translate('content'))
    //                     ], $div => $div.attr({id: 'content'})))
    //                 ]);
    //                 let $content = $root.$main.$content.find('[id=content]');
    //                 if (empty(JS.status.id)) $content.append($$(unit()));
    //                 else $.post('/browse/paper', {id: JS.status.id}, res => {
    //                     res = JSON.parse(res);
    //                     let $basic_info = $root.$main.$content.find('[id=basic-info]');
    //                     $basic_info.find('[input=title]').val(res.title);
    //                     $basic_info.find('[input=description]').val(res.description);
    //                     $content.append($$(unit(res.data)))
    //                 });
    //             }
    //         })[JS.status.view]();
    //     }
    // })[JS.status.mode]();
});