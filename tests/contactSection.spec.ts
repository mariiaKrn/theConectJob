import {test, expect} from '@playwright/test';

test.describe('Check "Contact us" section', () => {

    let nameField;
    let emailField;
    let phoneField;
    let messageField;
    let buttonSendMessage;
    let nameValue;
    let emailValue;
    let phoneValue;
    let messageValue;

    test.beforeEach(async ({page}) => {
        const buttonContact = page.locator('.HorizontalList a[href="/pages/contact-us"]');
        const contactUsTitle = page.locator('.SectionHeader__Heading');
        nameField = page.locator('[name="contact[name]"]');
        emailField = page.locator('.Form__Item [name="contact[email]"]');
        phoneField = page.locator('[name="contact[Your phone]"]');
        messageField = page.locator('[name="contact[body]"]');
        buttonSendMessage = page.locator('#contact_form .Form__Submit');
        await page.goto('/');
        await expect(buttonContact).toBeVisible;
        await expect(buttonContact).toContainText('Contact');
        await expect(buttonContact).toHaveAttribute('href', '/pages/contact-us');
        await buttonContact.click();
        await expect(contactUsTitle).toBeVisible;
        await expect(contactUsTitle).toHaveText('Contact us');
        await expect(contactUsTitle).toHaveAttribute('class', 'SectionHeader__Heading Heading u-h1');
    })

    test.afterEach(async ({page}) => {
        await page.close();
    })

    test ('Check "Contact us" section with valid data', async ({page}) => {
        //const successMessage = page.locator('.Alert.Alert--success');

        // Setting test values.
        nameValue = 'Random Name';
        emailValue = 'random@email.com';
        phoneValue = '123456789';
        messageValue = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

        // Verifying the "Your Name" field
        await expect(nameField).toBeVisible;
        await expect(nameField).toHaveAttribute('placeholder', 'Your name');
        await nameField.fill(nameValue);
        await expect(nameField).toHaveValue(nameValue);

        // Verifying the "Your email" field
        await expect(emailField).toBeVisible;
        await expect(emailField).toHaveAttribute('placeholder', 'Your email');
        await emailField.fill(emailValue);
        await expect(emailField).toHaveValue(emailValue);

        // Verifying the "Your phone" field
        await expect(phoneField).toBeVisible;
        await expect(phoneField).toHaveAttribute('placeholder', 'Your phone');
        await phoneField.fill(phoneValue);
        await expect(phoneField).toHaveValue(phoneValue);

        // Verifying the "Your message" field
        await expect(messageField).toBeVisible;
        await expect(messageField).toHaveAttribute('placeholder', 'Your message');
        await messageField.fill(messageValue);
        await expect(messageField).toHaveValue(messageValue);
        
        // Verifying button "Send message" and sending the form
        await expect(buttonSendMessage).toBeVisible;
        await expect(buttonSendMessage).toHaveAttribute('type', 'submit');
        await expect(buttonSendMessage).toHaveText('Send message');
        await buttonSendMessage.click();
        //await expect(successMessage).toBeVisible;
        //await expect(successMessage).toHaveText('Your message has been successfully sent.');  // CAPCHA :(
    })

    test ('Check "Contact us" section with invalid data', async ({page}) => {
        let errorMessage;

        // Verifying empty "name" field
        await buttonSendMessage.click();
        errorMessage = await nameField.evaluate(el => el.validationMessage);
        console.log('Browser error message for name field:', errorMessage);
        expect(errorMessage).toBe('Please fill out this field.');

        // Verifying empty "email" field
        await nameField.fill('A');
        await buttonSendMessage.click();
        errorMessage = await emailField.evaluate(el => el.validationMessage);
        console.log('Browser error message for email field:', errorMessage);
        expect(errorMessage).toBe('Please fill out this field.');

        // Verifying invalid "email" field
        await emailField.fill('B');
        await buttonSendMessage.click();
        errorMessage = await emailField.evaluate(el => el.validationMessage);
        console.log('Browser error message for email field:', errorMessage);
        expect(errorMessage).toBe('Please include an \'@\' in the email address. \'B\' is missing an \'@\'.');
        await emailField.fill('B@');
        await buttonSendMessage.click();
        errorMessage = await emailField.evaluate(el => el.validationMessage);
        console.log('Browser error message for email field:', errorMessage);
        expect(errorMessage).toBe('Please enter a part following \'@\'. \'B@\' is incomplete.');
        await emailField.fill('B@.');
        await buttonSendMessage.click();
        errorMessage = await emailField.evaluate(el => el.validationMessage);
        console.log('Browser error message for email field:', errorMessage);
        expect(errorMessage).toBe('\'.\' is used at a wrong position in \'.\'.');
        await emailField.fill('B@C@');
        await buttonSendMessage.click();
        errorMessage = await emailField.evaluate(el => el.validationMessage);
        console.log('Browser error message for email field:', errorMessage);
        expect(errorMessage).toBe('A part following \'@\' should not contain the symbol \'@\'.');

        // Verifying empty "phone" field
        await emailField.fill('B@C.com');
        await buttonSendMessage.click();
        errorMessage = await phoneField.evaluate(el => el.validationMessage);
        console.log('Browser error message for phone field:', errorMessage);
        expect(errorMessage).toBe('Please fill out this field.');

        // Verifying empty "message" field
        await phoneField.fill('123456789');
        await buttonSendMessage.click();
        errorMessage = await messageField.evaluate(el => el.validationMessage);
        console.log('Browser error message for message field:', errorMessage);
        expect(errorMessage).toBe('Please fill out this field.');
    })

})