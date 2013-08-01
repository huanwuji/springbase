package com.huanwuji.utils;

import com.huanwuji.search.SearchUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.math.NumberUtils;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import javax.servlet.http.HttpServletRequest;

/**
 * description:.
 * User: huanwuji
 * create: 13-8-1 下午10:08
 */
public class ControllerUtils {

    public static Pageable getPageRequest(HttpServletRequest request, Sort sort) {
        String page = request.getParameter("page");
        String size = request.getParameter("size");
        if (StringUtils.isNotEmpty(page) && StringUtils.isNotEmpty(size)) {
            int _size = NumberUtils.createInteger(size);
            if (_size < 1) {
                _size = 1;
            }
            return new PageRequest(NumberUtils.createInteger(page) - 1, _size, sort);
        }
        return null;
    }

    public static <T> Object getResult(HttpServletRequest request, JpaSpecificationExecutor<T> executor, Class<T> type) {
        SearchUtils.JpaQueryConditions<T> conditions =
                SearchUtils.searchProcess(request, type);
        Specification<T> specification = conditions.getSearches();
        Sort sort = conditions.getSorts();
        Pageable pageable = ControllerUtils.getPageRequest(request, sort);
        if (pageable != null) {
            return executor.findAll(specification, pageable);
        } else {
            if (sort != null) {
                return executor.findAll(specification, sort);
            } else {
                return executor.findAll(specification);
            }
        }

    }
}
