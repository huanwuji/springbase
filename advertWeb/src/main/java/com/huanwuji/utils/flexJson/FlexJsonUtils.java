package com.huanwuji.utils.flexJson;

import com.huanwuji.utils.flexJson.impl.SimpleObjectTransformer;
import flexjson.JSONSerializer;
import flexjson.TransformerUtil;
import flexjson.transformer.TransformerWrapper;
import flexjson.transformer.TypeTransformerMap;
import org.apache.commons.lang.reflect.FieldUtils;

/**
 * Created with IntelliJ IDEA.
 * <p/>
 * User: juyee
 * Date: 12-9-4
 * Time: 下午4:18
 * To change this template use File | Settings | File Templates.
 */
public class FlexJsonUtils {

    public static JSONSerializer getJSONSerializer(SimpleObjectTransformer simpleObjectTransformer) {
        JSONSerializer jsonSerializer = new JSONSerializer();
        TypeTransformerMap defaultTransformers = TransformerUtil.getDefaultTypeTransformers();
        if (simpleObjectTransformer == null) {
            simpleObjectTransformer = new SimpleObjectTransformer();
        }
        defaultTransformers.put(Object.class, new TransformerWrapper(simpleObjectTransformer));
        TypeTransformerMap typeTransformerMap = new TypeTransformerMap(defaultTransformers);
        try {
            FieldUtils.writeDeclaredField(jsonSerializer, "typeTransformerMap", typeTransformerMap, true);
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }
        return jsonSerializer;
    }
}
