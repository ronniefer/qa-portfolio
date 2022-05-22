package pageobjects;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class SauceDemoLoginPage extends AbstractPage {

    public final static By usernameInput = By.id("user-name");
    public final static By passwordInput = By.id("password");
    public final static By loginButton = By.id("login-button");

    public SauceDemoLoginPage(WebDriver driver) {
        super(driver);
    }

    public void loadPage() {
        getDriver().get("https://www.saucedemo.com");
    }

    public void enterCredentials(String username, String password) {
        getWait().until(ExpectedConditions.visibilityOfElementLocated(usernameInput));
        getDriver().findElement(usernameInput).sendKeys(username);
        getDriver().findElement(passwordInput).sendKeys(password);
    }

    public void clickLoginButton() {
        getWait().until(ExpectedConditions.visibilityOfElementLocated(loginButton));
        getDriver().findElement(loginButton).click();
    }
}
