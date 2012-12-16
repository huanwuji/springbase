package com.huanwuji.controller;

import com.huanwuji.entity.bean.Menu;
import com.huanwuji.repository.MenuRepository;
import com.huanwuji.service.MenuService;
import com.huanwuji.utils.flexJson.FlexJsonUtils;
import com.huanwuji.utils.flexJson.SimpleObjectTransformer;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;
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

    @RequestMapping("list")
    public ResponseEntity<?> list(Model model, String $callback) {
        List<Menu> list = menuService.getMenus();

        StringBuilder jsonp = new StringBuilder();
        jsonp.append($callback).append("({\"d\":{\"result\":");
        FlexJsonUtils.getJSONSerializer(new SimpleObjectTransformer().addPropertyFilter("*", true)).exclude("*.class").serialize(list, jsonp);
        jsonp.append(",\"__count\" : \"830\"}})");
        return new ResponseEntity(jsonp.toString(), HttpStatus.OK);
    }

    @RequestMapping("view")
    public String view(Model model, Long id) {
        Menu menu = menuRepository.findOne(id);
        model.addAttribute("bean", menu);
        return "menu/view";
    }

    @RequestMapping(value = "create", method = RequestMethod.GET)
    public String create(Model model) {
        Menu menu = new Menu();
        model.addAttribute("bean", menu);
        return "menu/input";
    }

    @RequestMapping(value = "create", method = RequestMethod.POST)
    public String create(Model model, Menu menu) {
        menuRepository.save(menu);
        return "menu/input";
    }

    @RequestMapping(value = "update/{id}", method = RequestMethod.GET)
    public String update(Model model, @PathVariable("id") Long id) {
        Menu menu = menuRepository.findOne(id);
        model.addAttribute("bean", menu);
        return "menu/input";
    }

    @RequestMapping(value = "update", method = RequestMethod.POST)
    public void update(Model model, Menu menu) {
        Menu dbMenu = menuRepository.findOne(menu.getId());
        BeanUtils.copyProperties(menu, dbMenu, new String[]{Menu.ID, Menu.IS_LEAF, Menu.PARENT, Menu.IS_LEAF});
        menuRepository.save(menu);
    }

    @RequestMapping(value = "save")
    public void save(@Valid Menu menu) {
        if (!menu.isNew()) {
            Menu dbMenu = menuRepository.findOne(menu.getId());
            BeanUtils.copyProperties(menu, dbMenu, new String[]{Menu.ID, Menu.IS_LEAF, Menu.PARENT, Menu.IS_LEAF});
            menu = dbMenu;
        }
        menuRepository.save(menu);
    }

    @RequestMapping("grid")
    public String grid(Model model) {
        return "menu/grid";
    }

    @RequestMapping("gridData")
    public String gridData(Model model) {
        return "menu/grid";
    }
}
