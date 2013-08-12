package com.huanwuji.entity;

import com.huanwuji.json.flexjson.FlexJsonTools;
import com.huanwuji.json.flexjson.impl.SimpleObjectTransformer;

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
        return FlexJsonTools.getJSONSerializer(
                new SimpleObjectTransformer().addPropertyFilter("*", true)).exclude("*.class").serialize(this);
    }
}
