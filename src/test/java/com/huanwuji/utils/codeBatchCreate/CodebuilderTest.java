package com.huanwuji.utils.codeBatchCreate;

import com.huanwuji.utils.codeCreate.CodeBuilder;
import com.huanwuji.utils.codeCreate.pdm.PdmModel;
import com.huanwuji.utils.codeCreate.pdm.PdmParse;
import org.dom4j.DocumentException;

/**
 * Created with IntelliJ IDEA.
 * <p/>
 * User: juyee
 * Date: 12-9-6
 * Time: 上午10:12
 * To change this template use File | Settings | File Templates.
 */
public class CodebuilderTest {

    public static void main(String[] args) throws DocumentException {
        String basePath = "E:\\git\\springbase\\src\\test\\java\\com\\huanwuji\\utils\\codeBatchCreate";
        PdmParse pdmParse = new PdmParse();
        PdmModel pdmModel = pdmParse.parsePdm(basePath + "\\PhysicalDataModel_1.xml");
        CodeBuilder codeBuilder = new CodeBuilder(basePath, pdmModel);
        codeBuilder.setTable("Table_1");
        codeBuilder.createService("\\temp\\ExampleRepository.html"
                , basePath + "\\outPut\\" + codeBuilder.getTable().getClassName() + "Repository.java");
    }
}
