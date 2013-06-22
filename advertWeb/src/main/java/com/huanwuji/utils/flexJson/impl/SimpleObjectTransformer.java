/**
 * Copyright 2007 Charlie Hubbard and Brandon Goodin
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
 * implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */
package com.huanwuji.utils.flexJson.impl;

import com.huanwuji.utils.flexJson.ObjectProcesser;
import com.huanwuji.utils.flexJson.PropertyFilter;
import com.huanwuji.utils.flexJson.PropertyProcesser;
import flexjson.*;
import flexjson.transformer.AbstractTransformer;
import flexjson.transformer.TransformerWrapper;
import org.apache.commons.lang.StringUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SimpleObjectTransformer extends AbstractTransformer {

    private Map<String, ObjectProcesser> objectProcesserMap = new HashMap<String, ObjectProcesser>();

    private Map<String, PropertyFilter> propertyFilterMap = new HashMap<String, PropertyFilter>();

    private Map<String, PropertyProcesser> propertyProcesserMap = new HashMap<String, PropertyProcesser>();

    //利用flexjson path的概念，对当前路径上的对象，用proputils.getvalue的值路径获取值，到当前路径上
    public SimpleObjectTransformer addObjectProcesser(String path, String... propPaths) {
        objectProcesserMap.put(path, new BasicObjectProcesser(propPaths));
        return this;
    }

    public SimpleObjectTransformer addObjectProcesser(String path, ObjectProcesser objectProcesser) {
        objectProcesserMap.put(path, objectProcesser);
        return this;
    }

    public SimpleObjectTransformer addPropertyFilter(String path, String reg) {
        propertyFilterMap.put(path, new BasicPropertyFilter(reg));
        return this;
    }

    public SimpleObjectTransformer addPropertyFilter(String path, PropertyFilter propertyFilter) {
        propertyFilterMap.put(path, propertyFilter);
        return this;
    }

    //过滤非java包中的值
    public SimpleObjectTransformer addPropertyFilter(String path, boolean filterNotBasicObj) {
        propertyFilterMap.put(path, new BasicPropertyFilter(filterNotBasicObj));
        return this;
    }

    //根据当前的属性全路径，自定义过滤匹配方式，
    public SimpleObjectTransformer addPropertyProcesser(String path, String propPath) {
        propertyProcesserMap.put(path, new BasicPropertyProcesser(propPath));
        return this;
    }

    public SimpleObjectTransformer addPropertyProcesser(String path, PropertyProcesser propertyProcesser) {
        propertyProcesserMap.put(path, propertyProcesser);
        return this;
    }

    public void transform(Object object) {
        JSONContext context = getContext();
        Path path = context.getPath();
        ChainedSet visits = context.getVisits();

        String pathStr = "";
        List<String> pathList = path.getPath();
        if (!pathList.isEmpty()) {
            pathStr = StringUtils.join(pathList, ".");
        }

        try {
            if (!visits.contains(object)) {
                context.setVisits(new ChainedSet(visits));
                context.getVisits().add(object);
                // traverse object
                BeanAnalyzer analyzer = BeanAnalyzer.analyze(resolveClass(object));
                TypeContext typeContext = context.writeOpenObject();
                for (BeanProperty prop : analyzer.getProperties()) {
                    String name = prop.getName();
                    path.enqueue(name);

                    //添加了属性过滤
                    String currPropPath = pathStr + name;
                    PropertyFilter propertyFilter = propertyFilterMap.get(currPropPath);
                    if (propertyFilter == null && propertyProcesserMap.get(currPropPath) == null) {
                        propertyFilter = propertyFilterMap.get("*");
                    }
                    if (propertyFilter != null && propertyFilter.isFilter(prop, path, object, context, typeContext)) {
                        path.pop();
                        continue;
                    }


                    if (context.isIncluded(prop)) {
                        Object value = prop.getValue(object);

                        //添加了属性值的处理
                        PropertyProcesser propertyProcesser = propertyProcesserMap.get(currPropPath);
                        if (propertyProcesser != null) {
                            value = propertyProcesser.propertyProcesser(prop, value, path, object, context, typeContext);
                        }

                        if (!context.getVisits().contains(value)) {

                            TransformerWrapper transformer = (TransformerWrapper) context.getTransformer(value);

                            if (!transformer.isInline()) {
                                if (!typeContext.isFirst()) context.writeComma();
                                typeContext.setFirst(false);
                                context.writeName(name);
                            }
                            typeContext.setPropertyName(name);

                            transformer.transform(value);
                        }
                    }
                    path.pop();
                }
                //添加了对于当前对象的处理
                if (!objectProcesserMap.isEmpty()) {
                    ObjectProcesser objectProcesser = objectProcesserMap.get(pathStr);
                    if (objectProcesser != null) {
                        objectProcesser.objectProcesser(object, path, context, typeContext);
                    }
                }

                context.writeCloseObject();
                context.setVisits((ChainedSet) context.getVisits().getParent());

            }
        } catch (JSONException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
//            throw new JSONException("Error trying to deepSerialize", e);
        }
    }

    protected Class resolveClass(Object obj) {
        return obj.getClass();
    }

}
