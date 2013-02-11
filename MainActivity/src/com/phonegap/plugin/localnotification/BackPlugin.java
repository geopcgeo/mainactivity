package com.phonegap.plugin.localnotification;

import org.apache.cordova.api.Plugin;
import org.apache.cordova.api.PluginResult;
import org.json.JSONArray;



public class BackPlugin extends Plugin{

	@Override
	public PluginResult execute(String arg0, JSONArray arg1, String arg2) {
		// TODO Auto-generated method stub
		ctx.getActivity().moveTaskToBack(true);
		return new PluginResult(PluginResult.Status.OK, "success");
	}
}

	

