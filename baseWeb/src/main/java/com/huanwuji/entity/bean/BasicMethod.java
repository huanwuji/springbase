package com.huanwuji.entity.bean;

import com.huanwuji.utils.flexJson.FlexJsonUtils;
import com.huanwuji.utils.flexJson.PropertyProcesser;
import com.huanwuji.utils.flexJson.SimpleObjectTransformer;
import flexjson.BeanProperty;
import flexjson.JSONContext;
import flexjson.Path;
import flexjson.TypeContext;

/**
 * Created with IntelliJ IDEA.
 * <p/>
 * User: juyee
 * Date: 12-9-7
 * Time: 下午2:44
 * To change this template use File | Settings | File Templates.
 */
public class BasicMethod extends IdEntity {

    private int hashCode = Integer.MIN_VALUE;

    public int hashCode() {
        if (Integer.MIN_VALUE == this.hashCode) {
            if (null == this.getId()) return super.hashCode();
            else {
                String hashStr = this.getClass().getName() + ":" + this.getId().hashCode();
                this.hashCode = hashStr.hashCode();
            }
        }
        return this.hashCode;
    }

    public boolean equals(Object obj) {
        if (null == obj) return false;
        if (!(obj.getClass().equals(this.getClass()))) return false;
        else {
            IdEntity idEntity = (IdEntity) obj;
            return !(null == this.getId() || null == idEntity.getId()) && (this.getId().equals(idEntity.getId()));
        }
    }

    public String toString() {
        SimpleObjectTransformer simpleObjectTransformer = new SimpleObjectTransformer()
                .addPropertyProcesser("", new PropertyProcesser() {
                    @Override
                    public Object propertyProcesser(BeanProperty prop, Object value, Path path, Object object, JSONContext context, TypeContext typeContext) {
                        if (value == null || prop.getPropertyType().getName().startsWith("java")) {
                            return value;
                        }
                        return ((IdEntity) value).getId();
                    }
                });
        return FlexJsonUtils.getJSONSerializer(simpleObjectTransformer).serialize(this);
    }
}
