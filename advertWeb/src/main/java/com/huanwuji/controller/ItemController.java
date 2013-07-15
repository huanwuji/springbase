package com.huanwuji.controller;

import com.huanwuji.entity.bean.Item;
import com.huanwuji.entity.bean.SystemCode;
import com.huanwuji.entity.query.QEntry;
import com.huanwuji.json.flexjson.FlexJsonTools;
import com.huanwuji.json.flexjson.impl.SimpleObjectTransformer;
import com.huanwuji.repository.ItemRepository;
import com.huanwuji.repository.SystemCodeRepository;
import com.huanwuji.service.ItemService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 *
 */
@RequestMapping("/item")
@Controller
public class ItemController extends BaseController {

    @Autowired
    private ItemService itemService;
    @Autowired
    private ItemRepository itemRepository;
    @Autowired
    private SystemCodeRepository systemCodeRepository;

    @RequestMapping(value = "/{cid}/{fkId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Page<Item> list(@PathVariable("cid") Long cid, int page, int size) {
        return itemService.findAll(cid, new PageRequest(page - 1, size));
    }

    @RequestMapping(value = "/{cid}/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> get(@PathVariable("cid") Long cid, @PathVariable("id") Long id) {
        Item item = itemRepository.findOne(id);
        if (item == null) {
            item = new Item();
        }
        String json = FlexJsonTools.getJSONSerializer(
                new SimpleObjectTransformer().addPropertyFilter("*", true)).exclude("*.class").serialize(item);
        return new ResponseEntity<String>(json, HttpStatus.OK);
    }

    @RequestMapping(value = "/{cid}/{id}", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void save(@RequestBody Item item,
                     @PathVariable("cid") Long cid, @PathVariable("id") Long id) {
        Item dbItem = itemRepository.findOne(id);
        if (dbItem == null) {
            SystemCode systemCode = systemCodeRepository.findOne(cid);
            item.setCategory(systemCode);
        } else {
            BeanUtils.copyProperties(item, dbItem, new String[]{QEntry.ID});
            item = dbItem;
        }
        itemRepository.save(item);
    }

    @RequestMapping(value = "/{key}/{fkId}/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("id") Long id) {
        itemRepository.delete(id);
    }
}
