package com.huanwuji.controller;

import com.huanwuji.entity.bean.SystemCode;
import com.huanwuji.entity.query.QMenu;
import com.huanwuji.json.flexjson.FlexJsonTools;
import com.huanwuji.json.flexjson.impl.SimpleObjectTransformer;
import com.huanwuji.repository.SystemCodeRepository;
import com.huanwuji.service.SystemCodeService;
import com.huanwuji.service.TreeableService;
import com.huanwuji.utils.ControllerUtils;
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
@RequestMapping("/systemCode")
@Controller
public class SystemCodeController {

    @Autowired
    private SystemCodeService systemCodeService;
    @Autowired
    private SystemCodeRepository systemCodeRepository;
    @Autowired
    private TreeableService treeableService;

    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Object list(HttpServletRequest request) {
        return ControllerUtils.getResult(request, systemCodeRepository, SystemCode.class);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE, params = "resultType=tree")
    public ResponseEntity<String> getChildren(@PathVariable("id") Long id) {
        List<SystemCode> list;
        if (id == 0) {
            list = systemCodeService.getRoot();
        } else {
            list = systemCodeService.getChildren(id);
        }
        String json = FlexJsonTools
                .getJSONSerializer(new SimpleObjectTransformer()
                        .addPropertyFilter("*", true)).exclude("*.class").serialize(list);
        return new ResponseEntity<String>(json, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> get(@PathVariable("id") Long id) {
        SystemCode systemCode = systemCodeRepository.findOne(id);
        String json = FlexJsonTools.getJSONSerializer(
                new SimpleObjectTransformer().addPropertyFilter("*", true)
                        .addPropertyFilter("parent", "parent.id")).exclude("*.class").serialize(systemCode);
        return new ResponseEntity<String>(json, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}/{parentId}", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void save(@RequestBody SystemCode systemCode, @PathVariable("id") Long id, @PathVariable("parentId") Long parentId) {
        if (id > 0) {
            SystemCode dbSystemCode = systemCodeRepository.findOne(systemCode.getId());
            BeanUtils.copyProperties(systemCode, dbSystemCode, new String[]{QMenu.ID, QMenu.LEAF, QMenu.PARENT, QMenu.LEAF});
            systemCode = dbSystemCode;
        }
        if (parentId > 0) {
            SystemCode parent = systemCodeRepository.findOne(parentId);
            systemCode.setParent(parent);
        }
        systemCodeRepository.save(systemCode);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("id") Long id) {
        systemCodeRepository.delete(id);
    }

    @RequestMapping(value = "/swap", method = RequestMethod.GET)
    @ResponseStatus((HttpStatus.NO_CONTENT))
    public void swap(Long id1, Long id2) {
        SystemCode systemCode1 = systemCodeRepository.findOne(id1);
        SystemCode systemCode2 = systemCodeRepository.findOne(id2);
        treeableService.swap(systemCode1, systemCode2);
    }
}
