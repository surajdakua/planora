package com.puppet.demo.service;

import com.puppet.demo.entity.Contact;
import com.puppet.demo.repository.ContactRepository;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    private final ContactRepository contactRepository;

    public ContactService( ContactRepository repository ) {
        this.contactRepository = repository;
    }

    public Contact saveContact( Contact contact ) {
        return contactRepository.save( contact );
    }
}
