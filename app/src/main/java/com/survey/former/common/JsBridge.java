package com.survey.former.common;

import android.webkit.JavascriptInterface;

import com.alibaba.fastjson.JSON;
import com.survey.former.entity.KeyValueItem;

import org.litepal.LitePal;

import java.util.ArrayList;
import java.util.List;

public class JsBridge {
    public static final String H5_HOME_URL = "file:///android_asset/former-prototype.h5/template/index.html";
    public static final String BRIDGE_NAME = "JsBridge";

    private static JsBridge instance = new JsBridge();

    public static JsBridge getInstance() {
        return instance;
    }

    private JsBridge() {
    }

    @JavascriptInterface
    public String allKeys() {
        List<KeyValueItem> items = LitePal
                .select("key")
                .order("id")
                .find(KeyValueItem.class);

        List<String> keys = new ArrayList();
        for (KeyValueItem item : items) {
            keys.add(item.getKey());
        }

        return JSON.toJSONString(keys);
    }

    @JavascriptInterface
    public String findValue(String key) {
        KeyValueItem item = LitePal
                .where("key = ?", key)
                .order("id")
                .findFirst(KeyValueItem.class);
        return item == null ? null : item.getValue();
    }

    @JavascriptInterface
    public long saveValue(String key, String value) {

        KeyValueItem item = LitePal
                .where("key = ?", key)
                .order("id")
                .findFirst(KeyValueItem.class);

        if (item == null) {
            item = new KeyValueItem();
            item.setKey(key);
        }
        item.setValue(value);
        item.save();

        return item.getId();
    }

    @JavascriptInterface
    public boolean removeValue(String key) {
        List<KeyValueItem> items = LitePal
                .where("key = ?", key)
                .limit(1)
                .find(KeyValueItem.class);
        if (items.size() == 1) {
            items.get(0).delete();
            return true;
        } else {
            return false;
        }
    }
}
