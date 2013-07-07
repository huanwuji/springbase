package com.huanwuji.json.flexjson;

import flexjson.JSONContext;
import flexjson.Path;
import flexjson.TypeContext;

/**
 * Created with IntelliJ IDEA.
 * <p/>
 * User: juyee
 * Date: 12-9-5
 * Time: 上午9:22
 * To change this template use File | Settings | File Templates.
 */
public interface ObjectProcesser {

    public void objectProcesser(Object object, Path path, JSONContext context, TypeContext typeContext);

}
