package pageobjects;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class SauceDemoCartPage extends AbstractPage {

    public final static By shoppingCart = By.className("shopping_cart_link");
    public final static By pageHeader = By.className("title");
    public final static By checkout = By.id("checkout");

    public SauceDemoCartPage(WebDriver driver) {
        super(driver);
    }

    public String getHeaderText() {
        getWait().until(ExpectedConditions.visibilityOfElementLocated(pageHeader));
        return getDriver().findElement(pageHeader).getText();
    }

    public boolean confirmAdditionToCart(String item) {
        By removeFromCart = By.id("remove-sauce-labs-" + item);
        try {
            getWait().until(ExpectedConditions.visibilityOfElementLocated(removeFromCart));
            return true;
        }
        catch(Exception e) {
            return false;
        }
    }

    public void removeItemFromCart(String item) {
        By removeFromCart = By.id("remove-sauce-labs-" + item);
        getWait().until(ExpectedConditions.visibilityOfElementLocated(removeFromCart));
        getDriver().findElement(removeFromCart).click();
    }

    public boolean confirmRemovalFromCart(String item) {
        By removeFromCart = By.id("remove-sauce-labs-" + item);
        try {
            getWait().until(ExpectedConditions.invisibilityOfElementLocated(removeFromCart));
            return true;
        }
        catch(Exception e) {
            return false;
        }
    }

    public void checkout() {
        getWait().until(ExpectedConditions.visibilityOfElementLocated(checkout));
        getDriver().findElement(checkout).click();
    }
}
