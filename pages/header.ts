import { Locator, Page} from "@playwright/test";
import { Methods } from "./methods";

export class Header extends Methods {
    private logoLink: Locator;
    private logoLinkTransparent: Locator;
    private logoLinkPrimary: Locator;
    private searchLink: Locator;
    private accountLink: Locator;
    private cartLink: Locator;

    constructor (page: Page){
        super(page);
        this.logoLink = page.locator('.Header__LogoLink');
        this.logoLinkTransparent = page.locator('Header__LogoImage--transparent');
        this.logoLinkPrimary = page.locator('.Header__LogoImage--primary');
        this.searchLink = page.locator('a[data-action="toggle-search"].Heading.Link');
        this.accountLink = page.locator('a[href="/account"].Heading.Link.Link--primary.Text--subdued.u-h8');
        this.cartLink = page.locator('.Heading.u-h6[data-drawer-id="sidebar-cart"]');
    }

    async verifyLogoLink() {
        await this.verifyVisible(this.logoLink);
        await this.verifyAttribute(this.logoLink, 'href', '/');
    }

    async verifyLogoLinkTransparent() {
        await this.verifyVisible(this.logoLinkTransparent);
        await this.verifyAttribute(this.logoLinkTransparent, 'alt', 'The Connected Shop Logo White');
    }

    async verifyLogoLinkPrimary() {
        await this.verifyVisible(this.logoLinkPrimary);
        await this.verifyAttribute(this.logoLinkPrimary, 'alt', 'The Connected Shop Logo');
    }

    async verifySearchLink() {
        await this.verifyVisible(this.searchLink);
        await this.verifyAttribute(this.searchLink, 'href', '/search');
        await this.verifyText(this.searchLink, 'Search');
    }

    async verifyAccountLink() {
        await this.verifyVisible(this.accountLink);
        await this.verifyAttribute(this.accountLink, 'href', '/account');
        await this.verifyText(this.accountLink, 'Account');
    }

    async verifyCartLink() {
        await this.verifyVisible(this.cartLink);
        await this.verifyAttribute(this.cartLink, 'href', '/cart');
        await this.verifyText(this.cartLink, 'Open cart');
    }
}