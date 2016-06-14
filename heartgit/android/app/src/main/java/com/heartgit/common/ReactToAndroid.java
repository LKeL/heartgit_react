package com.heartgit.common;


import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

/**
 * Created by heartblood on 16/6/14.
 */
public class ReactToAndroid extends ReactContextBaseJavaModule {

    public ReactToAndroid(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ReactToAndroid";
    }

}
