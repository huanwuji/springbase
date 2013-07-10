package com.huanwuji.controller;

import com.huanwuji.entity.bean.Entry;
import com.huanwuji.entity.query.QEntry;
import com.huanwuji.json.flexjson.FlexJsonTools;
import com.huanwuji.json.flexjson.impl.SimpleObjectTransformer;
import com.huanwuji.lang.KeyTools;
import com.huanwuji.repository.EntryRepository;
import com.huanwuji.service.EntryService;
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
@RequestMapping("/entry")
@Controller
public class EntryController extends BaseController {

    @Autowired
    private EntryService entryService;

    @Autowired
    private EntryRepository entryRepository;

    @RequestMapping(value = "/{key}/{fkId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Page<Entry> list(@PathVariable("key") String key,
                            @PathVariable("fkId") Long fkId, int page, int size) {
        return entryService.findAll(KeyTools.getFk(key, fkId), new PageRequest(page - 1, size));
    }

    @RequestMapping(value = "/{key}/{fkId}/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> get(@PathVariable("id") Long id) {
        Entry entry = entryRepository.findOne(id);
        String json = FlexJsonTools.getJSONSerializer(
                new SimpleObjectTransformer().addPropertyFilter("*", true)).exclude("*.class").serialize(entry);
        return new ResponseEntity<String>(json, HttpStatus.OK);
    }

    @RequestMapping(value = "/{key}/{fkId}/{id}", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void save(@RequestBody Entry entry, @PathVariable("key") String key,
                     @PathVariable("fkId") Long fkId, @PathVariable("id") Long id) {
        if (id > 0) {
            Entry dbEntry = entryRepository.findOne(entry.getId());
            BeanUtils.copyProperties(entry, dbEntry, new String[]{QEntry.ID});
            entry = dbEntry;
        } else {
            entry.setFk(KeyTools.getFk(key, fkId));
        }
        entryRepository.save(entry);
    }

    @RequestMapping(value = "/{key}/{fkId}/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("id") Long id) {
        entryRepository.delete(id);
    }
}
