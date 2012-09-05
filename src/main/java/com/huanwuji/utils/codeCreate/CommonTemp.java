package com.huanwuji.utils.codeCreate;

import com.huanwuji.utils.codeCreate.pdm.PdmModel;
import org.bee.tl.core.BeeException;
import org.bee.tl.core.Template;

import java.io.IOException;
import java.io.Writer;

/**
 * Created with IntelliJ IDEA.
 * <p/>
 * User: juyee
 * Date: 12-9-4
 * Time: 上午11:01
 * To change this template use File | Settings | File Templates.
 */
public class CommonTemp {

    private PdmModel pdmModel;

    private Template template;

    public CommonTemp(PdmModel pdmModel, Template template) {
        this.pdmModel = pdmModel;
        this.template.set("pdmModell", pdmModel);
    }

    public void process(Writer writer) {
        this.template.set("pdmModel", pdmModel);
        try {
            this.template.getText(writer);
        } catch (IOException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        } catch (BeeException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
    }
}
