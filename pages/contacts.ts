import { Locator, Page, expect} from "@playwright/test";
import { Methods } from "./methods";

export class Contacts extends Methods {
    private contactUsTitle: Locator;
    private nameField: Locator;
    private emailField: Locator;
    private phoneField: Locator;
    private messageField: Locator;
    private buttonSendMessage: Locator;
    private successMessage: Locator;
    private errorMessage: string = '';

    constructor (page: Page) {
        super(page);
        this.contactUsTitle = page.locator('.SectionHeader__Heading');
        this.nameField = page.locator('[name="contact[name]"]');
        this.emailField = page.locator('.Form__Item [name="contact[email]"]');
        this.phoneField = page.locator('[name="contact[Your phone]"]');
        this.messageField = page.locator('[name="contact[body]"]');
        this.buttonSendMessage = page.locator('#contact_form .Form__Submit');
        this.successMessage = page.locator('.Alert.Alert--success');
    }

    async verifyContactUsTitle() {
        await this.verifyVisible(this.contactUsTitle);
        await this.verifyText(this.contactUsTitle, 'Contact us');
        await this.verifyAttribute(this.contactUsTitle, 'class', 'SectionHeader__Heading Heading u-h1');
    }

    async verifyNameField() {
        await this.verifyVisible(this.nameField);
        await this.verifyAttribute(this.nameField, 'placeholder', 'Your name');
        await this.verifyEnabled(this.nameField);
    }

    async verifyEmailField() {
        await this.verifyVisible(this.emailField);
        await this.verifyAttribute(this.emailField, 'placeholder', 'Your email');
        await this.verifyEnabled(this.emailField);
    }

    async verifyPhoneField() {
        await this.verifyVisible(this.phoneField);
        await this.verifyAttribute(this.phoneField, 'placeholder', 'Your phone');
        await this.verifyEnabled(this.phoneField);
    }

    async verifyMessageField() {
        await this.verifyVisible(this.messageField);
        await this.verifyAttribute(this.messageField, 'placeholder', 'Your message');
        await this.verifyEnabled(this.messageField);
    }

    async verifySubmitButton() {
        await this.verifyVisible(this.buttonSendMessage);
        await this.verifyAttribute(this.buttonSendMessage, 'type', 'submit');
        await this.verifyText(this.buttonSendMessage, 'Send message');
    }

    async verifySuccessMessage() {
        await this.verifyVisible(this.successMessage);
        await this.verifyText(this.successMessage, 'Your message has been successfully sent.')
    }

    async verifyNameFieldErrorMessage(): Promise<void> {
        this.errorMessage = await this.nameField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('Browser error message for name field:', this.errorMessage);
        expect(this.errorMessage).toBe('Please fill out this field.');
    }

    async verifyErrorMessageForEmptyEmail(): Promise<void> {
        this.errorMessage = await this.emailField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('Browser error message for name field:', this.errorMessage);
        expect(this.errorMessage).toBe('Please fill out this field.');
    }

    async verifyErrorMessageForEmailWOAt(value: string): Promise<void> {
        this.errorMessage = await this.emailField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('Browser error message for name field:', this.errorMessage);
        expect(this.errorMessage).toBe(`Please include an '@' in the email address. '${value}' is missing an '@'.`);
    }

    async verifyErrorMessageForEmailWithWrongDot(): Promise<void> {
        this.errorMessage = await this.emailField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('Browser error message for name field:', this.errorMessage);
        expect(this.errorMessage).toBe('\'.\' is used at a wrong position in \'.\'.');
    }

    async verifyErrorMessageForEmailWODomain(value: string): Promise<void> {
        this.errorMessage = await this.emailField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('Browser error message for name field:', this.errorMessage);
        expect(this.errorMessage).toBe(`Please enter a part following '@'. '${value}' is incomplete.`);
    }

    async verifyErrorMessageForEmailWithTwoAts(): Promise<void> {
        this.errorMessage = await this.emailField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('Browser error message for name field:', this.errorMessage);
        expect(this.errorMessage).toBe('A part following \'@\' should not contain the symbol \'@\'.');
    }

    async verifyPhoneFieldErrorMessage(): Promise<void> {
        this.errorMessage = await this.phoneField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('Browser error message for name field:', this.errorMessage);
        expect(this.errorMessage).toBe('Please fill out this field.');
    }

    async verifyMessageFieldErrorMessage(): Promise<void> {
        this.errorMessage = await this.messageField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('Browser error message for name field:', this.errorMessage);
        expect(this.errorMessage).toBe('Please fill out this field.');
    }

    async fillNameField(value: string) {
        await this.fillField(this.nameField, value);
    }
    
    async fillEmailField(value: string) {
        await this.fillField(this.emailField, value);
    }

    async fillPhoneField(value: string) {
        await this.fillField(this.phoneField, value);
    }

    async fillMessageField(value: string) {
        await this.fillField(this.messageField, value);
    }

    async clickSubmitButton() {
        await this.click(this.buttonSendMessage);
    }

}