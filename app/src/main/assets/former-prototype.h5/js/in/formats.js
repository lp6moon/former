(do {
    'use strict';

    let renderFormBrowseComplex = data => JS.render.keyValuesBodyLines([
        [JS.translate('fields'), JS.render.keyValues(
            data.fields.map(field => [`${field.id}<br/>${field.title}`, JS.form.renderBrowse(field)])
        )]
    ]);

    let renderFormEditComplex = data => Array.from($(JS.render.keyValuesBodyLines([
        [[
            $.tag('div').css({height: 'calc( 69px - 1.5rem )'}),
            $.tag('div').css({
                position: 'absolute',
                top: '.75rem',
                bottom: '.75rem',
                display: 'flex',
                'flex-flow': 'column'
            }).append([
                $.tag('div').css({flex: 1}).text(JS.translate('fields')),
                $.tag('div').append(
                    $.tag('button', {type: 'button', class: 'btn btn-outline-primary btn-sm', input: 'add-field'}).text(JS.translate('✚')).click((e, data) => do {
                        $(e.target).parents('tr:first').find('tbody:first').append(
                            $(JS.render.keyValuesBodyLines([
                                [
                                    [
                                        $.tag('input', {type: 'text', class: 'form-control input input-short', placeholder: JS.translate('field ID'), input: 'field-id'}).now(input => JS.empty(data) || $(input).val(data.id)),
                                        $.tag('br'),
                                        $.tag('input', {type: 'text', class: 'form-control input input-short', placeholder: JS.translate('field title'), input: 'field-title'}).now(input => JS.empty(data) || $(input).val(data.title))
                                    ], JS.form.renderEdit(data)
                                ]
                            ])).now(tr => $(tr).addClass('field-tr').prepend(
                                $.tag('th', {class: 'field field-key'}).append([
                                    $.tag('button', {type: 'button', class: 'btn btn-outline-secondary btn-sm'}).text(JS.translate('∆')).click(d => do {
                                        let prev = $(tr).prev().get(0);
                                        prev && $(prev).before(tr);
                                    }),
                                    $.tag('br'),
                                    $.tag('button', {type: 'button', class: 'btn btn-outline-danger btn-sm'}).css({
                                        margin: '.75rem 0 .75rem 0'
                                    }).text(JS.translate('━')).click(e => do {
                                        confirm('确定删除吗?') && $(tr).remove();
                                    }),
                                    $.tag('br'),
                                    $.tag('button', {type: 'button', class: 'btn btn-outline-secondary btn-sm'}).text(JS.translate('∇')).click(d => do {
                                        let next = $(tr).next().get(0);
                                        next && $(next).after(tr);
                                    })
                                ])
                            ))
                        )
                    })
                )
            ])
        ], $(JS.render.keyValues([]))]
    ])).now(tr => do {
        $(tr).children('th:first').css({
            position: 'relative'
        });
        JS.empty(data) || data.fields.forEach(field => $(tr).find('button[input=add-field]:first').trigger('click', field));
    }));

    let getFormInputsComplex = (inputs, trs) => do {
        inputs.fields = [];
        Array.from($(trs[0]).find('td:first table:first').children('tbody').children('tr.field-tr')).every(tr => do {
            let field = {};
            field.id = $(tr).find('[input=field-id]:first').val();
            field.title = $(tr).find('[input=field-title]:first').val();
            JS.form.getInputs(field, $(tr).find('table:first').get(0)) && inputs.fields.push(field);
        });
    };

    JS.formats = {
        short_text: {
            title: 'short text',
            renderFormBrowse: data => JS.render.keyValuesBodyLines([
                [JS.translate('placeholder'), data.placeholder],
                [JS.translate('default'), data.default]
            ]),
            renderFormEdit: data => JS.render.keyValuesBodyLines([]),
            getFormInputs: (inputs, trs) => do {
                true;
            }
        },
        long_text: {
            title: 'long text',
            renderFormBrowse: data => JS.render.keyValuesBodyLines([]),
            renderFormEdit: data => JS.render.keyValuesBodyLines([]),
            getFormInputs: (inputs, trs) => do {
                true;
            }
        },
        number: {
            title: 'number',
            renderFormBrowse: data => JS.render.keyValuesBodyLines([]),
            renderFormEdit: data => JS.render.keyValuesBodyLines([]),
            getFormInputs: (inputs, trs) => do {
                true;
            }
        },
        single_select: {
            title: 'single select',
            renderFormBrowse: data => JS.render.keyValuesBodyLines([]),
            renderFormEdit: data => JS.render.keyValuesBodyLines([]),
            getFormInputs: (inputs, trs) => do {
                true;
            }
        },

        group: {
            title: 'group',
            renderFormBrowse: renderFormBrowseComplex,
            renderFormEdit: renderFormEditComplex,
            getFormInputs: getFormInputsComplex
        },
        form: {
            title: 'form',
            renderFormBrowse: renderFormBrowseComplex,
            renderFormEdit: renderFormEditComplex,
            getFormInputs: getFormInputsComplex
        },
        table: {
            title: 'table',
            renderFormBrowse: renderFormBrowseComplex,
            renderFormEdit: renderFormEditComplex,
            getFormInputs: getFormInputsComplex
        }
    };
});