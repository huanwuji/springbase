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
package com.huanwuji.utils.flexJson;

import flexjson.*;
import flexjson.transformer.AbstractTransformer;
import flexjson.transformer.TransformerWrapper;
import org.apache.commons.beanutils.BeanUtils;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

public class SimpleObjectTransformer extends AbstractTransformer {

    private boolean excludeParentObj = true;

    private Pattern excludeClassNameReg = null;

    private Map<String, String[][]> propertyMap = null;

    public void excludeParentObj(boolean excludeParentObj) {
        this.excludeParentObj = excludeParentObj;
    }

    public SimpleObjectTransformer exclude(String reg) {
        excludeClassNameReg = Pattern.compile(reg);
        return this;
    }

    public SimpleObjectTransformer include(String... propertyPaths) {
        if (propertyPaths != null) {
            propertyMap = getPropertyMap();
            if (propertyPaths.length > 0) {
                for (String path : propertyPaths) {
                    int len = propertyPaths.length;
                    String[][] pathArray = new String[len][2];
                    for (int i = 0; i < len; i++) {
                        pathArray[i] = new String[]{path.replaceAll("\\.", ""), path};
                    }
                    //第一层
                    propertyMap.put("[  ]", pathArray);
                }
            }
        }
        return this;
    }


    public SimpleObjectTransformer include(Map<String, String[][]> propertyPathMap) {
        this.propertyMap = getPropertyMap();
        this.propertyMap.putAll(propertyPathMap);
        return this;
    }

    public Map<String, String[][]> getPropertyMap() {
        if (propertyMap == null) {
            propertyMap = new HashMap<String, String[][]>();
        }
        return this.propertyMap;
    }

    public void transform(Object object) {
        JSONContext context = getContext();
        Path path = context.getPath();
        ChainedSet visits = context.getVisits();
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
                    if (context.isIncluded(prop)) {
                        Object value = prop.getValue(object);

                        String propertyType = prop.getPropertyType().getName();
                        if (this.excludeParentObj) {
                            if (!propertyType.startsWith("java")) {
                                path.pop();
                                continue;
                            }
                        }
                        if (this.excludeClassNameReg != null) {
                            if (excludeClassNameReg.matcher(propertyType).find()) {
                                continue;
                            }
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

                if (propertyMap != null) {
                    String[][] currentPaths = this.propertyMap.get(path.toString());
                    if (currentPaths != null) {
                        for (String[] propertyPath : currentPaths) {
                            String value = null;
                            try {
                                value = BeanUtils.getProperty(object, propertyPath[1]);
                            } catch (Exception e) {
                                e.printStackTrace();
                            }
                            TransformerWrapper transformer = (TransformerWrapper) context.getTransformer(value);

                            if (!transformer.isInline()) {
                                if (!typeContext.isFirst()) context.writeComma();
                                typeContext.setFirst(false);
                                context.writeName(propertyPath[0]);
                            }
                            typeContext.setPropertyName(propertyPath[0]);

                            transformer.transform(value);
                        }
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
