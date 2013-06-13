package com.huanwuji.utils.codeBatchCreate;

import com.huanwuji.utils.codeCreate.pdm.PdmModel;
import com.huanwuji.utils.codeCreate.pdm.PdmParse;
import com.huanwuji.utils.codeCreate.pdm.Table;
import org.dom4j.DocumentException;

/**
 * Created with IntelliJ IDEA.
 * <p/>
 * User: huanwuji
 * Date: 12-9-2
 * Time: 下午1:00
 * To change this template use File | Settings | File Templates.
 */
public class PdmParseTest {

    public static void main(String[] args) throws DocumentException {

        PdmParse parse = new PdmParse();
//      Tables tables =   parse.parsePdm("D:\\git\\springbase\\src\\test\\com\\huanwuji\\tools\\codeBatchCreate\\PhysicalDataModel_1.xml");
        PdmModel tables = parse.parsePdm("D:\\git\\springbase\\src\\test\\java\\com\\huanwuji\\utils\\codeBatchCreate\\baseProject.pdm");
//        PdmModel tables = parse.parsePdm("E:\\git\\springbase\\src\\test\\com\\huanwuji\\tools\\codeBatchCreate\\pagd_share.pdm");
//        Tables tables = parse.parsePdm("E:\\git\\springbase\\src\\test\\com\\huanwuji\\tools\\codeBatchCreate\\sjjjw.pdm");
        for (Table table : tables.getTables()) {
            System.out.println("table.getName() = " + table.getName());
            System.out.println("table.getCode() = " + table.getCode());
        }
    }

}
