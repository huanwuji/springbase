package com.huanwuji.json.flexjson.impl;

import com.huanwuji.json.flexjson.ObjectProcesser;
import flexjson.JSONContext;
import flexjson.Path;
import flexjson.TypeContext;
import flexjson.transformer.TransformerWrapper;
import org.apache.commons.beanutils.BeanUtils;

import java.lang.reflect.InvocationTargetException;

/**
 * Created with IntelliJ IDEA.
 * <p/>
 * User: juyee
 * Date: 12-9-5
 * Time: 上午10:37
 * To change this template use File | Settings | File Templates.
 */
public class BasicObjectProcesser implements ObjectProcesser {

    private String[] propPaths;

    public BasicObjectProcesser(String... propertyPath) {
        this.propPaths = propertyPath;
    }

    public void objectProcesser(Object object, Path path, JSONContext context, TypeContext typeContext) {
        if (propPaths != null && propPaths.length > 0) {
            for (String propPath : propPaths) {
                String value = null;
                try {
                    value = BeanUtils.getProperty(object, propPath);
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                } catch (InvocationTargetException e) {
                    e.printStackTrace();
                } catch (NoSuchMethodException e) {
                    e.printStackTrace();
                }

                TransformerWrapper transformer = (TransformerWrapper) context.getTransformer(value);

                if (!transformer.isInline()) {
                    if (!typeContext.isFirst()) context.writeComma();
                    typeContext.setFirst(false);
                    context.writeName(propPath);
                }
                typeContext.setPropertyName(propPath);

                transformer.transform(value);
            }
        }
    }
}
