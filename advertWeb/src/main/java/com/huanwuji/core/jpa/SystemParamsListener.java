package com.huanwuji.core.jpa;

import com.huanwuji.entity.SystemParams;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.PrePersist;
import javax.persistence.PreRemove;
import javax.persistence.PreUpdate;
import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * <p/>
 * User: huanwuji
 * Date: 12-12-14
 * Time: 下午9:09
 * To change this template use File | Settings | File Templates.
 */
public class SystemParamsListener<T> {


    private static final Logger LOG = LoggerFactory.getLogger(SystemParamsListener.class);

    /**
     * Sets modification and creation date and auditor on the target object in case it implements {@link org.springframework.data.domain.Auditable} on
     * persist events.
     *
     * @param target
     */
    @PrePersist
    public void touchForCreate(Object target) {
        SystemParams systemParams = (SystemParams) target;
        Date now = new Date();
        systemParams.setCreateDate(now);
        systemParams.setModifyDate(now);
        LOG.debug("Touched {} - add SystemParams by {}", new Object[]{target});
    }

    /**
     * Sets modification and creation date and auditor on the target object in case it implements {@link org.springframework.data.domain.Auditable} on
     * update events.
     *
     * @param target
     */
    @PreUpdate
    public void touchForUpdate(Object target) {
        SystemParams systemParams = (SystemParams) target;
        systemParams.setModifyDate(new Date());
    }

    @PreRemove
    public void touchForRemove(Object target) {
        LOG.debug("Touched {} - update parent isLeaf by {}", new Object[]{target});
    }
}
