package com.huanwuji.controller;

import com.huanwuji.entity.bean.Menu;
import com.huanwuji.entity.query.QMenu;
import com.huanwuji.repository.MenuRepository;
import com.huanwuji.service.MenuService;
import com.huanwuji.utils.flexJson.FlexJsonUtils;
import com.huanwuji.utils.flexJson.impl.SimpleObjectTransformer;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * <p/>
 * User: juyee
 * Date: 12-8-3
 * Time: 下午4:49
 * To change this template use File | Settings | File Templates.
 */
@RequestMapping("/menu")
@Controller
public class MenuController extends BaseController {

    @Autowired
    private MenuService menuService;

    @Autowired
    private MenuRepository menuRepository;

    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> list() {
        List<Menu> list = menuService.getMenus();
        String json = FlexJsonUtils
                .getJSONSerializer(new SimpleObjectTransformer()
                        .addPropertyFilter("*", true)).exclude("*.class").serialize(list);
        return new ResponseEntity<String>(json, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> get(@PathVariable("id") Long id) {
        Menu menu = menuRepository.findOne(id);
        String json = FlexJsonUtils.getJSONSerializer(
                new SimpleObjectTransformer().addPropertyFilter("*", true)
                        .addPropertyFilter("parent", "parent.id")).exclude("*.class").serialize(menu);
        return new ResponseEntity<String>(json, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Status> create(Menu menu) {
        menuRepository.save(menu);
        return new ResponseEntity<Status>(new Status(true, String.valueOf(menu.getId())), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Status> update(@RequestBody Menu menu) {
        Menu dbMenu = menuRepository.findOne(menu.getId());
        BeanUtils.copyProperties(menu, dbMenu, new String[]{QMenu.ID, QMenu.LEAF, QMenu.PARENT, QMenu.LEAF});
        menuRepository.save(menu);
        return new ResponseEntity<Status>(new Status(true, String.valueOf(menu.getId())), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Status> remove(@PathVariable("id") Long id, HttpServletResponse response) {
        menuRepository.delete(id);
        return new ResponseEntity<Status>(new Status(true, String.valueOf(id)), HttpStatus.OK);
    }
}
