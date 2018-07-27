package com.survey.former.entity;

import org.litepal.annotation.Column;
import org.litepal.crud.LitePalSupport;

public class KeyValueItem extends LitePalSupport {

    public void setKey(String key) {
        this.key = key;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getKey() {

        return key;
    }

    public String getValue() {
        return value;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    private int id;

    @Column(nullable = false, unique = true)
    private String key;

    @Column()
    private String value;
}
