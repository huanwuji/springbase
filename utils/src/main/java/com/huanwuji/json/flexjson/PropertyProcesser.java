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
 * Time: 上午9:22
 * To change this template use File | Settings | File Templates.
 */
public interface PropertyProcesser {

    public Object propertyProcesser(BeanProperty prop, Object value, Path path, Object object, JSONContext context, TypeContext typeContext);

}
