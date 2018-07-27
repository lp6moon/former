package com.survey.former.common;


import android.app.Application;
import android.content.Context;
import android.support.annotation.NonNull;

import com.orhanobut.logger.AndroidLogAdapter;
import com.orhanobut.logger.Logger;

import org.litepal.LitePal;

public class BaseApplication extends Application {

    @NonNull
    public static Context getContext() {
        return BaseApplication.context;
    }

    private static Context context;

    @Override
    public void onCreate() {
        super.onCreate();
        BaseApplication.context = this;
        Logger.addLogAdapter(new AndroidLogAdapter());
        LitePal.initialize(this);
    }
}
