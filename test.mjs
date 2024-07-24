import axios from 'axios';
import { expect } from 'chai';

const baseURL = 'https://www.thecocktaildb.com/api/json/v1/1/';

describe('Cocktail DB API Tests', function() {
    this.timeout(5000); // Setting default timeout to 5000ms

    it('Search Ingredients By Name: Valid Alcoholic Ingredient', async () => {
        const response = await axios.get(`${baseURL}search.php?i=vodka`);
        const ingredient = response.data.ingredients[0];
        
        expect(ingredient).to.have.property('idIngredient').that.is.a('string');
        expect(ingredient).to.have.property('strIngredient').that.is.a('string');
        expect(ingredient).to.have.property('strDescription').that.is.a('string');
        expect(ingredient).to.have.property('strType').that.is.a('string');
        expect(ingredient).to.have.property('strAlcohol').that.equals('Yes');
        expect(ingredient).to.have.property('strABV').that.is.a('string');
    });

    it('Search Ingredients By Name: Valid Non-Alcoholic Ingredient', async () => {
        const response = await axios.get(`${baseURL}search.php?i=sugar`);
        const ingredient = response.data.ingredients[0];
        
        console.log(ingredient);

        expect(ingredient).to.have.property('idIngredient').that.is.a('string');
        expect(ingredient).to.have.property('strIngredient').that.is.a('string');
        expect(ingredient).to.have.property('strDescription').that.is.a('string');
        expect(ingredient.strType).to.be.oneOf([null, 'string']);
        expect(ingredient.strAlcohol).to.equal('No');
        expect(ingredient.strABV).to.be.null;
    });

    it('Search Ingredients By Name: Invalid Ingredient', async () => {
        const response = await axios.get(`${baseURL}search.php?i=invalidingredient`);
        expect(response.data.ingredients).to.be.null;
    });

    it('Search Cocktails By Name: Valid Cocktail', async () => {
        const response = await axios.get(`${baseURL}search.php?s=margarita`);
        const drink = response.data.drinks[0];
        
        expect(drink).to.have.property('strDrink').that.is.a('string');
        expect(drink).to.have.property('strTags').that.is.a('string');
        expect(drink).to.have.property('strCategory').that.is.a('string');
        expect(drink).to.have.property('strAlcoholic').that.is.a('string');
        expect(drink).to.have.property('strGlass').that.is.a('string');
        expect(drink).to.have.property('strInstructions').that.is.a('string');
        expect(drink).to.have.property('strCreativeCommonsConfirmed').that.is.a('string');
        expect(drink).to.have.property('dateModified').that.is.a('string');
    });

    it('Search Cocktails By Name: Invalid Cocktail', async () => {
        const response = await axios.get(`${baseURL}search.php?s=invalidcocktail`);
        expect(response.data.drinks).to.be.null;
    });

    it('Search Cocktails By Name: Case Insensitivity', async () => {
        const response1 = await axios.get(`${baseURL}search.php?s=Margarita`);
        const response2 = await axios.get(`${baseURL}search.php?s=margarita`);
        const response3 = await axios.get(`${baseURL}search.php?s=MARGARITA`);
        
        expect(response1.data).to.deep.equal(response2.data);
        expect(response2.data).to.deep.equal(response3.data);
    });

    it('Search Ingredients By Name: Special Characters', async () => {
        const response = await axios.get(`${baseURL}search.php?i=vodka@123`);
        expect(response.data.ingredients).to.be.null;
    });

    it('Search Cocktails By Name: Multiple Words', async () => {
        const response = await axios.get(`${baseURL}search.php?s=long%20island%20iced%20tea`);
        const drink = response.data.drinks[0];
        
        expect(drink).to.have.property('strDrink').that.is.a('string');
        expect(drink).to.have.property('strTags').that.is.a('string');
        expect(drink).to.have.property('strCategory').that.is.a('string');
        expect(drink).to.have.property('strAlcoholic').that.is.a('string');
        expect(drink).to.have.property('strGlass').that.is.a('string');
        expect(drink).to.have.property('strInstructions').that.is.a('string');
        expect(drink).to.have.property('strCreativeCommonsConfirmed').that.is.a('string');
        expect(drink).to.have.property('dateModified').that.is.a('string');
    });
});
