package com.puppet.demo.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document( collection = "contacts" )
public class Contact {

    @Id
    private String id;
    private String name;
    private String email;
    private String phone;

}
