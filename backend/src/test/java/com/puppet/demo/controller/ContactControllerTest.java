package com.puppet.demo.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.puppet.demo.entity.Contact;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class ContactControllerTest {

    @Autowired
    MockMvc  mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @Test
    public void testSaveContact() throws Exception {

        Contact contact = mockContact();

        mockMvc.perform( post("/save/contact")
                .contentType(MediaType.APPLICATION_JSON)
                .content( objectMapper.writeValueAsString(contact) ))
                .andExpect( status().isOk() )
                .andExpect( jsonPath("$.name").value("John Doe"))
                .andExpect( jsonPath("$.email").value("johndoe@test.com"))
                .andExpect( jsonPath("$.phone").value("8452952362"));
    }

    private Contact mockContact() {

        Contact contact = new Contact();

        contact.setName("John Doe");
        contact.setEmail("johndoe@test.com");
        contact.setPhone("8452952362");

        return contact;

    }
}
