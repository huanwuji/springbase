package com.huanwuji.controller;

import com.huanwuji.entity.bean.Menu;
import com.huanwuji.entity.query.QMenu;
import com.huanwuji.json.flexjson.FlexJsonTools;
import com.huanwuji.json.flexjson.impl.SimpleObjectTransformer;
import com.huanwuji.repository.MenuRepository;
import com.huanwuji.service.MenuService;
import com.huanwuji.utils.ControllerUtils;
import flexjson.JSONSerializer;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
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
public class MenuController {

    @Autowired
    private MenuService menuService;
    @Autowired
    private MenuRepository menuRepository;

    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Object list(HttpServletRequest request) {
        return ControllerUtils.getResult(request, menuRepository, Menu.class);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE, params = "resultType=tree")
    public ResponseEntity<String> getChildren(@PathVariable("id") Long id) {
        List<Menu> list;
        if (id == 0) {
            list = menuService.getRoot();
        } else {
            list = menuService.getChildren(id);
        }
        String json = FlexJsonTools
                .getJSONSerializer(new SimpleObjectTransformer()
                        .addPropertyFilter("*", true)).exclude("*.class").serialize(list);
        return new ResponseEntity<String>(json, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> get(@PathVariable("id") Long id) {
        Menu menu = menuRepository.findOne(id);
        String json = new JSONSerializer().exclude("parent", "*.class").serialize(menu);
        return new ResponseEntity<String>(json, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}/{parentId}", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void save(@RequestBody Menu menu, @PathVariable("id") Long id, @PathVariable("parentId") Long parentId) {
        if (id > 0) {
            Menu dbMenu = menuRepository.findOne(menu.getId());
            BeanUtils.copyProperties(menu, dbMenu, new String[]{QMenu.ID, QMenu.LEAF, QMenu.PARENT, QMenu.LEAF});
            menu = dbMenu;
        }
        if (parentId > 0) {
            Menu parent = menuRepository.findOne(parentId);
            menu.setParent(parent);
        }
        menuRepository.save(menu);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("id") Long id) {
        menuRepository.delete(id);
    }
}
