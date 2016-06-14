package com.heartgit;

import android.os.Bundle;
import android.os.PersistableBundle;
import android.view.View;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactPackage;
import com.facebook.react.ReactRootView;
import com.facebook.react.shell.MainReactPackage;
import com.heartgit.common.MyReactActivity;

import java.util.Arrays;
import java.util.List;

public class MainActivity extends MyReactActivity{

    @Override
    protected Boolean setReactContentView(View view) {
        setContentView(R.layout.main_layout);
        return false;
    }

    @Override
    protected ReactRootView createRootView() {
        return (ReactRootView) findViewById(R.id.react_root);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "heartgit";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            new MainReactPackage()
        );
    }




}
