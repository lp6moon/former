(do {
    'use strict';

    JS.form = {
        renderBrowse: data => do {
            let format = JS.formats[data.type];
            $(JS.render.keyValues([
                [JS.translate('type'), JS.translate(format.title)]
            ])).now(table => $(table).bind('tbody').append(
                format.renderFormBrowse(data)
            ));
        },
        renderEdit: data => $(JS.render.keyValues([
            [JS.translate('type'), $.tag('select', {class: 'form-control input input-medium', input: 'type'}).append(
                Object.getOwnPropertyNames(JS.formats).map(type => $.tag('option', {value: type}).text(JS.formats[type].title))
            ).change((e, data) => do {
                let type = $(e.target).val();
                let parent_tr = $(e.target).parents('tr:first').get(0);
                let parent_tbody = $(parent_tr).parents('tbody:first').get(0);
                Array.from($(parent_tbody).children('tr')).filter(tr => tr !== parent_tr).forEach(tr => $(tr).remove());
                let parent_table = $(parent_tbody).parents('table:first').get(0);
                $(parent_tbody).append(
                    $(parent_table).data().special_input_trs = JS.formats[type].renderFormEdit(data)
                );
            })]
        ])).now(table => $(table).find('select[input=type]:first').now(select => do {
            JS.empty(data) || $(select).val(data.type);
            $(select).trigger('change', data);
        })),
        getInputs: (inputs, table) => do {
            let type = $(table).find('select[input=type]:first').val();
            inputs.type = type;
            JS.formats[type].getFormInputs(inputs, $(table).data().special_input_trs);
        }
    }
});