package com.huanwuji.utils;

import com.huanwuji.repository.BaseRepository;
import org.apache.commons.lang3.Validate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;

/**
 * Created by IntelliJ IDEA.
 * <p/>
 * User: huanwuji                                                                                                                 r
 * Date: 12-12-2
 * Time: 下午3:08
 * To change this template use File | Settings | File Templates.
 */
@Component
public class SpringContextUtils implements ApplicationContextAware {

    private static final Logger logger = LoggerFactory.getLogger(SpringContextUtils.class);

    private static ApplicationContext applicationContext = null;

    /**
     * 取得存储在静态变量中的ApplicationContext.
     */
    public static ApplicationContext getApplicationContext() {
        assertContextInjected();
        return applicationContext;
    }

    /**
     * 从静态变量applicationContext中取得Bean, 自动转型为所赋值对象的类型.
     */
    public static <T> T getBean(String name) {
        assertContextInjected();
        return (T) applicationContext.getBean(name);
    }

    /**
     * 从静态变量applicationContext中取得Bean, 自动转型为所赋值对象的类型.
     */
    public static <T> T getBean(Class<T> requiredType) {
        assertContextInjected();
        return applicationContext.getBean(requiredType);
    }

    /**
     * 清除SpringContextHolder中的ApplicationContext为Null.
     */
    public static void clearHolder() {
        logger.debug("清除SpringContextHolder中的ApplicationContext:" + applicationContext);
        applicationContext = null;
    }

    /**
     * 实现ApplicationContextAware接口, 注入Context到静态变量中.
     */
    @Override
    public void setApplicationContext(ApplicationContext applicationContext) {
        logger.debug("注入ApplicationContext到SpringContextHolder:{}", applicationContext);

        if (SpringContextUtils.applicationContext != null) {
            logger.warn("SpringContextHolder中的ApplicationContext被覆盖, 原有ApplicationContext为:"
                    + SpringContextUtils.applicationContext);
        }

        SpringContextUtils.applicationContext = applicationContext; //NOSONAR
    }

    /**
     * 实现DisposableBean接口, 在Context关闭时清理静态变量.
     *
     * @throws Exception Exception
     */
    public void destroy() throws Exception {
        SpringContextUtils.clearHolder();
    }

    /**
     * @return BaseRepository
     */
    public static BaseRepository getBaseRepository() {
        return SpringContextUtils.getBean(BaseRepository.class);
    }

    /**
     * 检查ApplicationContext不为空.
     */
    private static void assertContextInjected() {
        Validate.validState(applicationContext != null,
                "applicaitonContext属性未注入, 请在applicationContext.xml中定义SpringContextHolder.");
    }

}