package com.example.litter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@SpringBootApplication
public class LitterApplication {
    public static void main(String[] args) {
        SpringApplication.run(LitterApplication.class, args);

    }

}
