package com.huanwuji.json.flexjson.impl;

import com.huanwuji.json.flexjson.PropertyProcesser;
import flexjson.BeanProperty;
import flexjson.JSONContext;
import flexjson.Path;
import flexjson.TypeContext;
import org.apache.commons.beanutils.BeanUtils;

import java.lang.reflect.InvocationTargetException;

/**
 * Created with IntelliJ IDEA.
 * <p/>
 * User: juyee
 * Date: 12-9-5
 * Time: 上午11:04
 * To change this template use File | Settings | File Templates.
 */
public class BasicPropertyProcesser implements PropertyProcesser {

    private String propPath;

    public BasicPropertyProcesser(String propertyPath) {
        this.propPath = propertyPath;
    }

    public Object propertyProcesser(BeanProperty prop, Object value, Path path, Object object, JSONContext context, TypeContext typeContext) {
        if (value != null) {
            try {
                value = BeanUtils.getProperty(value, propPath);
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            } catch (NoSuchMethodException e) {
                e.printStackTrace();
            }
        }
        return value;
    }
}
