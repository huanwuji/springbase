package java.com.huanwuji.utils;

import com.huanwuji.entity.bean.Example;

/**
 * Created with IntelliJ IDEA.
 * <p/>
 * User: juyee
 * Date: 12-9-7
 * Time: 下午3:00
 * To change this template use File | Settings | File Templates.
 */
public class BasicMethodTest {

    public static void main(String[] args) {
        Example example = new Example();
        example.setId(333L);
        example.setText("fjkj");

        Example example1 = new Example();
        example1.setId(333L);
        example1.setText("fjkj");

        System.out.println("example1.equals(example) = " + example1.hashCode() + "  " + example.hashCode());
        System.out.println("example.toString() = " + example.toString());
    }
}
