import { test } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { Header } from "../pages/header";
import { Contacts } from "../pages/contacts";

test.describe("Check contact section", () => {
    let homePage: HomePage;
    let header: Header;
    let contacts: Contacts;

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);
        header = new Header(page);
        contacts = new Contacts(page);
        await homePage.visitSite();
        await header.clickContactLink();
        await contacts.verifyContactUsTitle();
        await contacts.verifyNameField();
        await contacts.verifyEmailField();
        await contacts.verifyPhoneField();
        await contacts.verifyMessageField();
        await contacts.verifySubmitButton();
    })

    test("Check contact us form with valid data", async ({page}) => {
        await contacts.fillNameField('Random Name');
        await contacts.fillEmailField('random@email.com');
        await contacts.fillPhoneField('123456789');
        await contacts.fillMessageField('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore etdoloremagnaaliqua.');
        await contacts.clickSubmitButton();
        //await contacts.verifySuccessMessage();
    })

    test("Check error message for empty name field", async ({page}) => {
        await contacts.clickSubmitButton();
        await contacts.verifyNameFieldErrorMessage();
    })

    test("Check error message for empty email field", async ({page}) => {
        await contacts.fillNameField('Random Name');
        await contacts.clickSubmitButton();
        await contacts.verifyErrorMessageForEmptyEmail();
    })

    test("Check error message for email without at", async ({page}) => {
        await contacts.fillNameField('Random Name');
        await contacts.fillEmailField('B');
        await contacts.clickSubmitButton();
        await contacts.verifyErrorMessageForEmailWOAt('B');
    })

    test("Check error message for email with wrong dot", async ({page}) => {
        await contacts.fillNameField('Random Name');
        await contacts.fillEmailField('B@.');
        await contacts.clickSubmitButton();
        await contacts.verifyErrorMessageForEmailWithWrongDot();
    })

    test("Check error message for email without domain", async ({page}) => {
        await contacts.fillNameField('Random Name');
        await contacts.fillEmailField('B@');
        await contacts.clickSubmitButton();
        await contacts.verifyErrorMessageForEmailWODomain('B@');
    })

    test("Check error message for email with two ats", async ({page}) => {
        await contacts.fillNameField('Random Name');
        await contacts.fillEmailField('B@B@');
        await contacts.clickSubmitButton();
        await contacts.verifyErrorMessageForEmailWithTwoAts();
    })

    test("Check error message for empty phone field", async ({page}) => {
        await contacts.fillNameField('Random Name');
        await contacts.fillEmailField('random@email.com');
        await contacts.clickSubmitButton();
        await contacts.verifyPhoneFieldErrorMessage();
    })

    test("Check error message for empty message field", async ({page}) => {
        await contacts.fillNameField('Random Name');
        await contacts.fillEmailField('random@email.com');
        await contacts.fillPhoneField('123456789');
        await contacts.clickSubmitButton();
        await contacts.verifyMessageFieldErrorMessage();
    })

})