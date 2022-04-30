package pageobjects;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class SauceDemoProductsPage extends AbstractPage {

    public final static By shoppingCart = By.className("shopping_cart_link");
    public final static By pageHeader = By.className("title");

    public SauceDemoProductsPage(WebDriver driver) {
        super(driver);
    }

    public String getHeaderText() {
        getWait().until(ExpectedConditions.visibilityOfElementLocated(pageHeader));
        return getDriver().findElement(pageHeader).getText();
    }

    public void addItemToCart(String item) {
        By addToCart = By.id("add-to-cart-sauce-labs-" + item);
        getWait().until(ExpectedConditions.visibilityOfElementLocated(addToCart));
        getDriver().findElement(addToCart).click();
    }

    public void goToShoppingCart() {
        getWait().until(ExpectedConditions.visibilityOfElementLocated(shoppingCart));
        getDriver().findElement(shoppingCart).click();
    }
}