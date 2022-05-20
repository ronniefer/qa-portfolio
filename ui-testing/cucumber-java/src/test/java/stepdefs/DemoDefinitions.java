package stepdefs;

import io.cucumber.java.BeforeAll;
import io.cucumber.java.Before;
import io.cucumber.java.After;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.github.bonigarcia.wdm.WebDriverManager;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import pageobjects.SauceDemoCartPage;
import pageobjects.SauceDemoCheckoutPage;
import pageobjects.SauceDemoLoginPage;
import pageobjects.SauceDemoProductsPage;

import java.io.FileReader;
import java.io.IOException;
import java.util.Properties;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class DemoDefinitions {

    private WebDriver driver;
    static String configUser;
    static String configPass;
    protected SauceDemoLoginPage loginPage;
    protected SauceDemoProductsPage productsPage;
    protected SauceDemoCartPage shoppingCartPage;
    protected SauceDemoCheckoutPage checkoutPage;

    @BeforeAll
    public static void set_up(){
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

    @Before
    public void initiate_driver(){
        driver = new ChromeDriver();
    }

    @Given("^I am on the login page of Sauce Demo$")
    public void i_am_on_the_login_page_of_sauce_demo() {
        loginPage = new SauceDemoLoginPage(driver);
        loginPage.loadPage();
    }

    @When("^I enter credentials and hit login$")
    public void i_enter_credentials_and_hit_login() {
        loginPage.enterCredentials(configUser, configPass);
        loginPage.clickLoginButton();
    }

    @Then("^I (?:should be taken to|am on) the products page$")
    public void i_should_be_taken_to_the_products_page() {
        productsPage = new SauceDemoProductsPage(driver);
        assertEquals("PRODUCTS", productsPage.getHeaderText(), "Title text is incorrect");
    }

    @When("^I (add|remove) (?:an?|the) (.*) (?:to|from) the cart$")
    public void add_remove_cart_items(String action, String item) {
        switch (action) {
            case "add":
                productsPage.addItemToCart(item.toLowerCase());
                break;
            case "remove":
                shoppingCartPage.removeItemFromCart(item.toLowerCase());
                break;
        }
    }

    @When("^I click on the shopping cart icon$")
    public void i_click_on_the_shopping_cart_icon() {
        productsPage.goToShoppingCart();
    }

    @Then("^I (?:should be|am) taken to the shopping cart page$")
    public void i_should_be_taken_to_the_shopping_cart_page() {
        shoppingCartPage = new SauceDemoCartPage(driver);
        assertEquals("YOUR CART", shoppingCartPage.getHeaderText(), "Title text is incorrect");
    }

    @Then("^I should be able to verify the (presence|absence) of the (.*) in the cart$")
    public void verify_cart_item_addition_removal(String state, String item) {
        switch (state) {
            case "presence":
                assertTrue(shoppingCartPage.confirmAdditionToCart(item.toLowerCase()));
                break;
            case "absence":
                assertTrue(shoppingCartPage.confirmRemovalFromCart(item.toLowerCase()));
                break;
        }
    }

    @When("^I click on the checkout button$")
    public void i_click_on_checkout() {
        shoppingCartPage.checkout();
    }

    @Then("^I (?:should be|am) taken to the checkout page$")
    public void i_should_be_taken_to_the_checkout_page() {
        checkoutPage = new SauceDemoCheckoutPage(driver);
        assertEquals("CHECKOUT: YOUR INFORMATION", checkoutPage.getHeaderText(), "Title text is incorrect");
    }

    @Then("^I enter my information and click continue$")
    public void i_enter_my_information_and_click_continue() {
        checkoutPage.enterInfo("John","Smith", "78701");
        assertEquals("CHECKOUT: OVERVIEW", checkoutPage.getHeaderText(), "Title text is incorrect");
    }

    @Then("^I review and hit finish$")
    public void i_review_and_hit_finish() {
        checkoutPage.finishCheckout();
        assertEquals("CHECKOUT: COMPLETE!", checkoutPage.getHeaderText(), "Title text is incorrect");
    }

    @Then("^I go back to home$")
    public void i_go_back_to_home() {
        checkoutPage.goBackHome();
    }

    @After
    public void tear_down(){
        driver.quit();
    }
}
