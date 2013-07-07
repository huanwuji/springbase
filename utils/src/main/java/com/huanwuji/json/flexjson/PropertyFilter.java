package com.huanwuji.json.flexjson;

import flexjson.BeanProperty;
import flexjson.JSONContext;
import flexjson.Path;
import flexjson.TypeContext;

/**
 * Created with IntelliJ IDEA.
 * <p/>
 * User: juyee
 * Date: 12-9-5
 * Time: 上午10:09
 * To change this template use File | Settings | File Templates.
 */
public interface PropertyFilter {

    public boolean isFilter(BeanProperty prop, Path path, Object object, JSONContext context, TypeContext typeContext);

}
