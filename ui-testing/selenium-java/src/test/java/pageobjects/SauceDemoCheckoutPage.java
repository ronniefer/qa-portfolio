package pageobjects;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class SauceDemoCheckoutPage extends AbstractPage {

    public final static By pageHeader = By.className("title");
    public final static By firstameInput = By.id("first-name");
    public final static By lastnameInput = By.id("last-name");
    public final static By zipcodeInput = By.id("postal-code");
    public final static By continueButton = By.id("continue");
    public final static By finishButton = By.id("finish");
    public final static By homeButton = By.id("back-to-products");

    public SauceDemoCheckoutPage(WebDriver driver) {
        super(driver);
    }

    public String getHeaderText() {
        getWait().until(ExpectedConditions.visibilityOfElementLocated(pageHeader));
        return getDriver().findElement(pageHeader).getText();
    }

    public void enterInfo(String firstname, String lastname, String zipcode) {
        getWait().until(ExpectedConditions.visibilityOfElementLocated(continueButton));
        getDriver().findElement(firstameInput).sendKeys(firstname);
        getDriver().findElement(lastnameInput).sendKeys(lastname);
        getDriver().findElement(zipcodeInput).sendKeys(zipcode);
        getDriver().findElement(continueButton).click();
    }
}
