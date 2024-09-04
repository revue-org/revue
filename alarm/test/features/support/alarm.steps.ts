import {Given, When, Then, Before, After} from '@cucumber/cucumber'
import supertest from "supertest";
import {HttpStatusCode} from "axios";
import {app} from "../../../src/index.js";
import * as assert from "node:assert";
import {connectToMock, disconnectFromMock} from "../../storage/MongoDBMock.js";

Before(async function () {
    await connectToMock()
});

const alarmService = supertest(app)
let securityRuleId = ""

const newRangeRule = {
    author: 'test-creator-id',
    activeOn: 'cam-01',
    description: 'This is the description of a range rule',
    validityStart: '2020-01-01',
    validityEnd: '2020-01-02',
    contacts: [
        {
            type: 'sms',
            value: '3556333333'
        },
        {
            type: 'email',
            value: 'testmail@gmail.com'
        }
    ],
    rule: {
        minValue: 1,
        maxValue: 10,
        measure: {
            type: 'temperature',
            unit: 'celsius'
        }
    },
    enabled: true
}

const TOKEN = process.env.DEV_API_KEY

async function createRangeRule() {
    return alarmService
        .post('/rules/ranges')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(newRangeRule);
}

async function getRangeRuleId() {
    const response = await alarmService
        .get('/rules/ranges')
        .set('Authorization', `Bearer ${TOKEN}`)
    return response.body[0].id.value
}

/*
 * Scenario: Create a new security rule
 */
Given("I am logged in as a Guardian", function () {
    /*
     * In the next step the guardian authentication BEARER token will be used.
     */
    return 'success';
});

When("I create a security rule in the system", async function () {
    const response = await createRangeRule()
    assert.equal(response.status, HttpStatusCode.Created)
});

Then("the alarm service should check the security rule", async function () {
    /*
     * The alarm service is checking the security rule to see if the conditions are satisfied.
     */
    const response = await alarmService
        .get('/rules/ranges')
        .set('Authorization', `Bearer ${TOKEN}`)
    assert.equal(response.body[0].description, "This is the description of a range rule")
});

Then("trigger an alarm if the conditions are satisfied", function () {
    return 'pending';
});

/*
 * Scenario: Update a security rule
 */
When("I update a security rule in the system", async function () {
    const ruleUpdate = {
        description: 'This is the updated description of a range rule',
        "contacts": [],
        "validityStart": newRangeRule.validityStart,
        "validityEnd": newRangeRule.validityEnd,
        "min": newRangeRule.rule.minValue,
        "max": newRangeRule.rule.maxValue,
    };
    await createRangeRule()
    securityRuleId = await getRangeRuleId()
    const response = await alarmService.put(`/rules/ranges/${securityRuleId}`)
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(ruleUpdate)
    assert.equal(response.status, HttpStatusCode.Ok)
});

Then("the alarm service should check the updated security rule", async function () {
    const response = await alarmService
        .get('/rules/ranges')
        .set('Authorization', `Bearer ${TOKEN}`)
    assert.equal(response.body[0].description, "This is the updated description of a range rule")
});

/*
 * Scenario: Delete a security rule
 */
When("I delete a security rule from the system", async function () {
    await createRangeRule()
    securityRuleId = await getRangeRuleId()
    const response = await alarmService
        .delete(`/rules/${securityRuleId}`)
        .set('Authorization', `Bearer ${TOKEN}`)
    assert.equal(response.status, HttpStatusCode.Ok)
});

Then("the alarm service should no longer check the deleted security rule", async function () {
    /*
     * The alarm service is no longer checking the deleted security rule.
     */
    const response = await alarmService
        .get('/rules/ranges')
        .set('Authorization', `Bearer ${TOKEN}`)
    assert.equal(response.body, "")
});

After(async function () {
    await disconnectFromMock()
});
