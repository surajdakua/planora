package com.puppet.demo.controller;

import com.puppet.demo.entity.Contact;
import com.puppet.demo.service.ContactService;
import com.puppet.demo.service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Logger;

@RestController
@CrossOrigin( origins = "*" )
public class ContactController {

    private final ContactService contactService;
    private final EmailService emailService;
    private final Logger LOG = Logger.getLogger( ContactController.class.getName() );

    public ContactController( ContactService service, EmailService emailService ) {
        this.contactService = service;
        this.emailService = emailService;
    }

    @PostMapping( "/save/contact" )
    public ResponseEntity<Contact> saveContact( @RequestBody Contact contact ) {
        try {
            LOG.info( "Received contact: " + contact );
            Contact savedContact = contactService.saveContact( contact );
            emailService.sendEmail( savedContact.getEmail(), savedContact.getName() );
            return ResponseEntity.ok( savedContact );
        } catch ( Exception e ) {
            LOG.severe( "Error saving contact: " + e.getMessage() );
            return ResponseEntity.status( 500 ).build();
        }
    }

}
