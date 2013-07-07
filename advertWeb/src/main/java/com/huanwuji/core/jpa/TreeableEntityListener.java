package com.huanwuji.core.jpa;

import com.huanwuji.entity.Treeable;
import com.huanwuji.service.TreeableService;
import com.huanwuji.utils.SpringContextHolder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.PrePersist;
import javax.persistence.PreRemove;
import javax.persistence.PreUpdate;

/**
 * Created with IntelliJ IDEA.
 * <p/>
 * User: huanwuji
 * Date: 12-12-14
 * Time: 下午9:09
 * To change this template use File | Settings | File Templates.
 */
public class TreeableEntityListener<T> {

    private TreeableService treeableService;

    private static final Logger LOG = LoggerFactory.getLogger(TreeableEntityListener.class);

    /**
     * Sets modification and creation date and auditor on the target object in case it implements {@link org.springframework.data.domain.Auditable} on
     * persist events.
     *
     * @param target
     */
    @PrePersist
    public void touchForCreate(Object target) {

        if (!(target instanceof Treeable)) {
            return;
        }
        init();
        treeableService.prePersist((Treeable) target);
        LOG.debug("Touched {} - create treeId by {}", new Object[]{target});
    }

    /**
     * Sets modification and creation date and auditor on the target object in case it implements {@link org.springframework.data.domain.Auditable} on
     * update events.
     *
     * @param target
     */
    @PreUpdate
    public void touchForUpdate(Object target) {
        init();
    }

    @PreRemove
    public void touchForRemove(Object target) {
        if (!(target instanceof Treeable)) {
            return;
        }
        init();
        treeableService.preRemove((Treeable) target);

        LOG.debug("Touched {} - update parent isLeaf by {}", new Object[]{target});
    }

    private void init() {
        treeableService = SpringContextHolder.getBean(TreeableService.class);
        LOG.info("初始化" + treeableService);
    }
}
