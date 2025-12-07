package com.puppet.demo.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender javaMailSender;

    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendEmail( String to, String name ) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom("noreplyplanora@gmail.com", "Planora Support");
            helper.setTo(to);
            helper.setSubject("Thanks for contacting Planora!");

            String html = """
                <div style="font-family: 'Segoe UI', Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 20px;">
                  <div style="max-width: 600px; margin: auto; background: white; border-radius: 10px; padding: 30px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
                    <h2 style="color: #0078d7;">Hi %s,</h2>
                    <p>Thank you for reaching out to <strong>Planora</strong>! 🌍</p>
                    <p>We’ve received your message and our team will get back to you shortly.</p>
                    <p style="margin-top: 20px;">Meanwhile, feel free to explore our platform for travel ideas and route planning insights.</p>

                    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

                    <p style="font-size: 14px; color: #777;">
                      Warm regards,<br>
                      <strong>Team Planora</strong><br>
                      <a href="https://planora.com" style="color: #0078d7; text-decoration: none;">planora.com</a>
                    </p>
                  </div>
                </div>
                """.formatted(name);

            helper.setText(html, true);
            javaMailSender.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email", e);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
