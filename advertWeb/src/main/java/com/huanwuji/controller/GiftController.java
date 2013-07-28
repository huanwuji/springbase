package com.huanwuji.controller;

import com.huanwuji.entity.bean.Gift;
import com.huanwuji.entity.bean.SystemCode;
import com.huanwuji.entity.query.QEntry;
import com.huanwuji.json.flexjson.FlexJsonTools;
import com.huanwuji.json.flexjson.impl.SimpleObjectTransformer;
import com.huanwuji.repository.GiftRepository;
import com.huanwuji.repository.SystemCodeRepository;
import com.huanwuji.search.SearchUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 *
 */
@RequestMapping("/gift")
@Controller
public class GiftController {
    @Autowired
    private GiftRepository giftRepository;
    @Autowired
    private SystemCodeRepository systemCodeRepository;

    @RequestMapping(value = "/{cid}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Page<Gift> list(@PathVariable("cid") Long cid, HttpServletRequest request, int page, int size) {
        SearchUtils.JpaQueryConditions<Gift> conditions = SearchUtils.searchProcess(request, Gift.class);
        PageRequest pageRequest = new PageRequest(page - 1, size, conditions.getSorts());
        Map<String, Object> extraParams = new HashMap<String, Object>();
        extraParams.put("s-category.id", cid);
        return giftRepository.findAll(conditions.getSearches(), pageRequest);
    }

    @RequestMapping(value = "/{cid}/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> get(@PathVariable("cid") Long cid, @PathVariable("id") Long id) {
        Gift Gift = giftRepository.findOne(id);
        if (Gift == null) {
            Gift = new Gift();
        }
        String json = FlexJsonTools.getJSONSerializer(
                new SimpleObjectTransformer().addPropertyFilter("*", true)).exclude("*.class").serialize(Gift);
        return new ResponseEntity<String>(json, HttpStatus.OK);
    }

    @RequestMapping(value = "/{cid}/{id}", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void save(@RequestBody Gift Gift,
                     @PathVariable("cid") Long cid, @PathVariable("id") Long id) {
        Gift dbGift = giftRepository.findOne(id);
        if (dbGift == null) {
            SystemCode systemCode = systemCodeRepository.findOne(cid);
            Gift.setCategory(systemCode);
        } else {
            BeanUtils.copyProperties(Gift, dbGift, new String[]{QEntry.ID});
            Gift = dbGift;
        }
        giftRepository.save(Gift);
    }

    @RequestMapping(value = "/{cid}/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("id") Long id) {
        giftRepository.delete(id);
    }
}
