
'use strict';

JS.data_samples = {
    papers: {
        list: [{
            id: 0,
            title: '问卷1',
            description: '阿斯顿法1234',
            create_time: 1532425936621,
            update_time: 1532425936621
        }, {
            id: 1,
            title: '问卷2',
            description: '全网热1234',
            create_time: 1532425936621,
            update_time: 1532425936621
        }, {
            id: 2,
            title: '问卷3',
            description: '士大夫国1234',
            create_time: 1532425936621,
            update_time: 1532425936621
        }, {
            id: 3,
            title: '问卷4',
            description: '阿斯顿法2345',
            create_time: 1532425936621,
            update_time: 1532425936621
        }, {
            id: 4,
            title: '问卷5',
            description: '为儿童1234',
            create_time: 1532425936621,
            update_time: 1532425936621
        }]
    },
    records: {
        list: [{
            id: 0,
            paper_id: 0,
            title: '记录1-1',
            description: '阿斯顿法1234',
            create_time: 1532425936621,
            update_time: 1532425936621
        }, {
            id: 1,
            paper_id: 1,
            title: '记录2-1',
            description: '全网热1234',
            create_time: 1532425936621,
            update_time: 1532425936621
        }, {
            id: 2,
            paper_id: 3,
            title: '记录4-1',
            description: '士大夫国1234',
            create_time: 1532425936621,
            update_time: 1532425936621
        }, {
            id: 3,
            paper_id: 3,
            title: '记录4-2',
            description: '阿斯顿法2345',
            create_time: 1532425936621,
            update_time: 1532425936621
        }]
    },
    paper: {
        "id": 0,
        "title": "示例1",
        "description": "第一个示例问卷，作辅助开发用",
        "create_time": 1529850045879,
        "update_time": 1529850045879,
        "data": {
            "type": "form",
            "fields": [{
                "id": "basic",
                "title": "基本信息",
                "type": "group",
                "fields": [{
                    "id": "name",
                    "title": "姓名",
                    "type": "short_text",
                    "placeholder": "姓名",
                    "default": "张三"
                }, {
                    "id": "gender",
                    "title": "性别",
                    "type": "single_select",
                    "range": [{
                        "id": "male",
                        "title": "男"
                    }, {
                        "id": "female",
                        "title": "女"
                    }],
                    "default": "male"
                }, {
                    "id": "age",
                    "title": "年龄",
                    "type": "number",
                    "default": 100
                }, {
                    "id": "self_intro",
                    "title": "自我介绍",
                    "type": "long_text",
                    "default": "I hate the world!"
                }]
            }]
        }
    }
};
