package com.huanwuji.service;

import org.junit.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * description:.
 * User: huanwuji
 * create: 13-10-13 下午8:10
 */
public class PasswordEncoderTest {
    @Test
    public void testEncoderPassword() throws Exception {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String password = encoder.encode("admin?123A");
        System.out.println("password = " + password);
    }
}
