package tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import pageobjects.SauceDemoCheckoutPage;
import pageobjects.SauceDemoLoginPage;
import pageobjects.SauceDemoProductsPage;
import pageobjects.SauceDemoCartPage;

import java.io.FileReader;
import java.io.IOException;
import java.util.Properties;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class PageObjectWebTest {

    private WebDriver driver;
    static String configUser;
    static String configPass;
    protected SauceDemoLoginPage loginPage;
    protected SauceDemoProductsPage productsPage;
    protected SauceDemoCartPage shoppingCartPage;
    protected SauceDemoCheckoutPage checkoutPage;

    @BeforeAll
    static void setupClass() {
        WebDriverManager.chromedriver().version("102.0.5005.61").setup();

        Properties config = new Properties();
        try (FileReader in = new FileReader("config.properties")) {
            config.load(in);
            configUser = config.getProperty("UI_USER");
            configPass = config.getProperty("UI_PASS");
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }

    @BeforeEach
    public void initWebDriver() {
        driver = new ChromeDriver();
    }

    @Test
    @Order(0)
    public void shopSauceDemo() {

        loginPage = new SauceDemoLoginPage(driver);
        loginPage.loadPage();
        loginPage.enterCredentials(configUser, configPass);
        loginPage.clickLoginButton();

        productsPage = new SauceDemoProductsPage(driver);
        assertEquals("PRODUCTS", productsPage.getHeaderText(), "Title text is incorrect");

        productsPage.addItemToCart("backpack");
        productsPage.addItemToCart("onesie");
        productsPage.goToShoppingCart();

        shoppingCartPage = new SauceDemoCartPage(driver);
        assertEquals("YOUR CART", shoppingCartPage.getHeaderText(), "Title text is incorrect");

        assertTrue(shoppingCartPage.confirmAdditionToCart("backpack"));
        assertTrue(shoppingCartPage.confirmAdditionToCart("onesie"));

        shoppingCartPage.removeItemFromCart("backpack");
        assertTrue(shoppingCartPage.confirmRemovalFromCart("backpack"));
        shoppingCartPage.checkout();

        checkoutPage = new SauceDemoCheckoutPage(driver);
        assertEquals("CHECKOUT: YOUR INFORMATION", checkoutPage.getHeaderText(), "Title text is incorrect");
        checkoutPage.enterInfo("John","Smith", "78701");
        assertEquals("CHECKOUT: OVERVIEW", checkoutPage.getHeaderText(), "Title text is incorrect");
        checkoutPage.finishCheckout();
        assertEquals("CHECKOUT: COMPLETE!", checkoutPage.getHeaderText(), "Title text is incorrect");
        checkoutPage.goBackHome();
    }

    @Test
    @Order(1)
    public void loginToSauceDemo() {
        loginPage = new SauceDemoLoginPage(driver);
        loginPage.loadPage();
        loginPage.enterCredentials(configUser, configPass);
        loginPage.clickLoginButton();

        productsPage = new SauceDemoProductsPage(driver);
        assertEquals("PRODUCTS", productsPage.getHeaderText(), "Title text is incorrect");
    }

    @Test
    @Order(2)
    public void shopThenOpenShoppingCart() {
        loginPage = new SauceDemoLoginPage(driver);
        loginPage.loadPage();
        loginPage.enterCredentials(configUser, configPass);
        loginPage.clickLoginButton();

        productsPage = new SauceDemoProductsPage(driver);
        productsPage.addItemToCart("backpack");
        productsPage.addItemToCart("onesie");
        productsPage.goToShoppingCart();

        shoppingCartPage = new SauceDemoCartPage(driver);
        assertEquals("YOUR CART", shoppingCartPage.getHeaderText(), "Title text is incorrect");
    }

    @Test
    @Order(3)
    public void verifyShoppingCartAdditions() {
        loginPage = new SauceDemoLoginPage(driver);
        loginPage.loadPage();
        loginPage.enterCredentials(configUser, configPass);
        loginPage.clickLoginButton();

        productsPage = new SauceDemoProductsPage(driver);
        productsPage.addItemToCart("backpack");
        productsPage.addItemToCart("onesie");
        productsPage.goToShoppingCart();

        shoppingCartPage = new SauceDemoCartPage(driver);
        assertTrue(shoppingCartPage.confirmAdditionToCart("backpack"));
        assertTrue(shoppingCartPage.confirmAdditionToCart("onesie"));
    }

    @AfterEach
    public void quitWebDriver() {
        driver.quit();
    }
}
